# Lasya

App-specific language for Lasya (lasya.codesavory.dev), the motion and simulation studio. It sits on top of the universal Codesavory language in `../../DESIGN.md`. Read that first. Lasya adds tokens and overrides none.

## What the product is

A portfolio and shop for Houdini work: simulations, studies, tools and a lab. The work is the content, so the page is a quiet frame around moving renders.

## Signature: the camera and the timeline

Kickoff's ring measures time to kickoff. Lasya looks at the render the way a camera and an editor do.

- **Viewfinder marks and timecode.** The lead reel on the home page has four corner marks in `media-ink` and a running timecode (`MM:SS:FF` at 30 fps, mono) in its lower right corner. It ticks with the video and stops under `prefers-reduced-motion`.
- **Frame numbered sections.** Section markers on the home page read 0000, 0240, 0480 and 0720, as frames at 24 fps.
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

Lasya is a studio that hires out its skills and a shop that sells digital tools. Its home page is built for that, not as an app pitch (`docs/product-learnings.md`, rules 36 and 37). The owner rejected a version that copied Kickoff's marketing page.

- The header is the wordmark with a "Design studio" label and the light/dark switch. Nothing else: the paths are not repeated in the header.
- The home page, top to bottom:
  1. **Opening shot.** A left aligned headline ("Order & chaos, *in motion.*", serif flourish) beside one short intro and an availability line, then the **reel**: the lead piece as a wide 21:9 loop with viewfinder marks, title, technique and the running timecode.
  2. **Selected work (0000).** A numbered shot list of the first eight pieces: number, title, technique, year. On desktop, hovering or focusing a row plays its loop in a sticky viewer beside the list. On a phone each row shows a thumbnail instead.
  3. **What I make (0240).** The services stated plainly, as a numbered list.
  4. **Tools & Lab (0480).** The tools shelf (a dashed "in the works" panel until a real product exists, then product cards) beside a note on the Lab.
  5. **Hire (0720).** A large closing line with the Start a project button, the one accent on the page, and the email address.
  6. **About Lasya**, then a one line footer with a Privacy link.
- The paths are Past work, Tools & learn, Lab and Hire me (always last, the call to action). The Lab is a main path because Lasya is an R&D studio, not only a service.
- One media tile component (title and technique over the bottom scrim) is used for every piece of work in plain grids.
- One page header on every inner page: optional back link, `label`, title, optional lead.
- Content that is not real yet is hidden. The Tools page shows "Coming soon" until a real product exists.

## Do not

- Do not use glows, blobs or gradients on surfaces. The only gradient is the media scrim.
- Do not put the accent on more than one thing at a time. On the home page it is the Start a project button.
- Do not invert renders or tint them with the theme.
- Do not stack full width tiles for the work, and do not frame the work in app window chrome.
- Do not borrow Kickoff's page: no ticker, no download pills, no "no ads, no tracking" slogan on the home page, no centred product pitch.
- Do not publish placeholder products, handles or links.
