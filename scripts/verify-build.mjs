import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import { builtStations } from '../src/data/stations.js';
import {
  findExternalCssSubresources,
  findExternalHtmlSubresources,
  htmlElements,
} from './lib/external-subresources.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(root, 'dist');
const artifactOrigin = 'http://a11y-test-kitchen.invalid';
const expectedRoutes = [
  ['home', 'index.html'],
  ['about', 'about/index.html'],
  ['teachers', 'teachers/index.html'],
  ...builtStations.map((station) => [
    `station ${station.id}`,
    `stations/${station.slug}/index.html`,
  ]),
];

function fail(message) {
  throw new Error(message);
}

function attribute(element, name) {
  return element.attrs.find((item) => item.name === name && !item.prefix)?.value;
}

function verifyHtml(elements, relativePath) {
  const bodyEnd = elements.find((element) => element.tagName === 'body')?.sourceCodeLocation?.endTag;
  const documentEnd = elements.find((element) => element.tagName === 'html')?.sourceCodeLocation?.endTag;
  const endTag = bodyEnd ?? documentEnd;
  const ids = new Set();

  for (const element of elements) {
    const id = attribute(element, 'id');
    if (id !== undefined) {
      if (ids.has(id)) fail(`dist/${relativePath} contains duplicate ID ${JSON.stringify(id)}.`);
      ids.add(id);
    }

    if (element.tagName === 'script') {
      if (element.attrs.some(({ name }) => name === 'src' || name === 'href')) {
        fail(`dist/${relativePath} contains a client script source; client behavior must remain inline.`);
      }
      if (endTag && element.sourceCodeLocation?.startOffset >= endTag.startOffset) {
        fail(`dist/${relativePath} places a script after the closing document body.`);
      }
    }
    if (element.tagName === 'form' && attribute(element, 'method')?.toLowerCase() !== 'dialog') {
      fail(`dist/${relativePath} contains a demo form that can submit to the host.`);
    }
    if (attribute(element, 'formmethod') !== undefined) {
      fail(`dist/${relativePath} contains a demo control that overrides the form method.`);
    }
  }
}

const entries = await readdir(distRoot, { recursive: true, withFileTypes: true }).catch(() => null);
if (entries === null) fail('Missing built dist directory. Run npm run build first.');
const files = entries
  .filter((entry) => entry.isFile())
  .map((entry) => path.relative(distRoot, path.join(entry.parentPath, entry.name)).split(path.sep).join('/'))
  .sort();
if (!files.some((file) => file.startsWith('_astro/') && path.extname(file) === '.css')) {
  fail('No built CSS was found in dist/_astro.');
}

const builtPages = new Map();
for (const relativePath of files) {
  const extension = path.extname(relativePath).toLowerCase();
  if (!['.html', '.htm', '.svg', '.css'].includes(extension)) continue;
  const content = await readFile(path.join(distRoot, relativePath), 'utf8');

  let externalResources;
  try {
    if (extension === '.css') {
      externalResources = findExternalCssSubresources(content);
    } else {
      const document = parse(content, { scriptingEnabled: false, sourceCodeLocationInfo: true });
      externalResources = findExternalHtmlSubresources(document);
      if (extension !== '.svg') {
        const elements = [...htmlElements(document)];
        verifyHtml(elements, relativePath);
        builtPages.set(relativePath, { content, elements });
      }
    }
  } catch (error) {
    throw new Error(`Could not verify dist/${relativePath}: ${error.message}`, { cause: error });
  }
  if (externalResources.length > 0) {
    const { context, url } = externalResources[0];
    fail(`dist/${relativePath} contains an external subresource at ${context}: ${JSON.stringify(url)}`);
  }
}

for (const [label, relativePath] of expectedRoutes) {
  if (!builtPages.has(relativePath)) fail(`Missing built ${label} route at dist/${relativePath}.`);
}

const home = builtPages.get('index.html');
const railHrefs = home.elements
  .filter((element) => (
    element.tagName === 'a' && attribute(element, 'class')?.split(/\s+/).includes('ticket-link')
  ))
  .map((element) => attribute(element, 'href'));
const expectedHrefs = builtStations.map((station) => `/stations/${station.slug}/`);
if (railHrefs.length !== expectedHrefs.length || railHrefs.some((href, index) => href !== expectedHrefs[index])) {
  fail('The station rail must link every built station in order.');
}

for (const station of builtStations) {
  const { content, elements } = builtPages.get(`stations/${station.slug}/index.html`);
  const demo = elements.find((element) => attribute(element, 'data-atk-demo') !== undefined);
  const fallback = elements.find((element) => attribute(element, 'data-atk-static-lesson') !== undefined);
  if (!demo || attribute(demo, 'hidden') === undefined || !fallback || attribute(fallback, 'hidden') !== undefined) {
    fail(`Station ${station.id} must start with a readable static fallback and unavailable demo controls.`);
  }
  const formPolicy = elements.find((element) => (
    element.tagName === 'meta' &&
    attribute(element, 'http-equiv')?.toLowerCase() === 'content-security-policy' &&
    attribute(element, 'content')?.split(';').some((directive) => directive.trim() === "form-action 'none'")
  ));
  if (!formPolicy) fail(`Station ${station.id} is missing the form submission safeguard.`);

  for (const panelId of [`panel-barrier-${station.id}`, `panel-fix-${station.id}`]) {
    if (!elements.some((element) => attribute(element, 'id') === panelId)) {
      fail(`Station ${station.id} is missing panel ${panelId}.`);
    }
  }
  if (!content.includes('This version is broken on purpose.')) {
    fail(`Station ${station.id} is missing the required barrier disclosure.`);
  }
  if (!content.includes('Reset Barrier') || !content.includes('Reset Fixed')) {
    fail(`Station ${station.id} is missing an independent panel reset.`);
  }
  for (const mode of ['advocate', 'builder', 'presenter']) {
    const count = elements.filter((element) => attribute(element, 'data-atk-mode-panel') === mode).length;
    if (count !== 1) fail(`Station ${station.id} must render one ${mode} explanation; found ${count}.`);
  }
}

for (const [file, source] of [
  ['MIT.txt', 'LICENSE'],
  ['CC-BY-4.0.txt', 'LICENSE-CONTENT'],
  ['Outfit-OFL.txt', 'src/assets/fonts/outfit-OFL.txt'],
  ['Space-Mono-OFL.txt', 'src/assets/fonts/space-mono-OFL.txt'],
]) {
  const notice = await readFile(path.join(distRoot, 'licenses', file), 'utf8').catch(() => null);
  const canonical = await readFile(path.join(root, source), 'utf8');
  if (notice !== canonical) fail(`Missing or outdated built notice at dist/licenses/${file}.`);
}

async function readBuiltAsset(reference, page, dataType) {
  if (!reference) return null;
  if (dataType && reference.startsWith(`data:${dataType};base64,`)) {
    return Buffer.from(reference.split(',')[1], 'base64');
  }
  if (dataType && reference.startsWith(`data:${dataType},`)) {
    return Buffer.from(decodeURIComponent(reference.slice(reference.indexOf(',') + 1)));
  }
  const url = URL.parse(reference, `${artifactOrigin}/${page}`);
  if (url?.origin !== artifactOrigin) return null;
  const filename = path.join(distRoot, decodeURIComponent(url.pathname));
  const relativePath = path.relative(distRoot, filename);
  if (relativePath === '..' || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) {
    return null;
  }
  return readFile(filename).catch(() => null);
}

const mediaStation = builtStations.find((station) => station.id === '11');
if (mediaStation) {
  const page = `stations/${mediaStation.slug}/index.html`;
  const { content, elements } = builtPages.get(page);
  const fixedPanel = elements.find((element) => attribute(element, 'id') === 'panel-fix-11');
  const fixedElements = [...htmlElements(fixedPanel)];
  const track = fixedElements.find((element) => (
    element.tagName === 'track' && attribute(element, 'kind') === 'captions' &&
    attribute(element, 'default') !== undefined
  ));
  if (!track) fail('Station 11 fixed media is missing its default captions track.');
  if (!content.includes('Read the transcript')) fail('Station 11 fixed media is missing its transcript.');
  const captions = await readBuiltAsset(attribute(track, 'src'), page, 'text/vtt');
  const sourceCaptions = await readFile(path.join(root, 'src/assets/station-11-captions.vtt'));
  if (!captions?.equals(sourceCaptions)) fail('Station 11 built caption asset is missing or differs from source.');
  const source = fixedElements.find((element) => element.tagName === 'source' && attribute(element, 'type') === 'video/mp4');
  const video = fixedElements.find((element) => element.tagName === 'video');
  const mediaFile = await readBuiltAsset(source && attribute(source, 'src'), page);
  if (!mediaFile || mediaFile.byteLength < 10_000) fail('Station 11 built media asset is missing.');
  const poster = await readBuiltAsset(video && attribute(video, 'poster'), page, 'image/png');
  if (!poster || poster.byteLength < 1_000) fail('Station 11 built poster asset is missing or unexpectedly small.');
}
