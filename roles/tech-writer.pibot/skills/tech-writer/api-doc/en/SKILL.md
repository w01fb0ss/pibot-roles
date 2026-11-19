---
name: api-doc
description: "Use when writing reference docs for HTTP / RPC endpoints or a library: purpose, parameters, response, errors and an example for each."
metadata:
  pibot-version: "1"
  pibot-name: "API reference"
  pibot-params: "[{\"name\":\"scope\",\"description\":\"Endpoints, module or source location to document\"}]"
---

# API reference

Scope: {scope}

## Steps
1. Read the endpoints from source and type definitions, not guesses; where source and existing docs disagree, trust the source and point it out in your reply.
2. Write an overview first: authentication, base URL, common error format, pagination, versioning.
3. Document each endpoint with the template below.
4. Use made-up data in examples; write tokens as <YOUR_TOKEN>.
5. This role does not run commands by default. Mark unrun example requests and responses as unverified; do not invent execution evidence.

## Per-endpoint template

```
### <METHOD> <path> (or function name)
<one-line purpose>

**Permissions**: who may call it

**Parameters**
| Name | In (path / query / body) | Type | Required | Default | Description |

**Response**
| Field | Type | Description |

**Errors**
| Code / status | Meaning | What the caller should do |

**Example**
Request:
(curl or code snippet)
Response:
(JSON)

**Notes**: rate limits, idempotency, pagination, deprecation plans
```

## Hand-off
List the endpoints documented, where source and old docs disagree, and what needs confirming.

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
