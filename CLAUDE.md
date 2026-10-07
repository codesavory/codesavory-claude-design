# Design language: instructions for Claude

This folder is the shared design language for every project under ~/Devel/ClaudeAgents. Read `README.md` first, then `DESIGN.md` (and `apps/<name>/DESIGN.md` for a product).

## When you work in a project that uses it

- Never hand edit generated files (`src/design/tokens.css`, `.../DesignTokens.swift`, `design/resolved.json`). They carry a "Generated" banner and are checked against `design/design.lock.json`.
- Use tokens, not literals: `var(--brand)`, `DS.Palette.brand`, `DS.Space.space4`. If a value you need does not exist, add it here first.
- To change the language: edit `core/` (universal) or `apps/<name>/` (product only), run `node tools/dl.mjs check`, then `dl bump <level> "note"`, then `dl sync`. Report which projects changed.
- Before relying on the language in a project, run `dl status`. If it says "behind", run `dl sync --consumer <name>` and review the diff.

## Rules when editing the language

- Every colour token has a usage note and a value for both themes. Text pairs must pass the contrast table in `core/contrast.json`; `dl check` enforces it. Never lower a minimum to make a colour pass: change the colour.
- Do not rename or delete a token without a major version bump and a search of every consumer (`grep` the registered project paths in `consumers.json`).
- App layers add or override; they never change the type scale or the themes.
- Keep prose free of em dashes, en dashes and double hyphens.
- Do not commit secrets or machine specific paths into tokens. `consumers.json` uses `~/` paths.
