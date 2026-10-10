# Material language

Added in 1.3.0 after the owner's Instagram For You screenshots (see `REFERENCES.md`). The look is still monochrome with one hot accent. This layer says what things are made of: silver metal, cognac leather, bone paper and fine grain, lit like a product photo.

## The idea in one line

A single machined object on a calm ground, lit from the top left, with one spark of ember.

## Principles

1. **One subject.** Every hero, card or stage holds one thing. Remove the frame, the second headline, the badge.
2. **Real materials, not effects.** Edges look machined (a bright top lip, a dark bottom lip), not glowing. Surfaces have grain, not gradients for their own sake.
3. **Cold meets warm.** Silver and graphite are the structure. Leather, cork and bone appear in small, honest doses: a stitched edge, a tag, a warm band.
4. **Light has a direction.** Top left, soft. Shadows fall down and to the right, long and low. Never a glow in the accent colour behind a plain button.
5. **Quiet type, one flourish.** Geist does the work. Instrument Serif appears once per screen, in a phrase or a caption, usually italic.
6. **Slow and weighted.** Presses go down 2px and settle. Specular sweeps take 1.2s. Nothing bounces.

## Tokens

| Token | Use |
|---|---|
| `steel-50` to `steel-950` | Silver and titanium ramp. Material only, never text. |
| `metal-hi`, `metal-mid`, `metal-lo` | The three tones of a brushed edge, disc or plate. Theme aware. |
| `leather-200` to `leather-900`, `leather`, `leather-ink` | Cognac. A tag, a tab, a stitch. Never a second accent. |
| `stitch` | Dashed hairline for saddle stitching. Once per page. |
| `surface-warm` | Bone paper (light) and warm black (dark). Editorial bands and product stages. |
| `shadow-product` | Object on a studio floor. Hero devices and media stages. |
| `shadow-edge` | Machined edge on buttons, plates and the nav. |
| `serif`, `serif-l/m/s` | Editorial voice. Instrument Serif, self-hosted. |

## Recipes

Brushed metal edge (CSS, no image):

```css
.plate {
  background: linear-gradient(180deg, var(--metal-hi), var(--metal-mid) 55%, var(--metal-lo));
  box-shadow: var(--shadow-edge);
}
```

Metal disc (one stud of the dotted pitch):

```css
.stud {
  background: radial-gradient(circle at 32% 28%, var(--metal-hi), var(--metal-mid) 55%, var(--metal-lo));
  box-shadow: 0 1px 1px rgba(0, 0, 0, .25);
}
```

Studio stage: a `surface-warm` or `surface` ground, a very soft vertical gradient from `surface` into `surface-sunk` for the floor, the object centred, `shadow-product` under it.

Saddle stitch: `border: 1px dashed var(--stitch)` inset 8px from the card edge, drawn with an inner pseudo element. One per page.

Editorial line: `font-family: var(--font-serif); font-style: italic;` for a single phrase inside a Geist headline, for example "When is my *next match*?".

## Rules

- Gradients are allowed for material (metal edges, discs, the studio floor) and never for flat UI fills or text.
- The accent stays the only saturated colour. Leather is a material, not a second accent: keep it to a small area.
- Grain is a 3 to 5 percent overlay. If you can see it as a pattern, it is too strong.
- No stock photos still apply. Materials are drawn with CSS and SVG, not pasted in.
- In dark, metal becomes titanium (darker `metal-*`), leather stays warm, and `surface-warm` becomes warm black. Both themes are designed.
- Respect `prefers-reduced-motion`: no specular sweep, final state only.

## Checks before shipping a page

- Is there exactly one subject in the first screen?
- Is the accent used once?
- Is there at most one serif phrase, and one stitched edge?
- Do text pairs on `surface-warm` pass (`dl check` covers the tokens)?
