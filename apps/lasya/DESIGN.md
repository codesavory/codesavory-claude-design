# Lasya

App-specific language for Lasya (lasya.codesavory.dev), the motion and simulation studio. It sits on top of the universal Codesavory language in `../../DESIGN.md`. Read that first. Lasya adds tokens and overrides none.

## What the product is

A portfolio and shop for Houdini work: simulations, studies, tools and a lab. The work is the content, so the page is a quiet frame around moving renders.

## Direction: a studio, not a product

Lasya must read as a high-end design studio (like XK Studio or Man vs Machine), with the Codesavory DNA kept quiet. The owner's word (9 Oct 2026): the app-style home "looks too much like a digital product".

- **The work is the page.** One edge-to-edge reel opens the home. Everything else is the work at large size on the media ground, with sharp corners (`radius-xs`).
- **Gallery labels, not overlays.** A render has its number, title and technique set beneath it, like a label on a wall. No scrim, no arrows, no overlaid text.
- **Almost no chrome.** No window frames, traffic-light dots, ticker, ruler, pill strips, badges, promise lines or progress bars. Panels and the video box are square-ish too.
- **Few words.** One headline, one line under it, one statement in Info. Copy states facts.
- **Info, not marketing.** The home ends with an Info block (Studio, Services, Contact), then one large closing line ("Start a project"), then a one-line footer. The accent is spent on the seed in the wordmark and the serif flourish.
- **Navigation lives once**, in the header: Past work, Tools & learn, Lab, Hire me (a "Menu" on phones). It is not repeated as cards or strips on the page.

## DNA that stays

- The seed dot before the LASYA wordmark, and the "Design studio" label beside it.
- The serif flourish: one italic phrase per screen in `serif` and `accent-text` ("*in motion.*").
- The dot-matrix frame counter (Doto, `frame-count`), small, in the opening reel's label.
- Geist and Geist Mono, mono captions, hairlines, light and dark.

## Media

- Frames sit on `surface-sunk`, so the page theme owns every gap. There is never a black border: videos are centred and scaled to fill their frame (home reel, plates), and a project video is shown at its own shape (a square render is a centred square, not a 16:9 box with side bars). Changed 9 Oct 2026 after the owner said the black borders around the video looked wrong; `media-ground`, `media-ink` and `media-ink-muted` are now unused.
- Captions use `ink` for the title and `ink-subtle` for numbers and technique (`data` face).
- Content width is `content-wide`; the opening reel is full bleed.

## Theme and palette

- Light is the default ("light is a page"). A control in the header switches light and dark only. The choice is saved on the device.
- The accent is ember, fixed. The owner asked to pick one accent and commit to it (9 Oct 2026), so Lasya offers no palette picker and ignores any saved palette.
- The accent is the same in both themes. In light it appears on the seed, the playhead and accent text only; primary buttons are `brand`.

## Type

Universal scale only. Hero headline `display-m` on desktop (one step down on phones), section titles `title-l`, tile titles `title-s`, captions `label` or `data-s`. The one serif flourish per screen (see `docs/material-language.md`) is the italic phrase in the hero headline ("Order & chaos, *in motion*."), set in `serif` and `accent-text`.

## Material

Media tiles sit on `shadow-1`. No metal, leather or warm bands on Lasya yet: the renders are the material.

## Do not

- Do not use glows, blobs or gradients on surfaces, and do not overlay text on renders.
- Do not put the accent on more than one thing at a time. On the home page it is the serif flourish in the headline (and the seed in the wordmark).
- Do not invert renders or tint them with the theme.
- Do not frame the work in app window chrome. Large and full-bleed work is wanted (9 Oct 2026, replacing the earlier "no full width tiles" rule): the work is the page.
- Do not borrow Kickoff's page: no ticker, no download pills, no "no ads, no tracking" slogan on the home page, no centred product pitch.
- Do not publish placeholder products, handles or links.
- Do not show the Mardini series, and do not write paragraphs where a line will do.
