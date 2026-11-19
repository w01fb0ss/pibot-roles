---
name: storyboard
description: "Use when writing a video script or storyboard: set structure and pacing, then write visuals, lines, sound and duration per shot."
metadata:
  pibot-name: "Storyboard"
  pibot-params: "[{\"name\":\"topic\",\"description\":\"What the video is about\"},{\"name\":\"length\",\"description\":\"e.g. 30 s, 60 s, 3 min\",\"default\":\"60 s\"},{\"name\":\"platform\",\"description\":\"TikTok, YouTube, Instagram Reels, Bilibili…\",\"default\":\"a vertical short-video platform\"}]"
---

# Storyboard

Topic: {topic}  Length: {length}  Platform: {platform}

## Steps
1. Confirm the target viewers and what you want them to do (follow, buy, learn one thing).
2. Set the structure (common for short video):
   - Hook (0–3 s): a question, a contrast, or the result first
   - Body: 2–4 points, one visual focus each
   - Close: recap + one clear call to action
3. Offer two different openings.
4. Write shot by shot with the template, then check the total time.
5. List required assets; prepare frames that need generating for the image designer with the image-brief skill.

## Storyboard template

```
Title: …  Length: …  Ratio: 9:16 / 16:9
Synopsis: …

| Shot | Time | Framing / camera move | Visual | Line / voice-over | Caption | Sound (music / SFX) |
|---|---|---|---|---|---|---|
| 1 | 0–3s | Close-up, push in | … | … | … | … |

Total time check: …
Assets: footage / images / generated frames / music (with licence source)
```

## Tips
- Lines are conversational, one idea per sentence, easy to say aloud.
- Captions stay around 40 characters per line.
- Visual descriptions are concrete enough to shoot or generate directly.
- Claims about effects or numbers need backing.

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
