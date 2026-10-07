# Design language

One visual language for everything built under Codesavory: apps, websites, motion work and tools. It lives here, outside any single project, so every project reads the same source and a change made here reaches all of them.

**Two layers.**
- `core/` is the **universal** language: palette, type, spacing, shape, shadow, motion, components and marks. Change it when a decision should apply everywhere.
- `apps/<name>/` is an **app layer** on top of the core: tokens and rules that only that product needs (Kickoff has the match ring colours and crest sizes). An app layer can add tokens, and in rare cases override a universal one. It never edits the core.

The look today: **calm precision**. Soft pastel surfaces, deep navy and a gold accent, exact numbers, one bold moment per screen, light and dark themes. Read `DESIGN.md` for the full brand book and `apps/<name>/DESIGN.md` for a product.

## Layout

```
design-language/
  README.md        this file
  DESIGN.md        the universal brand book (rules that name tokens)
  CLAUDE.md        instructions for any Claude session that works here or in a project that uses this
  CHANGELOG.md     what changed in each version
  VERSION          the language version (semver)
  consumers.json   which projects receive generated files, and where
  core/            tokens.json, contrast.json, components.css, components/<Name>/, marks/
  apps/<name>/     tokens.json (additions, overrides, extra contrast pairs) and DESIGN.md
  apps/_template/  copied by `dl new-app`
  tools/dl.mjs     the command line tool (no dependencies, Node 20+)
  dist/            generated per app, for projects that read straight from here (git-ignored)
```

## Using it from a project

A project is a **consumer**. It receives generated files (never hand written):

| Target | File it gets | Used for |
|---|---|---|
| `css` | CSS custom properties for both themes (`--surface`, `--brand`, `--space-4`, `--dur-quick`...) | websites and web apps |
| `swift` | `DS` constants: dynamic colours, spacing, radius, durations, easing, the type scale | iPhone and Mac apps |
| `json` | resolved tokens per theme | After Effects and Houdini scripts, Figma plugins, anything else |

The generated files are committed in the project, so its builds and CI never depend on this folder. A `design/design.lock.json` in the project records which language version and hash it holds, so a hand edit or a stale copy is detected.

## Commands

Run from anywhere: `node ~/Devel/ClaudeAgents/shared/design-language/tools/dl.mjs <command>` (alias it as `dl`).

| Command | What it does |
|---|---|
| `dl check` | Validates the core and every app: unique names, themes, aliases, and the contrast pairs (text 4.5:1, controls and marks 3:1) in every theme. Exits 1 on a problem. |
| `dl status` | Shows each registered project: in sync, behind (the language changed), edited by hand, or missing. `--strict` exits 1 on drift. |
| `dl sync [--consumer name] [--dry]` | Regenerates and writes files into every registered project. This is how a change propagates. |
| `dl set <family> <name> <value> [--theme light] [--app kickoff] [--sync]` | Changes one token safely. Rolls back if the language stops validating. |
| `dl bump <major\|minor\|patch> "note"` | Raises `VERSION` and adds a line to `CHANGELOG.md`. |
| `dl new-app <name>` | Scaffolds `apps/<name>`. |
| `dl add-consumer <name> <path> --app <app> [--css out] [--swift out] [--json out]` | Registers a project to receive files. |
| `dl watch` | Re-checks and syncs everything whenever a file here changes. |
| `dl build` | Writes `dist/` for the core and each app. |
| `dl export-artifact <dir>` | Prepares the files for the Claude "Design System" artifact from the core (then ask Claude to republish). |

## Changing the language

1. **Decide the layer.** Universal decision: edit `core/`. Product decision: edit `apps/<name>/`.
2. Edit the token (by hand in `tokens.json`, or `dl set ...`). Every colour needs a usage note and a value for both themes.
3. `dl check` must pass. It fails if a text pair drops below its contrast minimum in any theme.
4. `dl bump <level> "what changed"`: patch for a tweak, minor for a new token or component, major when a token is renamed or removed.
5. `dl sync` to push to every project, then rebuild and test each project as usual. Review each project's diff: generated files show exactly what changed.

A project that changes the language "from the other side" (you are working in another app and decide the gold should change) does the same thing: edit here, run `dl sync`, and the first project picks it up too. `dl status` from any project shows if it is behind.

## Adding a product

```
dl new-app notes                      # scaffold apps/notes
$EDITOR apps/notes/tokens.json        # tokens it adds, rules in DESIGN.md
dl add-consumer notes ~/Devel/.../notes-app --app notes --css src/design/tokens.css
dl sync --consumer notes
```

## Rules

- The universal core stays small. If three products want the same thing, move it from the app layers into `core/`.
- App layers add and rarely override. `dl status` lists every override so none hides.
- Type and the themes are universal; an app cannot change them.
- Names are shared across families and are used verbatim in CSS (`--ink-muted`), Swift (`DS.Palette.inkMuted`) and the brand book. Keep one name for one thing.
- Voice rules apply to all product copy (see `DESIGN.md`): short, direct, no em dashes.

## Related

- A Claude "Design System" artifact (private) shows the language as a browsable reference. It is generated from `core/`; republish it after a change.
- `~/Devel/ClaudeAgents/shared/ClaudeAgentsDesign` is an older Swift package of shared SwiftUI views for the Mac tools. It predates this language; new work should use `DS` from the generated Swift file and the tokens here. It can be migrated later.
