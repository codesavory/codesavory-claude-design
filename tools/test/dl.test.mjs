import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { load, validate, resolve, palettes, withPalette, ROOT } from "../lib/language.mjs";
import { checkContrast, ratio } from "../lib/contrast.mjs";
import { css, swift, json } from "../lib/targets.mjs";

const compile = (app) => { const l = load(ROOT, app); return { l, r: resolve(l) }; };
/** Like `compile`, with every non-default palette resolved and attached, as tools/dl.mjs does before generating files. */
const compileWithPalettes = (app) => {
  const { l, r } = compile(app);
  const def = palettes(ROOT);
  r.defaultPalette = def.default;
  r.palettes = {};
  for (const [name, pal] of Object.entries(def.palettes)) {
    if (name === def.default) continue;
    r.palettes[name] = { name: pal.name, description: pal.description ?? "", color: resolve(withPalette(l, ROOT, name)).color };
  }
  return { l, r, def };
};

test("the core validates and every colour resolves in both themes", () => {
  const { l, r } = compile(null);
  assert.deepEqual(validate(l), []);
  assert.deepEqual(r.themes, ["light", "dark"]);
  for (const [name, v] of Object.entries(r.color)) for (const th of r.themes) assert.match(v[th], /^#[0-9a-f]{6}$/, `${name} ${th}`);
});

test("the core and every app layer meet every contrast pair in both themes", () => {
  for (const app of [null, "kickoff", "lasya"]) { const { l, r } = compile(app); assert.deepEqual(checkContrast(r, l.contrast), [], app ?? "core"); }
});

test("contrast maths matches known values", () => {
  assert.equal(ratio("#000000", "#ffffff").toFixed(1), "21.0");
  assert.equal(ratio("#777777", "#ffffff").toFixed(2), "4.48");
});

test("a failing pair is reported with the theme and the numbers", () => {
  const { r } = compile(null);
  const fails = checkContrast(r, [{ fg: "ink-subtle", bg: "surface", min: 7 }]);
  assert.ok(fails.length >= 1 && fails[0].theme && fails[0].ratio < 7);
});

test("the Kickoff layer adds tokens and overrides nothing", () => {
  const { l, r } = compile("kickoff");
  assert.equal(l.overrides.length, 0);
  assert.equal(l.provenance["ring-near"], "app");
  assert.equal(l.provenance["brand"], "core");
  assert.equal(r.color["ring-near"].light, r.color["accent-text"].light);   // aliases follow the core
  assert.equal(r.families.size["ring-hero"], "132px");
});

test("the Lasya layer adds tokens and overrides nothing", () => {
  const { l } = compile("lasya");
  assert.equal(l.overrides.length, 0);
  assert.equal(l.provenance["media-ground"], "app");
  assert.equal(l.provenance["frame-count"], "app");
  assert.equal(l.provenance["brand"], "core");
});

test("an app layer cannot add to the type scale or override something that does not exist", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dl-"));
  fs.cpSync(ROOT, tmp, { recursive: true, filter: (s) => !s.includes("dist") });
  fs.mkdirSync(path.join(tmp, "apps", "bad"), { recursive: true });
  const f = path.join(tmp, "apps", "bad", "tokens.json");
  fs.writeFileSync(f, JSON.stringify({ add: { type: [] } }));
  assert.throws(() => load(tmp, "bad"), /cannot add to "type"/);
  fs.writeFileSync(f, JSON.stringify({ override: { color: [{ name: "nope", value: "#000000" }] } }));
  assert.throws(() => load(tmp, "bad"), /does not exist/);
  fs.writeFileSync(f, JSON.stringify({ add: { color: [{ name: "ink", value: "#000000", usage: "dup" }] } }));
  assert.ok(validate(load(tmp, "bad")).some((e) => /duplicate/.test(e)));
});

test("a broken alias is caught", () => {
  const { l } = compile(null);
  l.tokens.color.tokens.push({ name: "ghost", value: "{does-not-exist}", usage: "x" });
  assert.ok(validate(l).some((e) => /unknown colour/.test(e)));
});

test("CSS output has both themes, the fixed tokens and the banner", () => {
  const out = css(compile("kickoff").r);
  assert.match(out, /Generated from the Codesavory design language/);
  assert.match(out, /:root, \[data-theme="light"\] \{[\s\S]*--surface: #[0-9a-f]{6};/);
  assert.match(out, /\.dark, \[data-theme="dark"\] \{[\s\S]*--surface: #[0-9a-f]{6};/);
  assert.match(out, /--space-4: 16px;/);
  assert.match(out, /--ease-whistle: cubic-bezier\(0\.2, 0\.9, 0\.2, 1\);/);
  assert.match(out, /--font-display:/);
  assert.doesNotMatch(out, /undefined|NaN/);
});

test("Swift output names tokens in camelCase and defines the DS namespace", () => {
  const out = swift(compile("kickoff").r);
  assert.match(out, /public enum DS \{/);
  assert.match(out, /public static let surfaceRaised = DS\.dynamic\(0x[0-9A-F]{6}, 0x[0-9A-F]{6}\)/);
  assert.match(out, /public static let ember600 = /);
  assert.match(out, /public static let space4: CGFloat = CGFloat\(16\)/);
  assert.match(out, /public static func easeWhistle\(_ duration: Double\) -> Animation \{ \.timingCurve\(0\.2, 0\.9, 0\.2, 1, duration: duration\) \}/);
  assert.match(out, /public static let titleL = DSTypeStyle\(size: 28, lineHeight: 34, weight: \.semibold, tracking: -?\d+(\.\d+)?\)/);
  assert.doesNotMatch(out, /undefined|NaN/);
});

test("JSON output parses and carries provenance", () => {
  const j = JSON.parse(json(compile("kickoff").r));
  assert.equal(j.app, "kickoff");
  assert.equal(j.provenance["ring-live"], "app");
  assert.ok(j.color.ink.dark);
});

test("generators are deterministic", () => { for (const fn of [css, swift, json]) assert.equal(fn(compile("kickoff").r), fn(compile("kickoff").r)); });

// The command line, against a throwaway copy of the language and a throwaway project.
function sandbox() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dl-root-"));
  fs.cpSync(ROOT, root, { recursive: true, filter: (s) => !s.includes(`${path.sep}dist`) });
  const proj = fs.mkdtempSync(path.join(os.tmpdir(), "dl-proj-"));
  fs.writeFileSync(path.join(root, "consumers.json"), JSON.stringify({ consumers: [{ name: "demo", app: "kickoff", path: proj, targets: [{ type: "css", out: "src/tokens.css" }, { type: "swift", out: "ios/DesignTokens.swift" }, { type: "json", out: "design/resolved.json" }] }] }));
  const dl = (...a) => spawnSync("node", [path.join(root, "tools", "dl.mjs"), ...a], { env: { ...process.env, DESIGN_LANGUAGE_ROOT: root }, encoding: "utf8" });
  return { root, proj, dl };
}

test("sync writes files and a lock, status says in sync, a hand edit is noticed", () => {
  const { proj, dl } = sandbox();
  assert.match(dl("status").stdout, /demo\s+app kickoff\s+behind/);
  const s = dl("sync");
  assert.equal(s.status, 0, s.stdout + s.stderr);
  for (const f of ["src/tokens.css", "ios/DesignTokens.swift", "design/resolved.json", "design/design.lock.json"]) assert.ok(fs.existsSync(path.join(proj, f)), f);
  assert.match(dl("status").stdout, /demo\s+app kickoff\s+in sync/);
  fs.appendFileSync(path.join(proj, "src/tokens.css"), "/* hand edit */\n");
  assert.match(dl("status").stdout, /edited by hand/);
});

test("changing a token in the language makes projects behind, and sync catches them up", () => {
  const { proj, dl } = sandbox();
  dl("sync");
  const set = dl("set", "color", "accent", "#ffd400", "--theme", "light");
  assert.equal(set.status, 0, set.stdout);
  assert.match(dl("status").stdout, /behind/);
  assert.equal(dl("sync").status, 0);
  assert.match(fs.readFileSync(path.join(proj, "src/tokens.css"), "utf8"), /--accent: #ffd400;/);
  assert.match(dl("status").stdout, /in sync/);
});

test("set refuses a change that breaks contrast and leaves the file untouched", () => {
  const { root, dl } = sandbox();
  const file = path.join(root, "core", "tokens.json");
  const before = fs.readFileSync(file, "utf8");
  const r = dl("set", "color", "ink", "#e8e8e8", "--theme", "light");
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Not applied/);
  assert.equal(fs.readFileSync(file, "utf8"), before);
});

test("bump raises the version and writes the changelog", () => {
  const { root, dl } = sandbox();
  const [a, b] = fs.readFileSync(path.join(root, "VERSION"), "utf8").trim().split(".").map(Number);
  const next = `${a}.${b + 1}.0`;
  assert.equal(dl("bump", "minor", "Added a token").status, 0);
  assert.equal(fs.readFileSync(path.join(root, "VERSION"), "utf8").trim(), next);
  assert.match(fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8"), new RegExp(`## ${next.replaceAll(".", "\\.")}[\\s\\S]*Added a token`));
});

test("new-app scaffolds an app layer that checks", () => {
  const { root, dl } = sandbox();
  assert.equal(dl("new-app", "notes").status, 0);
  assert.ok(fs.existsSync(path.join(root, "apps", "notes", "tokens.json")));
  assert.equal(dl("check").status, 0);
});

test("export-artifact writes the project files and the marks", () => {
  const { dl } = sandbox();
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "dl-art-"));
  assert.equal(dl("export-artifact", out).status, 0);
  for (const f of ["project/tokens.json", "project/README.md", "project/components/bundle.css", "project/components/Cover/preview.html", "uploads/mark-on-light.svg"]) assert.ok(fs.existsSync(path.join(out, f)), f);
});

test("the lock holds a plain SHA-256 prefix of each file, so a project can verify it without this tool", () => {
  const { proj, dl } = sandbox();
  dl("sync");
  const lock = JSON.parse(fs.readFileSync(path.join(proj, "design/design.lock.json"), "utf8"));
  for (const [file, h] of Object.entries(lock.files)) {
    const text = fs.readFileSync(path.join(proj, file), "utf8");
    assert.equal(h, crypto.createHash("sha256").update(text).digest("hex").slice(0, 16), file);
  }
});

test("every palette passes the same contrast pairs in both themes", () => {
  const out = spawnSync("node", [path.join(ROOT, "tools", "dl.mjs"), "check"], { encoding: "utf8" });
  assert.equal(out.status, 0, out.stdout);
  assert.ok(out.stdout.includes(`palettes: ${Object.keys(palettes(ROOT).palettes).join(", ")}`), out.stdout);
});

/** A palette that overrides something (the default palette overrides nothing). */
const overriding = (d) => Object.keys(d.palettes).find((n) => n !== d.default && d.palettes[n].overrides);

test("a palette that breaks contrast is rejected", () => {
  const { root, dl } = sandbox();
  const f = path.join(root, "core", "palettes.json");
  const d = JSON.parse(fs.readFileSync(f, "utf8"));
  const name = overriding(d);
  d.palettes[name].overrides["ink-muted"] = { light: "#dddddd", dark: "#dddddd" };
  fs.writeFileSync(f, JSON.stringify(d));
  const r = dl("check");
  assert.equal(r.status, 1);
  assert.match(r.stdout, new RegExp(`palette ${name}: contrast`));
});

test("a palette naming an unknown token is rejected", () => {
  const { root, dl } = sandbox();
  const f = path.join(root, "core", "palettes.json");
  const d = JSON.parse(fs.readFileSync(f, "utf8"));
  d.palettes[overriding(d)].overrides["not-a-token"] = { light: "#000000", dark: "#ffffff" };
  fs.writeFileSync(f, JSON.stringify(d));
  const r = dl("check");
  assert.equal(r.status, 1);
  assert.match(r.stdout, /unknown colour token "not-a-token"/);
});

test("CSS carries each palette for light and dark, and only what changes", () => {
  const { r, def } = compileWithPalettes("kickoff");
  const out = css(r);
  assert.ok(Object.keys(r.palettes).length >= 1, "at least one non-default palette");
  assert.ok(!out.includes(`[data-palette="${def.default}"]`), "the default palette needs no block");
  for (const name of Object.keys(r.palettes)) {
    const light = out.match(new RegExp(`\\[data-palette="${name}"\\] \\{([^}]*)\\}`));
    const dark = out.match(new RegExp(`\\[data-palette="${name}"\\]\\.dark, \\[data-palette="${name}"\\]\\[data-theme="dark"\\] \\{([^}]*)\\}`));
    assert.ok(light && dark, `${name} has a light and a dark block`);
    assert.match(light[1], /--accent: #[0-9a-f]{6};/, `${name} sets the accent`);
    // Only what changes: an untouched token never appears in a palette block.
    assert.doesNotMatch(light[1] + dark[1], /--surface:|--ink:|--space-4:/, `${name} must not repeat unchanged tokens`);
  }
});
