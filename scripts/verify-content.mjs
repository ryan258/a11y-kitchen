import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceRoot = path.join(root, 'src');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  }));
  return nested.flat();
}

function fail(message) {
  throw new Error(message);
}

const sourceFiles = await walk(sourceRoot);
const cssFiles = sourceFiles.filter((file) => file.endsWith('.css'));
if (cssFiles.length !== 1 || path.basename(cssFiles[0]) !== 'global.css') {
  fail(`Expected one global stylesheet; found: ${cssFiles.join(', ')}`);
}

const css = await readFile(cssFiles[0], 'utf8');
// Every :root block counts as a token block, so a themed override such as
// @media (prefers-color-scheme: dark) { :root { ... } } can define tokens too.
const tokenBlocks = [...css.matchAll(/:root\s*\{[^}]*\}/g)].map((match) => [
  match.index,
  match.index + match[0].length,
]);
if (tokenBlocks.length === 0) fail('Could not find a :root token block.');

for (const match of css.matchAll(/#[0-9a-f]{3,8}\b/gi)) {
  const inTokenBlock = tokenBlocks.some(([start, end]) => match.index >= start && match.index < end);
  if (!inTokenBlock) fail(`Raw color ${match[0]} appears outside :root in global.css.`);
}

const publicFiles = sourceFiles.filter((file) => /\.(astro|js|ts)$/.test(file));
const publicSource = (await Promise.all(publicFiles.map((file) => readFile(file, 'utf8')))).join('\n');
const framingFiles = publicFiles.filter((file) => !file.endsWith(`${path.sep}about.astro`));
const framingSource = (await Promise.all(framingFiles.map((file) => readFile(file, 'utf8'))))
  .join('\n')
  .toLowerCase();
const prohibitedPhrases = [
  "experience what it's like to be blind",
  'feel what disability feels like',
  'empathy game',
];
for (const phrase of prohibitedPhrases) {
  if (framingSource.includes(phrase)) fail(`Prohibited framing found outside explanatory About copy: ${phrase}`);
}

if (publicSource.includes('<style')) fail('Component-local styles are not allowed.');
if (/\sstyle\s*=/.test(publicSource)) fail('Inline style attributes are not allowed.');
if (/\b(?:React|Vue|Svelte)\b/.test(publicSource)) {
  fail('A client-framework reference appeared in public source.');
}

const collectionRouteSource = await readFile(
  path.join(sourceRoot, 'pages', 'stations', '[slug].astro'),
  'utf8',
);
if (!collectionRouteSource.includes("from '../../data/stations.js'")) {
  fail('The station collection route must consume the canonical station metadata module.');
}

const stationModuleUrl = pathToFileURL(path.join(sourceRoot, 'data', 'stations.js')).href;
const { stations } = await import(stationModuleUrl);
if (!Array.isArray(stations)) fail('stations.js must export a stations array.');
if (stations.length !== 12) fail(`Expected 12 station records; found ${stations.length}.`);

const expectedNumbers = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
if (stations.map((station) => station.id).join(',') !== expectedNumbers.join(',')) {
  fail('Station numbers are not unique and ordered from 01 through 12.');
}
if (new Set(stations.map((station) => station.slug)).size !== stations.length) {
  fail('Station slugs must be unique.');
}
for (const station of stations) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(station.slug)) {
    fail(`Station ${station.id} has an invalid slug: ${station.slug}`);
  }
  if (!['built', 'not-built'].includes(station.status)) {
    fail(`Station ${station.id} uses an unsupported public status: ${station.status}`);
  }
  for (const field of ['title', 'category', 'task', 'barrierPattern']) {
    if (typeof station[field] !== 'string' || station[field].trim() === '') {
      fail(`Station ${station.id} is missing ${field}.`);
    }
  }
  if (!Array.isArray(station.criteria) || station.criteria.length === 0) {
    fail(`Station ${station.id} must name at least one criterion candidate.`);
  }
}

const builtNumbers = stations.filter((station) => station.status === 'built').map((station) => station.id);
if (builtNumbers.join(',') !== expectedNumbers.join(',')) {
  fail('Every Station 01 through 12 must be marked built in the completed collection.');
}

for (const station of stations) {
  if (new Set(station.criteria.map((criterion) => criterion.id)).size !== station.criteria.length) {
    fail(`Station ${station.id} repeats a criterion.`);
  }
  for (const criterion of station.criteria) {
    if (!/^\d+\.\d+\.\d+$/.test(criterion.id)) {
      fail(`Station ${station.id} has an invalid criterion ID: ${criterion.id}`);
    }
    if (!criterion.title || !['A', 'AA', 'AAA'].includes(criterion.level)) {
      fail(`Station ${station.id} criterion ${criterion.id} is missing its verified title or level.`);
    }
    if (!criterion.source?.startsWith('https://www.w3.org/TR/WCAG22/#')) {
      fail(`Station ${station.id} criterion ${criterion.id} is missing its normative source.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(criterion.titleVerifiedOn ?? '')) {
      fail(`Station ${station.id} criterion ${criterion.id} is missing its verification date.`);
    }
    if (!['confirmed', 'conditional'].includes(criterion.applicability)) {
      fail(`Station ${station.id} criterion ${criterion.id} is missing an applicability decision.`);
    }
  }
}

for (const station of stations) {
  const componentPath = path.join(sourceRoot, 'components', 'stations', `Station${station.id}.astro`);
  const component = await readFile(componentPath, 'utf8').catch(() => null);
  if (component === null) fail(`Station ${station.id} is missing ${componentPath}.`);
  if (!component.includes("import StationFrame from '../StationFrame.astro'")) {
    fail(`Station ${station.id} does not use the shared seven-part station frame.`);
  }
  if (!component.includes('slot="barrier"') || !component.includes('slot="fixed"')) {
    fail(`Station ${station.id} must provide one barrier and one fixed panel.`);
  }
}

const media = await readFile(path.join(sourceRoot, 'assets', 'station-11-instructions.mp4'));
if (media.byteLength < 10_000) fail('Station 11 instructional media is missing or unexpectedly small.');
const poster = await readFile(path.join(sourceRoot, 'assets', 'station-11-poster.png'));
if (poster.byteLength < 1_000) fail('Station 11 local poster is missing or unexpectedly small.');
const captions = await readFile(path.join(sourceRoot, 'assets', 'station-11-captions.vtt'), 'utf8');
if (!captions.startsWith('WEBVTT') || !captions.includes('Finally, press Done.')) {
  fail('Station 11 captions are missing or incomplete.');
}

const fontRoot = path.join(sourceRoot, 'assets', 'fonts');
for (const filename of [
  'outfit-latin.woff2',
  'space-mono-regular-latin.woff2',
  'space-mono-bold-latin.woff2',
]) {
  const font = await readFile(path.join(fontRoot, filename)).catch(() => null);
  if (!font || font.byteLength < 10_000 || font.subarray(0, 4).toString('ascii') !== 'wOF2') {
    fail(`Self-hosted font ${filename} is missing or is not a valid WOFF2 asset.`);
  }
}

for (const [filename, copyright] of [
  ['outfit-OFL.txt', 'Copyright 2021 The Outfit Project Authors'],
  ['space-mono-OFL.txt', 'Copyright 2016 The Space Mono Project Authors'],
]) {
  const license = await readFile(path.join(fontRoot, filename), 'utf8').catch(() => '');
  if (!license.includes(copyright) || !license.includes('SIL OPEN FONT LICENSE Version 1.1')) {
    fail(`Self-hosted font license ${filename} is missing or incomplete.`);
  }
}

const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
for (const forbidden of ['react', 'vue', 'svelte', 'tailwindcss']) {
  if (forbidden in dependencies) fail(`Forbidden dependency found: ${forbidden}`);
}
