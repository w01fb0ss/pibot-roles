---
name: doc-structure
description: "Use when writing or reorganising a README, guide or tutorial: choose a structure by reader and purpose, with templates."
metadata:
  pibot-name: "Doc structure"
  pibot-params: "[{\"name\":\"topic\",\"description\":\"The project or feature to document\"},{\"name\":\"reader\",\"description\":\"new user / developer / operator, etc.\",\"default\":\"a first-time user\"}]"
---

# Doc structure

Topic: {topic}　Reader: {reader}

## 1. Pick the type (one per document)
- **Tutorial**: takes the reader from zero to one working result, complete steps, no detours.
- **How-to guide**: solves one specific problem ("configure a proxy"), assumes basics.
- **Reference**: complete, accurate list of options, parameters and commands for lookup.
- **Explanation**: why it is designed this way and what the trade-offs are.

## 2. README template

```
# Project name
One sentence on what it is and what problem it solves.

## Features
- The 3–5 most important capabilities

## Quick start
### Prerequisites
(OS, versions, things to install first; separate per platform when they differ)
### Install
(copyable commands)
### First run
(the shortest example that shows a result)

## Configuration
| Option | Default | Description |

## FAQ

## Contributing / License
```

## 3. Writing checks
- Open each section with one sentence on what it covers.
- Number steps, one action each, and say what the reader should see.
- Commands and code are copyable; placeholders look like <your-value>.
- Mark examples you have not actually run as unverified.
- Use terms consistently; expand abbreviations on first use.
- Link to stable locations; confirm internal link targets exist.

## 4. Hand-off
List the files added or changed and the TODOs that need confirming.

## Scope

Use supplied information first; user requirements on count, format, and scope override this default template. Current capabilities govern permissions, primary/read-only workplaces, Plan mode, and budget; do not switch tools to bypass a refusal. This skill supplies a method, not authority to write, run commands, pay, send, commit, or publish. Identify unperformed or unverified steps.
