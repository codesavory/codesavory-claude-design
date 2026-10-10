# Kickoff

App-specific language for Kickoff, on top of the universal Codesavory language in `../../DESIGN.md`. Read that first. Everything here only adds to it; Kickoff overrides no universal token.

## What the app is

A football next-match tracker for web, iPhone and Mac. The only question it answers is "when is my next match?", so the countdown is the hero of every surface.

## Additions

- **The Ring measures time to kickoff.** Colour by time left: `ring-far` (over a day), `ring-soon` (inside a day), `ring-near` (inside three hours), `ring-live` (in play). Track is `ring-track`. Size is `ring-hero` in the next-match panel, `ring-menubar` as the Mac menu bar icon. Stroke is `ring-stroke` in a 100 unit box.
- **The seed marks a followed team.** A `seed-dot` wide `seed` circle with a `seed-edge` outline, after the team name. It replaces stars, hearts and bells everywhere. A followed team in a live match still shows its seed.
- **Crests** come from the data feed and are shown at `crest-sm`, `crest-md` or `crest-lg` in a `radius-round` frame. Where no crest exists, show the club's initial on its main colour, never a generic ball.
- **LIVE** is the only place `live` appears at scale: the badge, the inset outline on the match card and the live ring. Nothing else on a football screen is red.

## Screens

- **Home (Upcoming).** `surface-inverse` next-match panel with `ring-hero`, the countdown in `data-l` and the two team names in `title-l`. Below, match cards grouped by day ("Today", "Coming up"). One gold moment: the seed or the live countdown, never both competing.
- **Results.** Scores in `data-m`, no ring. Highlights play inline; the play affordance is `brand`, not gold.
- **Teams.** Pickers are chips and checkboxes on `surface-raised`. Following sets the seed immediately.
- **Welcome.** "What do you follow?" with one primary button and one quiet "Use popular picks" link.
- **Mac menu bar.** The icon is the ring alone, with no text unless the person turns it on. Window is `surface` with the same cards as the phone.

## Copy

Kickoff copy is the universal voice with football nouns: "Next match", "Where to watch", "Show my matches", "Use popular picks". Times are in the person's timezone with the zone shown ("Sat, Oct 10, 9:30 AM EDT"). Countdowns are compact: `2d 17h`, `42m`.

## Do not

- Do not use pitch green or a football icon as brand elements.
- Do not show scores and countdowns on the same card.
- Do not add a second accent colour for a competition. Use its crest or the league emblem.

## Material (1.3.0)

The dotted pitch is drawn as metal studs (`metal-hi/mid/lo`), lit from the top left, fading out toward the edges. Hero devices stand on a studio floor with `shadow-product`. The headline sets "next match" in Instrument Serif italic. Cards have a machined top edge (`shadow-edge`). One saddle stitch (`stitch`) edges the pricing card. Ember remains the only saturated colour. See `docs/material-language.md`.
