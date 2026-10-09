#!/usr/bin/env node
// dl: the design language tool. Run `node tools/dl.mjs help`.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { ROOT, load, validate, resolve, listApps, read, version, palettes, withPalette } from "./lib/language.mjs";
import { checkContrast } from "./lib/contrast.mjs";
import { TARGETS, DEFAULT_FILES, COPY_TARGETS } from "./lib/targets.mjs";

const args = process.argv.slice(2);
const cmd = args[0] ?? "help";
const flag = (n, d = null) => { const i = args.indexOf(`--${n}`); return i < 0 ? d : (args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true); };
const positional = args.slice(1).filter((a, i, arr) => !a.startsWith("--") && !(arr[i - 1] ?? "").startsWith("--"));
const home = (p) => (p.startsWith("~") ? path.join(os.homedir(), p.slice(1)) : p);
/** First 16 hex characters of the SHA-256 of the file text: what a project can recompute with no help from this tool. */
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
const same = (disk, text) => (typeof text === "string" ? disk.toString("utf8") === text : Buffer.compare(disk, text) === 0);
const log = (...a) => console.log(...a);

const consumersFile = path.join(ROOT, "consumers.json");
const consumers = () => (fs.existsSync(consumersFile) ? read(consumersFile).consumers : []);
const writeJson = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 1) + "\n");

/** Build one app (or the core) fully: validate, contrast-check, resolve. Throws with a readable list when something is wrong. */
function compile(app) {
  const lang = load(ROOT, app);
  const errors = validate(lang);
  if (errors.length) throw new Error(`${app ?? "core"}: ${errors.join("; ")}`);
  const resolved = resolve(lang);
  const fails = checkContrast(resolved, lang.contrast);
  if (fails.length) throw new Error(`${app ?? "core"}: contrast ${fails.map((f) => `${f.theme} ${f.fg} on ${f.bg} ${f.ratio} (need ${f.min})`).join("; ")}`);
  // Every palette must be valid and meet the same contrast pairs in both themes.
  const def = palettes(ROOT);
  resolved.defaultPalette = def.default;
  resolved.palettes = {};
  for (const [name, pal] of Object.entries(def.palettes)) {
    if (name === def.default) continue;
    const pl = withPalette(lang, ROOT, name);
    const errs = validate(pl);
    if (errs.length) throw new Error(`${app ?? "core"} palette ${name}: ${errs.join("; ")}`);
    const pr = resolve(pl);
    const pf = checkContrast(pr, lang.contrast);
    if (pf.length) throw new Error(`${app ?? "core"} palette ${name}: contrast ${pf.map((f) => `${f.theme} ${f.fg} on ${f.bg} ${f.ratio} (need ${f.min})`).join("; ")}`);
    resolved.palettes[name] = { name: pal.name, description: pal.description ?? "", color: pr.color };
  }
  return resolved;
}

function generate(consumer) {
  const resolved = compile(consumer.app);
  const out = [];
  for (const t of consumer.targets) {
    if (COPY_TARGETS.has(t.type)) {   // fonts: copy every file in core/fonts into the project
      const dir = path.join(ROOT, "core", t.type);
      for (const f of fs.readdirSync(dir).sort()) out.push({ ...t, out: path.posix.join(t.out, f), text: fs.readFileSync(path.join(dir, f)) });
      continue;
    }
    if (!TARGETS[t.type]) throw new Error(`${consumer.name}: unknown target type "${t.type}"`);
    out.push({ ...t, text: TARGETS[t.type](resolved, t.options ?? {}) });
  }
  return { resolved, files: out };
}

function lockPath(consumer) { return path.join(home(consumer.path), consumer.lock ?? "design/design.lock.json"); }

function consumerStatus(consumer) {
  const base = home(consumer.path);
  if (!fs.existsSync(base)) return { state: "missing project", files: [] };
  const { files } = generate(consumer);
  const lock = fs.existsSync(lockPath(consumer)) ? read(lockPath(consumer)) : null;
  const rows = files.map((f) => {
    const file = path.join(base, f.out);
    if (!fs.existsSync(file)) return { out: f.out, state: "missing" };
    const disk = fs.readFileSync(file);
    if (same(disk, f.text)) return { out: f.out, state: "in sync" };
    if (lock && lock.files?.[f.out] && lock.files[f.out] !== sha(disk)) return { out: f.out, state: "edited by hand" };
    return { out: f.out, state: "behind (language changed)" };
  });
  const state = rows.every((r) => r.state === "in sync") ? "in sync" : rows.some((r) => r.state === "edited by hand") ? "edited by hand" : "behind";
  return { state, files: rows, lockVersion: lock?.version };
}

function sync(consumer, dry = false) {
  const base = home(consumer.path);
  if (!fs.existsSync(base)) { log(`  skip ${consumer.name}: ${base} does not exist`); return false; }
  const { files } = generate(consumer);
  const lockFiles = {};
  let changed = 0;
  for (const f of files) {
    const file = path.join(base, f.out);
    const unchanged = fs.existsSync(file) && same(fs.readFileSync(file), f.text);
    if (!unchanged) { changed++; if (!dry) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, f.text); } }
    lockFiles[f.out] = sha(f.text);
    log(`  ${unchanged ? "same   " : dry ? "would  " : "wrote  "} ${consumer.name}: ${f.out}`);
  }
  if (!dry) {
    fs.mkdirSync(path.dirname(lockPath(consumer)), { recursive: true });
    writeJson(lockPath(consumer), { language: "codesavory", version: version(), app: consumer.app, root: "~/" + path.relative(os.homedir(), ROOT), files: lockFiles });
  }
  return changed > 0;
}

const pick = () => { const n = flag("consumer"); return n ? consumers().filter((c) => c.name === n) : consumers(); };

const commands = {
  help() {
    log(`dl: the Codesavory design language tool (${ROOT})

  check                         validate the core and every app: names, aliases, themes, contrast (exit 1 on a problem)
  status [--strict]             is each registered project in step with the language?
  build                         write dist/<app>/ (css, swift, json) for the core and every app
  sync [--consumer name] [--dry] write generated files into every registered project (or one)
  set <family> <name> <value> [--theme light] [--app kickoff] [--sync]
                                change one token safely (rolls back if the language stops validating)
  bump <major|minor|patch> "note" raise the version and add a CHANGELOG line
  new-app <name>                scaffold apps/<name>
  add-consumer <name> <path> --app <app> [--css out] [--swift out] [--json out]
                                register a project that should receive the generated files
  watch                         re-check and sync everything whenever the language changes
  apps                          list the app layers`);
  },
  apps() { for (const a of listApps()) log(a); },
  check() {
    let bad = 0;
    for (const app of [null, ...listApps()]) {
      try { const r = compile(app); log(`ok    ${app ?? "core"} (${Object.keys(r.color).length} colours, ${r.overrides.length} overrides, palettes: ${[r.defaultPalette, ...Object.keys(r.palettes)].join(", ")})`); }
      catch (e) { bad++; log(`FAIL  ${e.message}`); }
    }
    process.exit(bad ? 1 : 0);
  },
  status() {
    log(`language ${version()}  (${ROOT})\n`);
    let drift = 0;
    for (const c of consumers()) {
      let s; try { s = consumerStatus(c); } catch (e) { s = { state: `error: ${e.message}`, files: [] }; }
      if (s.state !== "in sync") drift++;
      log(`${c.name.padEnd(14)} app ${(c.app ?? "core").padEnd(10)} ${s.state}${s.lockVersion && s.lockVersion !== version() ? `  (last synced at ${s.lockVersion})` : ""}`);
      for (const f of s.files) if (f.state !== "in sync") log(`    ${f.out}: ${f.state}`);
    }
    for (const app of listApps()) { const l = load(ROOT, app); if (l.overrides.length) log(`\n${app} overrides universal tokens: ${l.overrides.map((o) => o.name).join(", ")}`); }
    if (flag("strict") && drift) process.exit(1);
  },
  build() {
    for (const app of [null, ...listApps()]) {
      const r = compile(app);
      const dir = path.join(ROOT, "dist", app ?? "core");
      fs.mkdirSync(dir, { recursive: true });
      for (const [type, fn] of Object.entries(TARGETS)) fs.writeFileSync(path.join(dir, DEFAULT_FILES[type]), fn(r));
      log(`built dist/${app ?? "core"}`);
    }
  },
  sync() {
    commands.check_quiet();
    const dry = !!flag("dry");
    const list = pick();
    if (list.length === 0) log("No consumers registered (see add-consumer).");
    for (const c of list) { log(c.name); sync(c, dry); }
  },
  check_quiet() { for (const app of [null, ...listApps()]) compile(app); },
  set() {
    const [family, name, value] = positional;
    if (!family || !name || value === undefined) { log("usage: set <family> <name> <value> [--theme light] [--app kickoff]"); process.exit(2); }
    const app = flag("app");
    const file = path.join(ROOT, app ? `apps/${app}/tokens.json` : "core/tokens.json");
    const before = fs.readFileSync(file, "utf8");
    const doc = JSON.parse(before);
    const list = app ? (doc.override?.[family] ?? doc.add?.[family]) : doc[family]?.tokens;
    const tok = list?.find((t) => t.name === name);
    if (!tok) { log(`No token "${name}" in ${family}${app ? ` of ${app}` : ""}. (App layers can only set tokens they add or override.)`); process.exit(2); }
    const theme = flag("theme");
    if (theme && typeof tok.value === "object") tok.value[theme] = value; else if (typeof tok.value === "object" && !theme) { log("That token has one value per theme: pass --theme light|dark."); process.exit(2); } else tok.value = value;
    writeJson(file, doc);
    try { commands.check_quiet(); } catch (e) { fs.writeFileSync(file, before); log(`Not applied: ${e.message}`); process.exit(1); }
    log(`set ${family}/${name}${theme ? ` (${theme})` : ""} = ${value}`);
    if (flag("sync")) commands.sync(); else log("Run `dl sync` to push it to your projects (and `dl bump patch \"note\"` to record it).");
  },
  bump() {
    const [level, ...note] = positional;
    if (!["major", "minor", "patch"].includes(level)) { log('usage: bump <major|minor|patch> "note"'); process.exit(2); }
    const [a, b, c] = version().split(".").map(Number);
    const next = level === "major" ? `${a + 1}.0.0` : level === "minor" ? `${a}.${b + 1}.0` : `${a}.${b}.${c + 1}`;
    fs.writeFileSync(path.join(ROOT, "VERSION"), next + "\n");
    const cl = path.join(ROOT, "CHANGELOG.md");
    const old = fs.existsSync(cl) ? fs.readFileSync(cl, "utf8") : "# Changelog\n\n";
    const head = old.startsWith("# Changelog") ? "# Changelog\n\n" : "";
    fs.writeFileSync(cl, `${head}## ${next} (${new Date().toISOString().slice(0, 10)})\n\n- ${note.join(" ") || level + " change"}\n\n${old.replace(/^# Changelog\n\n/, "")}`);
    log(`version ${next}`);
  },
  "new-app"() {
    const name = positional[0];
    if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) { log("usage: new-app <lower-case-name>"); process.exit(2); }
    const dest = path.join(ROOT, "apps", name);
    if (fs.existsSync(dest)) { log(`apps/${name} already exists`); process.exit(2); }
    fs.cpSync(path.join(ROOT, "apps", "_template"), dest, { recursive: true });
    for (const f of fs.readdirSync(dest)) { const p = path.join(dest, f); fs.writeFileSync(p, fs.readFileSync(p, "utf8").replaceAll("__APP__", name)); }
    log(`created apps/${name}. Edit apps/${name}/tokens.json and DESIGN.md, then \`dl add-consumer\`.`);
  },
  "add-consumer"() {
    const [name, p] = positional;
    const app = flag("app");
    if (!name || !p || !app) { log("usage: add-consumer <name> <path> --app <app> [--css out] [--swift out] [--json out]"); process.exit(2); }
    const targets = [];
    if (flag("css")) targets.push({ type: "css", out: flag("css") });
    if (flag("swift")) targets.push({ type: "swift", out: flag("swift") });
    if (flag("json")) targets.push({ type: "json", out: flag("json") });
    if (targets.length === 0) { log("Give at least one of --css, --swift, --json."); process.exit(2); }
    const doc = fs.existsSync(consumersFile) ? read(consumersFile) : { consumers: [] };
    doc.consumers = doc.consumers.filter((c) => c.name !== name).concat({ name, app, path: p, targets });
    writeJson(consumersFile, doc);
    log(`registered ${name}. Run \`dl sync --consumer ${name}\`.`);
  },
  "export-artifact"() {
    const dir = positional[0];
    if (!dir) { log("usage: export-artifact <empty folder>"); process.exit(2); }
    compile(null);
    const proj = path.join(dir, "project");
    const put = (rel, text) => { const f = path.join(proj, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };
    put("tokens.json", JSON.stringify(load(ROOT, null).tokens, null, 1) + "\n");
    put("README.md", fs.readFileSync(path.join(ROOT, "DESIGN.md"), "utf8"));
    put("components/bundle.css", fs.readFileSync(path.join(ROOT, "core", "components.css"), "utf8"));
    for (const c of fs.readdirSync(path.join(ROOT, "core", "components"))) for (const f of fs.readdirSync(path.join(ROOT, "core", "components", c))) put(`components/${c}/${f}`, fs.readFileSync(path.join(ROOT, "core", "components", c, f), "utf8"));
    put("assets/Marks/README.md", fs.readFileSync(path.join(ROOT, "core", "marks", "README.md"), "utf8"));
    const up = path.join(dir, "uploads"); fs.mkdirSync(up, { recursive: true });
    for (const f of fs.readdirSync(path.join(ROOT, "core", "marks")).filter((x) => x.endsWith(".svg"))) fs.copyFileSync(path.join(ROOT, "core", "marks", f), path.join(up, f));
    log(`Wrote ${proj} and the SVG marks to ${up}. Ask Claude to republish the "Codesavory Design System" artifact from this folder (SVGs are uploaded as assets, everything under project/ as files).`);
  },
  watch() {
    log(`watching core/ and apps/ ... (Ctrl-C to stop)`);
    let t;
    const run = () => { try { commands.check_quiet(); for (const c of consumers()) sync(c); log(`synced ${new Date().toLocaleTimeString()}`); } catch (e) { log(`not synced: ${e.message}`); } };
    for (const d of ["core", "apps"]) fs.watch(path.join(ROOT, d), { recursive: true }, () => { clearTimeout(t); t = setTimeout(run, 400); });
    run();
  },
};

if (!commands[cmd]) { log(`Unknown command "${cmd}".`); commands.help(); process.exit(2); }
try { commands[cmd](); } catch (e) { log(`dl ${cmd}: ${e.message}`); process.exit(1); }
