Codesavory builds small, private tools that make you look forward to something: a match, a note, a job, a render. The design language is **calm precision**: soft pastel surfaces, exact numbers, and one bold moment per screen, in navy and gold. Read this file first; every rule below names the token, style or asset to use.

## Principles

1. **Lead with what is next.** The most important thing on any screen is a moment in the future and how long until it. Give it the largest type (`data-l` or `display-l`) and the Ring.
2. **Quiet by default, bold once.** Surfaces are soft `surface` and `surface-raised` pastels. Spend `accent` (saffron gold) once per screen: the seed, the live countdown, or one call to action. Never two.
3. **Geometry carries meaning.** Rings, arcs and seeds show time and progress. They are never decoration.
4. **Private and plain.** No dark patterns, no countdowns that pressure, no guilt. Say what happens in short sentences.
5. **Same bones, different flavour.** Every product uses these tokens, this type and this motion. A product may change its hero artwork and nothing else.

## Content fundamentals

- Write the way a knowledgeable friend talks: short, direct, concrete. Contractions are normal ("it's", "don't", "you're").
- Sentence case everywhere: buttons, titles, menu items. Product and team names keep their own capitals.
- Name the result on controls: "Show my matches", "Set a reminder", "Delete my saved copy". Never "OK", "Submit" or "Continue" alone.
- Lead with the answer. The home screen says "Augsburg vs Bayern, in 2d 17h", not "Welcome back!".
- Numbers are numerals ("2 teams", "9:30 AM EDT", "63'"). Durations are compact: `2d 17h`, `42m`.
- No exclamation marks, no emoji as decoration, no ALL CAPS except the `label` style and Badge words.
- Never use em dashes, en dashes or double hyphens as punctuation. Split the sentence, or use a colon, comma or parentheses.
- Avoid: "delve", "leverage" as a verb, "seamless", "robust", "comprehensive", "unlock the power of".
- Errors say what went wrong and how to fix it: "Couldn't send. Try again in a moment." Not "Oops! Something went wrong."
- Privacy statements are facts: "No ads. No accounts. No cross-app tracking." and "We keep a one way hash of your Google id and your team list. No email, no name."

Real copy to match: "When is my next match?", "Use popular picks", "Skip and show all matches", "Your teams are synced across your devices".

## Visual foundations

### Colour

The palette is **Tide** (the brand blue, from powder to deep navy), **Saffron** (the gold accent) and **Salt** (cool, slightly blue neutrals so greys look chosen), with **Chili**, **Basil** and **Brine** for status and five **pastel** companions (`pastel-sky`, `-butter`, `-mint`, `-blush`, `-lilac`, each with an `-ink` partner) for tags, chips and illustration. Navy and gold is the Cividis idea: a dark blue rising to a warm yellow, which stays legible for people with colour-blind vision.

- Page ground is `surface`; cards are `surface-raised`; wells and fields are `surface-sunk`. The hero panel is `surface-inverse` (navy in both themes) with `ink-inverse` text.
- Text is `ink`. Secondary text is `ink-muted`. `ink-subtle` is for placeholders and disabled text only (3.9:1 on light). Never put information the reader needs in `ink-subtle`.
- Primary actions and selected states use `brand` with `on-brand` text. Links use `brand-text`.
- `accent` is the gold moment with `accent-ink` text. Saffron as text on a surface is `accent-text` (never `accent` itself, which is too light on `surface`).
- `live` (Chili) means happening now and always appears with the word LIVE. Errors use `live-text`. Success uses `success` and `success-text` with a word or check. Information uses `info` and `info-text`.
- Status never relies on colour alone: every state has a word or an icon. Success and danger differ in lightness as well as hue.
- Contrast: every text pair named in the token notes is 4.5:1 or better in both themes; control borders (`line-strong`), the `focus` ring and meaningful marks are 3:1 or better.
- Pastels (`pastel-*`) tint tags, chips and illustration; the matching `-ink` token sets the text on them. Never use a pastel for status, and never for a primary action.
- Do not use gradients, pure black or pure white text. Ink is `tide-950`, never `#000`. Do not introduce green as a brand colour: it belongs to success only.
- Team crests and colours are the only other colours on a football screen, and only on team elements.

### Type

Three families, each with one job. **Bricolage Grotesque** (`display`) has character and sets headings and team names. **Instrument Sans** (`text`) sets everything you read. **JetBrains Mono** (`data`) sets numbers that tick or line up: the countdown, the kickoff time, the score, versions.

- Headings use `display-*` and `title-*`; body copy uses `body-l`, `body`, `body-s`; uppercase tags use `label` (always with its letter spacing).
- Numbers that change or align use `data-l`, `data-m` or `data-s` with tabular figures.
- Keep running text near 65 characters wide. Headings use balanced wrapping.
- One `display-xl` per page at most. On phones, step the scale down one level (`display-l` becomes `display-m`).
- Fonts load from Google Fonts on the web. The Apple apps bundle the same families (all are open licence); until bundled, fall back to the system font and keep the same weights.

### Space and layout

- Everything sits on a 4px grid. Use `space-1` to `space-9`; do not invent in-between values.
- The page gutter is `space-4` on phones and `space-6` on large screens. Card padding is `space-4` on phones, `space-5` above.
- Group related things closer (`space-2`, `space-3`) than unrelated things (`space-5`, `space-6`). Whitespace separates, lines rarely do.
- Content width is 720px for reading, 1080px for dashboards. Phones are single column; two columns start at 720px.

### Shape

- The shape language is **pebble**: large soft radii and full circles, never sharp. Buttons, chips and segmented controls are `radius-pill`; cards are `radius-md`; sheets and hero panels are `radius-lg` or `radius-xl`; crests, avatars, the ring and the seed are `radius-round`.
- On Apple platforms use continuous corners (the superellipse), not plain circular arcs. On the web, use `corner-shape: squircle` where supported and the plain radius otherwise.
- Nest radii: the inner element's radius is the outer radius minus the padding between them.

### Elevation

- Depth is tonal first: `surface-raised` over `surface`. Shadows are tinted with the navy, never grey: `shadow-1` for cards at rest, `shadow-2` for menus, `shadow-3` for sheets.
- In the dark theme shadows become a hairline highlight; do not add extra glow.
- Hairlines use `line` at 1px. Control borders use `line-strong` at 1.5px.

### The ring, the seed and imagery

- **The Ring** is the signature (see the Ring component). It fills clockwise from 12 o'clock as a moment approaches and carries the **seed**, a saffron dot riding the end of the arc. States by time left: `far`, `soon`, `near`, `live`.
- **Following** something is shown by the seed (a 9px saffron dot), never a star or heart.
- **The mark** is a ring that stays open on the right (a C) with the seed in the gap (see assets). Products keep the ring and change what it measures.
- There is no stock photography and no illustration of people. Hero artwork is built from rings, arcs, tick marks and the palette. Cover and marketing art follow the same rule: shapes, not pictures.
- Icons are 24px, 1.75px stroke, round caps and joins, `currentColor`. Use SF Symbols on Apple platforms; on the web use a line set with the same weight. Never use emoji as icons.

### Motion

Motion explains change and builds anticipation. One orchestrated moment per screen at most.

- Curves: `ease-whistle` (fast start, soft landing) by default; `ease-settle` for things that arrive and stay; `ease-roll` for things that travel or leave.
- Durations: `dur-instant` press, `dur-quick` hover and toggles, `dur-base` cards and menus, `dur-slow` sheets and page changes, `dur-ring` the ring sweeping to its value.
- The ring sweeps once on first show (`dur-ring`), then updates quietly (`dur-base`). Digits in a countdown change in place; do not roll or flip them.
- The seed settles at the end of the arc with no bounce. The LIVE dot breathes on a 2.4s loop.
- Under `prefers-reduced-motion`: no sweeps, no pulses, no parallax. Show final values and cross-fade at `dur-quick`.
- For motion pieces: at 30 fps, instant is 2 frames, quick 5, base 8, slow 14, ring 27. In After Effects, `ease-whistle` is an outgoing influence of 20% and incoming 80%; `ease-settle` is 30% and 100%. Hold the final frame for at least 12 frames before a cut.

### States and accessibility

- Hover lightens or darkens a fill by one scale step (`brand` to `brand-hover`). Press scales to 0.97 over `dur-instant`. Disabled drops to 45% opacity and loses its pointer.
- Focus is a solid 3px `focus` outline with a 2px offset. It is visible on every surface in both themes. Never remove it.
- Touch targets are at least 44px. Text never goes below 12px; body is 15px.
- Both themes are designed, not inverted. Dark uses `tide-300` for brand fills and `saffron-300` for accent text.

## Using it

**Web.** Load `tokens.css` (generated from `tokens.json`) and `components/bundle.css`. Switch themes with `data-theme="light"` or `data-theme="dark"` on `<html>`, or follow the system. Set text with the generated style classes (`.title-l`, `.body`, `.data-m`).

**Apple apps.** Mirror the tokens as colour sets in the asset catalogue, named exactly like the semantic tokens (`surface`, `ink`, `brand`, `accent`...) with Any and Dark appearances, then read them as `Color("surface")`. Radii, spacing and durations map one to one to constants. Keep the names identical so a designer and an engineer say the same word.

**Motion tools.** Palette hex values are in `tokens.json` (Color). Use `tide-900` or `salt-950` as the ground, `salt-50` for text, `saffron-400` for the single accent. Use the easing and frame counts under Motion. The Ring is a circle with a round-capped trim path from 12 o'clock and a 12px seed on its end.

## Products

- **Kickoff** (football). The home screen is the next-match panel on `surface-inverse` with the Ring and a `data-l` countdown. Followed teams carry the seed. Live is the only place Chili appears at scale. The Mac menu bar icon is the Ring itself: grey far away, blue inside a day, saffron inside three hours, chili while live.
- **Other Codesavory apps** keep the tokens and change what the Ring measures (a job moving through a pipeline, a render, a note's age). Each product gets one hero artwork built from rings and arcs. Do not add a second brand colour.

## Do and don't

- Do give the countdown the biggest type on the screen. Don't bury it in a card of equal-weight stats.
- Do use the seed for "following". Don't use stars, hearts or bell icons for it.
- Do keep copy short and specific. Don't write "Oops", "Awesome" or "Let's get started".
- Do use `accent` once. Don't use saffron for body text on `surface`; use `accent-text`.
- Do pair status colour with a word. Don't show only a red or green dot.
