A filter that narrows a list. You provide the label and the pressed state (`aria-pressed`).

One chip in a row is pressed at a time unless the filter is a multi-select. The pressed chip uses `brand` fill with `on-brand` text; others use a `line-strong` border (3:1 or better) so they read as controls on every surface.

- Rows scroll sideways on phones. Never wrap chips onto a second line.
- A chip names a thing the list contains ("La Liga"), not an action.
