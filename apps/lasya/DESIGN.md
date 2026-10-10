# Lasya

App-specific language for Lasya (lasya.codesavory.dev), the motion and simulation studio. It sits on top of the universal Codesavory language in `../../DESIGN.md`. Read that first. Lasya adds tokens and overrides none.

## What the product is

A portfolio and shop for Houdini work: simulations, studies, tools and a lab. The work is the content, so the page is a quiet frame around moving renders.

## Signature: the playhead and the frame counter

Kickoff's ring measures time to kickoff. Lasya measures the render itself.

- **The playhead.** Every playing media tile carries a `playhead-weight` line along its bottom edge that fills with the loop. It is `media-ink` at rest and `playhead` (the accent) on the tile you point at or focus. One accent playhead per screen.
- **The frame counter.** The hero shows the current frame of its lead loop in Doto (`dot` face), coloured `frame-count`, with a `label` caption ("Frame"). It ticks with the video and stops under `prefers-reduced-motion`.
- **The seed.** A `seed-dot` accent dot before the LASYA wordmark. It is the only accent in the header.

## Media

- Tiles sit on `media-ground` in both themes. Renders are graded on black; the page theme never changes the frame.
- Titles over media use `media-ink`, techniques `media-ink-muted` in the data face, on a bottom scrim made from `media-ground`.
- Corners are `radius-md`. No borders, no tilt on hover; hover lifts the video scale by 2% and lights the playhead.
- Content width is `content-wide`.

## Theme and palette

- Light is the default ("light is a page"). A control in the header switches light and dark and the accent palette (ember, signal, graphite). The choice is saved on the device.
- The accent is the same in both themes. In light it appears on the seed, the playhead and accent text only; primary buttons are `brand`.

## Type

Universal scale only. Hero headline `display-m` on desktop (one step down on phones), section titles `title-l`, tile titles `title-s`, captions `label` or `data-s`. The one serif flourish per screen (see `docs/material-language.md`) is the italic phrase in the hero headline ("Order & chaos, *in motion*."), set in `serif` and `accent-text`.

## Material

Media tiles sit on `shadow-1`. One editorial band per page (Services on the home page) uses `surface-warm`. No metal or leather on Lasya yet: the renders are the material.

## Do not

- Do not use glows, blobs or gradients on surfaces. The only gradient is the media scrim.
- Do not put the accent on more than one tile at a time.
- Do not invert renders or tint them with the theme.
