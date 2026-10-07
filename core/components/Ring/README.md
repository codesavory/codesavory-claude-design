The brand's signature: a circle that fills clockwise from 12 o'clock as a moment approaches, with the saffron seed riding the end of the arc. You provide `--p` (0 to 1) and a `data-state`.

States follow the time left: `far` (more than a day, `ink-subtle`), `soon` (inside a day, `brand`), `near` (inside three hours, `accent-text`), `live` (`live-text`, pulsing seed). The centre always says the same thing in words ("9h to go"), because the colour and the arc are never the only signal.

- First show sweeps over `dur-ring` with `ease-whistle`; later changes use `dur-base`. Under `prefers-reduced-motion`, set the final value with no sweep and no pulse.
- Stroke is 8 in a 100 box; at small sizes (under 40px) drop the label and keep the seed.
- Use the ring for time or progress only. Never as decoration beside unrelated content.
