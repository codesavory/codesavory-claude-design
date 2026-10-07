// Turns a resolved language into files a project can use. Every generator is a pure function: same input, same text.

const banner = (r, comment) => comment(`Generated from the Codesavory design language ${r.version}${r.app ? ` (app layer: ${r.app})` : ""}. Do not edit by hand: change the language, then run \`dl sync\`.`);

const kebabToCamel = (name) => {
  const parts = name.split(/[-.]/).filter(Boolean);
  const s = parts.map((p, i) => (i === 0 ? p[0].toLowerCase() + p.slice(1) : p[0].toUpperCase() + p.slice(1))).join("");
  return /^[0-9]/.test(s) ? `_${s}` : s;
};
const hexToInt = (hex) => `0x${hex.replace("#", "").toUpperCase()}`;
const num = (px) => Number.parseFloat(String(px));

/** CSS custom properties. `opts.systemMedia` also follows the device when no theme class is set. */
export function css(r, opts = {}) {
  const [first, ...rest] = r.themes;
  const L = [];
  const block = (sel, theme, withFixed) => {
    L.push(`${sel} {`, `  color-scheme: ${theme};`);
    for (const [name, vals] of Object.entries(r.color)) {
      if (theme !== first && vals[theme] === vals[first]) continue;
      L.push(`  --${name}: ${vals[theme]};`);
    }
    if (withFixed) {
      for (const [fam, toks] of Object.entries(r.families)) {
        for (const [name, v] of Object.entries(toks)) {
          if (typeof v === "string") L.push(`  --${name}: ${v};`);
          else L.push(`  --${name}: ${v[theme] ?? v[first]};`);
        }
      }
      for (const [key, stack] of Object.entries(r.type.families)) L.push(`  --font-${key}: ${stack};`);
      for (const g of r.type.groups) for (const s of g.styles) {
        L.push(`  --type-${s.name}-size: ${s.fontSize};`, `  --type-${s.name}-line: ${s.lineHeight};`, `  --type-${s.name}-weight: ${s.fontWeight};`);
        if (s.letterSpacing) L.push(`  --type-${s.name}-tracking: ${s.letterSpacing};`);
      }
    } else {
      for (const [fam, toks] of Object.entries(r.families)) for (const [name, v] of Object.entries(toks)) if (typeof v === "object" && v[theme] !== v[first]) L.push(`  --${name}: ${v[theme]};`);
    }
    L.push("}");
  };
  L.push(banner(r, (t) => `/* ${t} */`), "");
  // Fonts are served from the project itself (never from Google), so visiting a page tells no third party anything.
  const fontUrl = opts.fontUrl ?? "fonts/";
  for (const f of r.type.fonts ?? []) L.push(`@font-face { font-family: "${f.family}"; src: url("${fontUrl}${f.file.split("/").pop()}") format("woff2"); font-weight: ${f.weight}; font-style: ${f.style ?? "normal"}; font-display: swap; }`);
  if ((r.type.fonts ?? []).length) L.push("");
  block(':root, [data-theme="light"]', first, true);
  for (const th of rest) {
    L.push("");
    block(`.${th}, [data-theme="${th}"]`, th, false);
    if (opts.systemMedia) { L.push("", `@media (prefers-color-scheme: ${th}) {`); block(`:root:not([data-theme="${first}"]):not(.${first})`, th, false); L.push("}"); }
  }
  // Palettes: only the variables a palette changes, for light (on any element carrying data-palette) and dark (needs the theme too, so it wins).
  for (const [pname, pal] of Object.entries(r.palettes ?? {})) {
    const changed = Object.keys(r.color).filter((n) => r.themes.some((th) => pal.color[n][th] !== r.color[n][th]));
    if (changed.length === 0) continue;
    L.push("", `/* Palette: ${pal.name}. ${pal.description} */`);
    L.push(`[data-palette="${pname}"] {`, ...changed.map((n) => `  --${n}: ${pal.color[n][first]};`), "}");
    for (const th of rest) L.push(`[data-palette="${pname}"].${th}, [data-palette="${pname}"][data-theme="${th}"] {`, ...changed.map((n) => `  --${n}: ${pal.color[n][th]};`), "}");
  }
  return L.join("\n") + "\n";
}

const parseBezier = (s) => (/cubic-bezier\(([^)]+)\)/.exec(s)?.[1] ?? "0.2, 0.9, 0.2, 1").split(",").map((x) => Number.parseFloat(x));

/** SwiftUI constants under the `DS` namespace: dynamic colours, spacing, radius, durations, easing and the type scale. */
export function swift(r) {
  const [light, dark] = [r.themes[0], r.themes[1] ?? r.themes[0]];
  const L = [banner(r, (t) => `// ${t}`), "", "import SwiftUI", "#if canImport(UIKit)", "import UIKit", "#elseif canImport(AppKit)", "import AppKit", "#endif", "",
    "public struct DSTypeStyle {", "    public let size: CGFloat", "    public let lineHeight: CGFloat", "    public let weight: Font.Weight", "    public let tracking: CGFloat", "}", "",
    "public enum DS {",
    `    public static let version = "${r.version}"`, `    public static let app = "${r.app ?? "core"}"`, "",
    "    /// A colour that follows light and dark appearance (and an app's forced appearance).",
    "    public static func dynamic(_ light: UInt32, _ dark: UInt32) -> Color {",
    "        #if canImport(UIKit)",
    "        return Color(UIColor { $0.userInterfaceStyle == .dark ? DS.ui(dark) : DS.ui(light) })",
    "        #else",
    "        return Color(NSColor(name: nil) { $0.bestMatch(from: [.darkAqua, .aqua]) == .darkAqua ? DS.ns(dark) : DS.ns(light) })",
    "        #endif", "    }",
    "    #if canImport(UIKit)",
    "    static func ui(_ h: UInt32) -> UIColor { UIColor(red: CGFloat((h >> 16) & 0xFF) / 255, green: CGFloat((h >> 8) & 0xFF) / 255, blue: CGFloat(h & 0xFF) / 255, alpha: 1) }",
    "    #else",
    "    static func ns(_ h: UInt32) -> NSColor { NSColor(srgbRed: CGFloat((h >> 16) & 0xFF) / 255, green: CGFloat((h >> 8) & 0xFF) / 255, blue: CGFloat(h & 0xFF) / 255, alpha: 1) }",
    "    #endif", "", "    public enum Palette {"];
  for (const [name, v] of Object.entries(r.color)) L.push(`        public static let ${kebabToCamel(name)} = DS.dynamic(${hexToInt(v[light])}, ${hexToInt(v[dark])})`);
  L.push("    }", "");
  const lenEnum = (title, fam, pick = (v) => `CGFloat(${num(v)})`, type = "CGFloat") => {
    if (!r.families[fam]) return;
    L.push(`    public enum ${title} {`);
    for (const [name, v] of Object.entries(r.families[fam])) { if (typeof v === "string") L.push(`        public static let ${kebabToCamel(name)}: ${type} = ${pick(v)}`); }
    L.push("    }", "");
  };
  lenEnum("Space", "spacing"); lenEnum("Radius", "radius", (v) => (v.endsWith("%") ? "9999" : `CGFloat(${num(v)})`)); lenEnum("Size", "size");
  if (r.families.duration) {
    L.push("    public enum Duration {");
    for (const [name, v] of Object.entries(r.families.duration)) L.push(`        public static let ${kebabToCamel(name)}: Double = ${num(v) / 1000}`);
    L.push("    }", "");
  }
  if (r.families.easing) {
    L.push("    public enum Ease {");
    for (const [name, v] of Object.entries(r.families.easing)) { const [a, b, c, d] = parseBezier(v); L.push(`        public static func ${kebabToCamel(name)}(_ duration: Double) -> Animation { .timingCurve(${a}, ${b}, ${c}, ${d}, duration: duration) }`); }
    L.push("    }", "");
  }
  L.push("    public enum Typeface {");
  for (const [key, stack] of Object.entries(r.type.families)) L.push(`        public static let ${key} = "${stack.split(",")[0].replace(/"/g, "").trim()}"`);
  L.push("    }", "", "    public enum TypeScale {");
  const weight = (w) => (w >= 800 ? ".heavy" : w >= 700 ? ".bold" : w >= 600 ? ".semibold" : w >= 500 ? ".medium" : ".regular");
  for (const g of r.type.groups) for (const s of g.styles) {
    const size = num(s.fontSize); const track = s.letterSpacing ? (String(s.letterSpacing).endsWith("em") ? Number((num(s.letterSpacing) * size).toFixed(2)) : num(s.letterSpacing)) : 0;
    L.push(`        public static let ${kebabToCamel(s.name)} = DSTypeStyle(size: ${size}, lineHeight: ${num(s.lineHeight)}, weight: ${weight(Number(String(s.fontWeight).split(" ")[0]))}, tracking: ${track})`);
  }
  L.push("    }", "}", "");
  return L.join("\n");
}

/** Plain JSON for any tool: Houdini, After Effects scripts, Figma plugins, other languages. */
export function json(r) {
  return JSON.stringify({ name: r.name, version: r.version, app: r.app, themes: r.themes, defaultPalette: r.defaultPalette, color: r.color, palettes: r.palettes, ...r.families, type: r.type, provenance: r.provenance, overrides: r.overrides }, null, 1) + "\n";
}

export const TARGETS = { css, swift, json };
/** Targets that copy binary files from core instead of generating text. */
export const COPY_TARGETS = new Set(["fonts"]);
export const DEFAULT_FILES = { css: "tokens.css", swift: "DesignTokens.swift", json: "resolved.json" };
