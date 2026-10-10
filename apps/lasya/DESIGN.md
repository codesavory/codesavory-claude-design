# Lasya

App-specific language for Lasya (lasya.codesavory.dev), the motion and simulation studio. It sits on top of the universal Codesavory language in `../../DESIGN.md`. Read that first. Lasya adds tokens and overrides none.

## What the product is

A portfolio and shop for Houdini work: simulations, studies, tools and a lab. The work is the content, so the page is a quiet frame around moving renders.

## Signature: the frame counter

Kickoff's ring measures time to kickoff. Lasya measures the render itself.

- **The frame counter.** The work stage shows the current frame of its lead loop in Doto (`dot` face), coloured `frame-count`, with a `label` caption ("Frame"). It ticks with the video and stops under `prefers-reduced-motion`.
- **The seed.** A `seed-dot` accent dot (the `playhead` colour) before the LASYA wordmark. It is the only accent in the header.
- **No progress bars on media.** The owner removed the playhead line under tiles (9 Oct 2026). Tiles show the render, the title and the technique, nothing else.

## Media

- Tiles sit on `media-ground` in both themes. Renders are graded on black; the page theme never changes the frame.
- Previews are muted loops that play only while on screen. A full video starts on a tap and has controls (see `docs/product-learnings.md`, rules 33 and 34).
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
- The home page follows the Kickoff marketing pattern (`docs/product-learnings.md`, rule 36) and fits one screen at 1440 by 900. From the top: a **ticker** of the techniques tagged on the work (mono, uppercase, slow); a single line headline with the serif flourish ("Order & chaos, *in motion.*"); one lead line; the **Start a project** button in the accent plus a quiet "See all work" link; the **viewer window**; the **strip**; one assurance line; one mono promise line. Then "About Lasya" below the first screen, then a one line footer with a Privacy link.
- The viewer window is a window with three dots, the mono title "Lasya viewer" and the **frame counter** at the right of its bar (Doto at 30px, `frame-count`). Inside: one large tile (16:9) with two smaller tiles stacked beside it, columns 2 to 1, about 380px tall at 880px wide. The small tiles hide the technique line. On a phone the large tile spans and the other two sit side by side.
- The strip is the four paths as dark pills (`surface-inverse`): Past work, Tools & learn, Lab, Hire me (last, the call to action). Each has a title, a mono tag (Portfolio, Shop or Soon, R&D, Services) and one short line. Four across, two on tablet, one on phone. Tags stay neutral. The Lab is a main path because Lasya is an R&D studio, not only a service.
- The page's world is a **timeline ruler**: frame ticks and numbers in the top and bottom margins, faded at the edges, never behind text.
- One media tile component (title and technique over the bottom scrim) is used for every piece of work, in the viewer and in plain grids.
- One page header on every inner page: optional back link, `label`, title, optional lead.
- Content that is not real yet is hidden. The Tools page shows "Coming soon" until a real product exists, and the strip tag reads "Soon".
- A short Privacy page backs the promise line. The promise is only written while the build makes no third party requests.

## Do not

- Do not use glows, blobs or gradients on surfaces. The only gradient is the media scrim.
- Do not put the accent on more than one tile at a time.
- Do not invert renders or tint them with the theme.
- Do not stack full width tiles on the home page, and do not let the viewer window push the strip or the promise line below the first screen.
- Do not draw the timeline ruler behind text, and do not put the accent on the strip tags: the Start a project button is the one spark.
- Do not publish placeholder products, handles or links.
