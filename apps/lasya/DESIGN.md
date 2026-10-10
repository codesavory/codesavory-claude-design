# Lasya

App-specific language for Lasya (lasya.codesavory.dev), the motion and simulation studio. It sits on top of the universal Codesavory language in `../../DESIGN.md`. Read that first. Lasya adds tokens and overrides none.

## What the product is

A portfolio and shop for Houdini work: simulations, studies, tools and a lab. The work is the content, so the page is a quiet frame around moving renders.

## Signature: the frame counter

Kickoff's ring measures time to kickoff. Lasya measures the render itself.

- **The frame counter.** The hero shows the current frame of its lead loop in Doto (`dot` face), coloured `frame-count`, with a `label` caption ("Frame"). It ticks with the video and stops under `prefers-reduced-motion`.
- **The seed.** A `seed-dot` accent dot (the `playhead` colour) before the LASYA wordmark. It is the only accent in the header.
- **No progress bars on media.** The owner removed the playhead line under tiles (9 Oct 2026). Tiles show the render, the title and the technique, nothing else.

## Media

- Tiles sit on `media-ground` in both themes. Renders are graded on black; the page theme never changes the frame.
- Titles over media use `media-ink`, techniques `media-ink-muted` in the data face, on a bottom scrim made from `media-ground`.
- Corners are `radius-md`. No borders, no tilt on hover; hover lifts the video scale by 2%.
- Content width is `content-wide`.

## Theme and palette

- Light is the default ("light is a page"). A control in the header switches light and dark only. The choice is saved on the device.
- The accent is ember, fixed. The owner asked to pick one accent and commit to it (9 Oct 2026), so Lasya offers no palette picker and ignores any saved palette.
- The accent is the same in both themes. In light it appears on the seed, the playhead and accent text only; primary buttons are `brand`.

## Type

Universal scale only. Hero headline `display-m` on desktop (one step down on phones), section titles `title-l`, tile titles `title-s`, captions `label` or `data-s`. The one serif flourish per screen (see `docs/material-language.md`) is the italic phrase in the hero headline ("Order & chaos, *in motion*."), set in `serif` and `accent-text`.

## Material

Media tiles sit on `shadow-1`. No metal, leather or warm bands on Lasya yet: the renders are the material.

## Structure

- The header is the wordmark with a "Design studio" label and the light/dark switch. Nothing else: the paths are not repeated in the header.
- Four paths: Past work, Tools & learn, Lab, Hire me (always last, the call to action). They are the numbered rows in the home hero. The Lab is a main path because Lasya is an R&D studio, not only a service.
- The home page is the hero (headline, four rows, three media tiles, frame counter), then an "About Lasya" section below the first screen (lead plus three columns, as on the Kickoff site), then a one-line footer.
- One media tile component (title and technique over the bottom scrim) is used for every piece of work, in the bento and in plain grids.
- One page header on every inner page: optional back link, `label`, title, optional lead.

## Do not

- Do not use glows, blobs or gradients on surfaces. The only gradient is the media scrim.
- Do not put the accent on more than one tile at a time.
- Do not invert renders or tint them with the theme.
