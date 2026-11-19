import { randomUUID } from "node:crypto";
import { closeSync, createReadStream } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import {
  fail,
  integer,
  MAX_JSON,
  MAX_PAGES,
  openImage,
  readBounded,
  record,
  reviewRoot,
} from "./review-files.ts";
import { begin, MAX_VERSION, type State, update } from "./review-state.ts";

// A single owner on this host prevents competing servers from publishing the same comments file.
const HOST = "127.0.0.1";
const PORT = 18745;
const authority = `${HOST}:${PORT}`;
const origin = `http://${authority}`;

const headers = {
  "cache-control": "no-store",
  "content-security-policy":
    "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  "x-content-type-options": "nosniff",
  "cross-origin-resource-policy": "same-origin",
  "referrer-policy": "no-referrer",
};

function send(res: ServerResponse, status: number, value: unknown) {
  res.writeHead(status, { ...headers, "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
}

async function requestBody(req: IncomingMessage) {
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  for await (const chunk of req) {
    bytes += chunk.length;
    if (bytes > MAX_JSON) fail("body_limit");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function image(res: ServerResponse, root: string, version: number, page: number) {
  let file: ReturnType<typeof openImage>;
  try {
    file = openImage(root, version, page);
  } catch {
    return send(res, 404, { error: "image-unavailable" });
  }
  const stream = createReadStream("", { fd: file.fd, start: 0, end: file.size - 1 });
  res.writeHead(200, { ...headers, "content-type": "image/png", "content-length": file.size });
  await pipeline(stream, res);
}

function main() {
  const [output, requestedVersion, pageCount, language] = process.argv.slice(2);
  if (!output || (language !== "zh" && language !== "en")) fail("usage");
  const root = reviewRoot(output);
  const version = integer(Number(requestedVersion), 1, MAX_VERSION);
  const pages = integer(Number(pageCount), 1, MAX_PAGES);
  const source = dirname(fileURLToPath(import.meta.url));
  const assets = new Map<string, readonly [string, Buffer]>([
    ["/", ["text/html", readBounded(join(source, "review.html"), 65536)]],
    ["/review.js", ["text/javascript", readBounded(join(source, "review.js"), 65536)]],
    ["/review.css", ["text/css", readBounded(join(source, "review.css"), 65536)]],
  ] as const);
  const session = randomUUID();
  let state: State | undefined;
  let drain: ReturnType<typeof setTimeout> | undefined;
  let stopping = false;
  function stop() {
    if (stopping) return;
    stopping = true;
    server.close();
    drain = setTimeout(() => server.closeAllConnections(), 2000).unref();
  }
  const server = createServer(
    {
      maxHeaderSize: 8192,
      headersTimeout: 5000,
      requestTimeout: 10000,
      keepAliveTimeout: 1000,
      connectionsCheckingInterval: 1000,
    },
    async (req, res) => {
      try {
        if (req.headers.host !== authority || req.headers["sec-fetch-site"] === "cross-site")
          return send(res, 403, { error: "forbidden" });
        if (!state || stopping) return send(res, 503, { error: "unavailable" });
        const route = req.url ?? "";
        if (req.method === "GET") {
          const asset = assets.get(route);
          if (asset) {
            res.writeHead(200, { ...headers, "content-type": `${asset[0]}; charset=utf-8` });
            return res.end(asset[1]);
          }
          if (route === "/state") return send(res, 200, { language, session, state });
          const match = /^\/image\/([1-9][0-9]?)\/([1-9][0-9]{0,2})$/.exec(route);
          const batch = match && state.versions[Number(match[1]) - 1];
          if (match && batch && Number(match[2]) <= batch.pages)
            return await image(res, root, batch.version, Number(match[2]));
        }
        if (req.method === "POST" && (route === "/comments" || route === "/submit")) {
          if (req.headers.origin !== origin || req.headers["content-type"] !== "application/json")
            return send(res, 403, { error: "forbidden" });
          const data = record(await requestBody(req));
          if (data.session !== session) return send(res, 409, { error: "stale_revision" });
          if (stopping) return send(res, 503, { error: "unavailable" });
          const submit = route === "/submit";
          state = update(root, state, data, submit);
          if (submit) {
            // The successful response is flushed before idle connections close. Never edit a deck here.
            res.setHeader("connection", "close");
            send(res, 200, state);
            console.log("deck_review_submitted");
            stop();
            return;
          }
          return send(res, 200, state);
        }
        send(res, 404, { error: "not_found" });
      } catch (error) {
        if (res.headersSent || res.destroyed) {
          res.destroy();
          return;
        }
        const stale = error instanceof Error && error.message === "stale_revision";
        send(res, stale ? 409 : 400, { error: stale ? "stale_revision" : "review-request-failed" });
      }
    },
  );
  server.maxConnections = 24;
  server.setTimeout(10000, (socket) => socket.destroy());
  server.on("close", () => {
    clearTimeout(drain);
    process.off("SIGTERM", stop);
    process.off("SIGINT", stop);
  });
  server.on("error", (error) => {
    console.error(
      "code" in error && error.code === "EADDRINUSE"
        ? "deck_review_port_busy"
        : "deck_review_listen_failed",
    );
    process.exitCode = 1;
  });
  server.listen(PORT, HOST, () => {
    try {
      for (let page = 1; page <= pages; page++) closeSync(openImage(root, version, page).fd);
      state = begin(root, version, pages);
      process.on("SIGTERM", stop);
      process.on("SIGINT", stop);
      console.log(`deck_review_ready ${origin}/`);
    } catch {
      console.error("deck_review_inputs_unavailable");
      process.exitCode = 1;
      stop();
    }
  });
}
try {
  main();
} catch {
  console.error("deck_review_inputs_unavailable");
  process.exitCode = 1;
}
