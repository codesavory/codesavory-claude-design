// Loads the universal core and an app layer, merges them, validates them and resolves every colour per theme.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export const ROOT = process.env.DESIGN_LANGUAGE_ROOT ?? path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
export const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
export const version = (root = ROOT) => fs.readFileSync(path.join(root, "VERSION"), "utf8").trim();

/** Families that are plain `{tokens:[{name,value,usage}]}` lists. `color` and `type` have their own shapes. */
export const LIST_FAMILIES = ["spacing", "radius", "shadow", "duration", "easing", "size"];
const HEX = /^#[0-9a-f]{6}$/i;
const NAME = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/;

export function listApps(root = ROOT) {
  const dir = path.join(root, "apps");
  return fs.readdirSync(dir).filter((d) => !d.startsWith("_") && fs.existsSync(path.join(dir, d, "tokens.json")));
}

/** Core merged with an app's additions and overrides. `app` null gives the core alone. */
export function load(root = ROOT, app = null) {
  const core = read(path.join(root, "core", "tokens.json"));
  const merged = structuredClone(core);
  const provenance = {};
  for (const fam of ["color", ...LIST_FAMILIES]) for (const t of merged[fam]?.tokens ?? []) provenance[t.name] = "core";
  const overrides = [];
  let contrast = read(path.join(root, "core", "contrast.json")).pairs;
  if (app) {
    const file = path.join(root, "apps", app, "tokens.json");
    if (!fs.existsSync(file)) throw new Error(`No app layer "${app}" (expected ${file})`);
    const layer = read(file);
    for (const [fam, tokens] of Object.entries(layer.add ?? {})) {
      if (fam !== "color" && !LIST_FAMILIES.includes(fam)) throw new Error(`apps/${app}: cannot add to "${fam}" (the type scale and themes are universal)`);
      merged[fam] ??= { tokens: [] };
      for (const t of tokens) { merged[fam].tokens.push(t); provenance[t.name] = "app"; }
    }
    for (const [fam, tokens] of Object.entries(layer.override ?? {})) {
      for (const t of tokens) {
        const target = merged[fam]?.tokens.find((x) => x.name === t.name);
        if (!target) throw new Error(`apps/${app}: override of "${t.name}" in ${fam}, which does not exist in the core`);
        overrides.push({ family: fam, name: t.name, from: structuredClone(target.value), to: t.value });
        target.value = t.value;
        if (t.usage) target.usage = t.usage;
        provenance[t.name] = "core+override";
      }
    }
    contrast = contrast.concat(layer.contrast ?? []);
  }
  return { name: core.name, version: version(root), app, tokens: merged, provenance, overrides, contrast };
}

export function validate(lang) {
  const errors = [];
  const t = lang.tokens;
  const seen = new Set();
  for (const fam of ["color", ...LIST_FAMILIES]) {
    for (const tok of t[fam]?.tokens ?? []) {
      if (!NAME.test(tok.name)) errors.push(`${fam}: bad token name "${tok.name}"`);
      if (seen.has(tok.name)) errors.push(`${fam}: duplicate token name "${tok.name}" (names are shared across families)`);
      seen.add(tok.name);
      if (tok.value === undefined || tok.value === null || tok.value === "") errors.push(`${fam}/${tok.name}: no value`);
    }
  }
  const themes = (t.color.themes ?? []).map((x) => x.id);
  if (themes.length === 0) errors.push("color: no themes");
  const byName = new Map(t.color.tokens.map((x) => [x.name, x]));
  for (const tok of t.color.tokens) {
    for (const theme of themes) {
      try { resolveColor(byName, tok.name, theme); } catch (e) { errors.push(`color/${tok.name} (${theme}): ${e.message}`); }
    }
    if (!tok.usage) errors.push(`color/${tok.name}: missing usage note`);
  }
  return errors;
}

/** Hex value of a colour token in a theme, following {aliases}. A plain string applies to every theme; a missing theme inherits the first. */
export function resolveColor(byName, name, theme, depth = 0) {
  if (depth > 16) throw new Error(`alias chain too deep at "${name}"`);
  const tok = byName.get(name);
  if (!tok) throw new Error(`unknown colour "${name}"`);
  let v = typeof tok.value === "string" ? tok.value : (tok.value[theme] ?? Object.values(tok.value)[0]);
  const m = /^\{([^}]+)\}$/.exec(v);
  if (m) return resolveColor(byName, m[1], theme, depth + 1);
  if (!HEX.test(v)) throw new Error(`"${v}" is not a #rrggbb colour or an {alias}`);
  return v.toLowerCase();
}

export function resolve(lang) {
  const themes = lang.tokens.color.themes.map((x) => x.id);
  const byName = new Map(lang.tokens.color.tokens.map((x) => [x.name, x]));
  const color = {};
  for (const tok of lang.tokens.color.tokens) { color[tok.name] = {}; for (const th of themes) color[tok.name][th] = resolveColor(byName, tok.name, th); }
  const families = {};
  for (const fam of LIST_FAMILIES) {
    if (!lang.tokens[fam]) continue;
    families[fam] = {};
    for (const tok of lang.tokens[fam].tokens) families[fam][tok.name] = tok.value;
  }
  return { name: lang.name, version: lang.version, app: lang.app, themes, color, families, type: lang.tokens.type, provenance: lang.provenance, overrides: lang.overrides };
}

/** Stable hash of what a consumer receives. Same inputs, same hash. */
export function hash(obj) { return crypto.createHash("sha256").update(JSON.stringify(obj)).digest("hex").slice(0, 16); }
