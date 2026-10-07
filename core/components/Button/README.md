A pill-shaped action. You provide the label (a verb: "Follow Bayern", "Set a reminder") and an `onClick`.

Use `cs-btn--primary` (`brand` fill, `on-brand` text) for the main action. Use `cs-btn--accent` (`accent` fill, `accent-ink` text) for at most one action per screen: it is the gold moment, so a second accent button weakens both. Use `--quiet` for secondary actions and `--line` for the least important one.

- Height is 44px (34px for `--sm`), never smaller on touch screens.
- Labels are sentence case and name the result. Never "OK" or "Submit".
- Press scales to 0.97 over `dur-instant` with `ease-whistle`. Focus is the solid `focus` outline.
- Do not put an icon and a long label together on a phone; keep it to two words.
