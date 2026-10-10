# References

Everything the owner has pointed at as a design reference, in the order given. Add new ones at the bottom of the right section. Check this file before changing the look of any product.

## Direction in the owner's words

- "A unique brand design language I can use across mograph and other websites and tools."
- "Greys, blacks and whites with some accents like red and orange." No pastels, no blue/gold.
- "The accent should propagate between dark and white theme."
- Marketing pages are light by default, with a control at the top to change the accent colour and light or dark.
- Modern, minimal fonts. Self-hosted only. No Google Fonts, no third-party tracking.
- "Very, very, very important: high end, premium feel."
- On Lasya (9 Oct 2026): "Don't have 3 color options on the top! just pick one and commit to it!" Products ship one accent; offer light and dark only, not a palette picker.

## Sites and brands

| Reference | URL | What to take from it |
|---|---|---|
| Apple | https://www.apple.com | Calm hierarchy, huge confident headlines, generous space, product first. |
| Plat Supply | https://platsupply.com/ | Editorial grid, product-shop restraint, quiet typography. |
| Radbali | https://radbali.com/ and https://radbali.com/store/ | Platform and product cards with a media area, tag, title, price and spec rows. |
| Dyson | https://www.dyson.com | Engineered, spec-led product storytelling. |
| Patagonia | https://www.patagonia.com | Honest tone, plain language, restrained colour. |
| Arc'teryx | https://arcteryx.com | Technical minimalism, monochrome with one accent. |
| Nothing | https://nothing.tech | Dot-matrix type, transparent hardware feel, red accent. |
| teenage engineering OP-1 | https://teenage.engineering/products/op-1 | Mono labels, hairline grids, orange accent, instrument-panel layout. |
| Raycast | https://www.raycast.com/ | Dark theme target: near-black, floating glass nav pill with hairline border, huge centred white headline, diagonal grainy red light-streak art, glowing light pill button, small mono captions. The hero screenshot supplied by the owner was the first benchmark. Later feedback (7 Oct 2026): the marketing site looked "too copied from Raycast". Take the near-black surfaces and the quiet hairlines, not the floating glass nav pill, the diagonal light streaks or the glow button. Kickoff's own signature is the dotted pitch and the dot ring. |
| Airbnb, Stripe | https://www.airbnb.com, https://stripe.com | Depth of a real design system: tokens, components, expression. |
| Instagram "For You" product grid (3 screenshots, 10 Oct 2026) | (screenshots, owner's phone: IMG_6750 to IMG_6752) | The owner's taste in one feed: tactile product photography. See "Material direction" below. |
| Houdini colour ramps | (screenshots, owner's machine) | Owner likes ramps with a bold flavour. Superseded by the monochrome plus ember direction. |

## Where each shows up

- Dot-matrix numerals (Doto), mono captions, hairline grids: Nothing, teenage engineering.
- Floating glass nav, light-streak hero, glow button, near-black surfaces: Raycast.
- Platform cards with tag, title, price, spec rows: Radbali.
- Plain, honest copy: Patagonia.

## Material direction (10 Oct 2026)

The owner shared three screenshots of their Instagram For You page and said it matches their aesthetic: "minimal, metal and silver, leather, upscale". About 50 tiles, nearly all of them one thing: a single well made object, close up, lit like a studio shot. Full write-up with rules: `docs/material-language.md`.

What the tiles share, and what we took:

| Seen in the feed | Rule we took |
|---|---|
| Cognac leather phone case on warm brown; woven strap; cork pad; hammered clay; brass pen on walnut | Warm natural materials next to cold metal. `leather-*` ramp, `surface-warm` bone paper, one dashed `stitch` hairline. |
| Brushed steel and titanium pour-over cones, grinders, press, a perforated steel plate of disc studs | Machined silver. `steel-*` ramp, `metal-hi/mid/lo` for edges and discs, `shadow-edge` (bright top lip, dark bottom lip). |
| One object centred on a clean ground with a soft floor shadow (white headphones, orange tag on white, red Nuuk stack) | Product stage: calm ground, one subject, long soft `shadow-product`. No clutter, no frames around it. |
| One orange or red object in an otherwise grey scene (the orange and white vehicle, the orange tag, the red Pantone tower) | Confirms "one spark per screen". The ember accent stays the only saturated colour. |
| Elegant serif captions over photos ("The Woven Brown Casio strap is back in stock", "create a lamp with me") | A quiet serif for editorial lines, set against the sans. Instrument Serif (`serif`), used for one phrase, never body text. |
| Macro texture: knurling, weave, grain, perforation, hammered surface | Fine grain on stages and hero. The dotted pitch becomes metal discs lit from the top left. |
| Hands touching the object (pressing, turning, pouring) | Tactile motion: press depth, slow settle, a specular sweep. No bounces. |

Do not copy: loud colour illustration (the Mario and typography tiles), busy overlays, phone-in-hand clips. They are in the feed but not the taste.
