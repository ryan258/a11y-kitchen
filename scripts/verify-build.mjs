import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  findExternalCssSubresources,
  findExternalHtmlSubresources,
} from './lib/external-subresources.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceModule = pathToFileURL(path.join(root, 'src', 'data', 'stations.js')).href;
const { stations } = await import(sourceModule);
const expectedRoutes = [
  ['home', 'dist/index.html'],
  ['about', 'dist/about/index.html'],
  ...stations.map((station) => [
    `station ${station.id}`,
    `dist/stations/${station.slug}/index.html`,
  ]),
];

function fail(message) {
  throw new Error(message);
}

const builtPages = new Map();

for (const [label, relativePath] of expectedRoutes) {
  const html = await readFile(path.join(root, relativePath), 'utf8').catch(() => null);
  if (html === null) fail(`Missing built ${label} route at ${relativePath}.`);
  builtPages.set(label, html);

  // Duplicate IDs, skip-link order, and the main-content target are asserted in
  // tests/browser/shell.spec.js against a real DOM on every one of these routes,
  // which is strictly stronger than matching regexes over the markup.
  if (/<script\b[^>]*\bsrc=/i.test(html)) {
    fail(`${label} contains a client script source; client behavior must remain inline.`);
  }
  const externalResources = findExternalHtmlSubresources(html);
  if (externalResources.length > 0) {
    const { context, url } = externalResources[0];
    fail(`${label} contains an external subresource at ${context}: ${url}`);
  }
}

const builtAssetRoot = path.join(root, 'dist', '_astro');
const builtAssetEntries = await readdir(builtAssetRoot, { withFileTypes: true }).catch(() => null);
if (builtAssetEntries === null) fail('Missing built asset directory at dist/_astro.');
const builtCssFiles = builtAssetEntries
  .filter((entry) => entry.isFile() && entry.name.endsWith('.css'))
  .map((entry) => entry.name);
if (builtCssFiles.length === 0) fail('No built CSS was found in dist/_astro.');

for (const filename of builtCssFiles) {
  const css = await readFile(path.join(builtAssetRoot, filename), 'utf8');
  const externalResources = findExternalCssSubresources(css);
  if (externalResources.length > 0) {
    const { context, url } = externalResources[0];
    fail(`dist/_astro/${filename} contains an external subresource at ${context}: ${url}`);
  }
}

const homeHtml = builtPages.get('home');
if (homeHtml.includes('Not built yet')) fail('The completed station rail still contains Not built yet.');
if ([...homeHtml.matchAll(/class="ticket-link"/g)].length !== 12) {
  fail('The completed station rail does not link all twelve stations.');
}

for (const station of stations) {
  const html = builtPages.get(`station ${station.id}`);
  for (const panelId of [`panel-barrier-${station.id}`, `panel-fix-${station.id}`]) {
    const count = [...html.matchAll(new RegExp(`id="${panelId}"`, 'g'))].length;
    if (count !== 1) fail(`Expected one ${panelId}; found ${count}.`);
  }
  if (!html.includes('This version is broken on purpose.')) {
    fail(`Station ${station.id} is missing the required barrier disclosure.`);
  }
  if (!html.includes('Reset Barrier') || !html.includes('Reset Fixed')) {
    fail(`Station ${station.id} is missing an independent panel reset.`);
  }
  for (const mode of ['advocate', 'builder', 'presenter']) {
    const count = [...html.matchAll(new RegExp(`data-atk-mode-panel="${mode}"`, 'g'))].length;
    if (count !== 1) fail(`Station ${station.id} must render one ${mode} explanation; found ${count}.`);
  }
}

const mediaHtml = builtPages.get('station 11');
if (!/<track\b[^>]*\bkind="captions"[^>]*\bdefault/i.test(mediaHtml)) {
  fail('Station 11 fixed media is missing its default captions track.');
}
if (!mediaHtml.includes('Read the transcript')) fail('Station 11 fixed media is missing its transcript.');
const mediaPath = mediaHtml.match(/<source\s+src="([^"]+\.mp4)"/)?.[1];
if (!mediaPath) fail('Station 11 built media URL is missing.');
const mediaFile = await readFile(path.join(root, 'dist', mediaPath.replace(/^\//, ''))).catch(() => null);
if (!mediaFile || mediaFile.byteLength < 10_000) fail('Station 11 built media asset is missing.');
const posterSource = mediaHtml.match(/\sposter="([^"]+)"/)?.[1];
if (!posterSource) fail('Station 11 built poster is missing.');
if (posterSource.startsWith('data:image/png;base64,')) {
  const posterBytes = Buffer.from(posterSource.slice('data:image/png;base64,'.length), 'base64');
  if (posterBytes.byteLength < 1_000) fail('Station 11 inlined poster is unexpectedly small.');
} else {
  const posterFile = await readFile(path.join(root, 'dist', posterSource.replace(/^\//, ''))).catch(() => null);
  if (!posterFile || posterFile.byteLength < 1_000) fail('Station 11 built poster asset is missing.');
}
