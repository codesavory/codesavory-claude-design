const lum = (hex) => {
  const h = hex.replace("#", "");
  const c = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

/** Every pair must meet its minimum in every theme. Returns the failures. */
export function checkContrast(resolved, pairs) {
  const fails = [];
  for (const theme of resolved.themes) {
    for (const { fg, bg, min } of pairs) {
      if (!resolved.color[fg] || !resolved.color[bg]) { fails.push({ theme, fg, bg, min, ratio: 0, reason: "unknown token" }); continue; }
      const r = ratio(resolved.color[fg][theme], resolved.color[bg][theme]);
      if (r < min) fails.push({ theme, fg, bg, min, ratio: Number(r.toFixed(2)) });
    }
  }
  return fails;
}
