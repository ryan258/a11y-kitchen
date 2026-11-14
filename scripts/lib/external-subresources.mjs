import { ident, parse as parseCss, walk as walkCss } from 'css-tree';
import { parse as parseHtml } from 'parse5';

// The artifact can be served over HTTP or HTTPS, on any host. An absolute URL
// that only works on a specific origin is not portable with the build.
const artifactOrigins = ['http://a11y-test-kitchen.invalid', 'https://a11y-test-kitchen.invalid'];
const networkProtocols = new Set(['http:', 'https:']);
const cssStringUrlFunctions = new Set(['image', 'image-set', '-webkit-image-set', 'src', 'url']);

function isExternalUrl(reference) {
  return artifactOrigins.some((origin) => {
    const url = URL.parse(reference, origin);
    return url && networkProtocols.has(url.protocol) && url.origin !== origin;
  });
}

function uniqueFindings(findings) {
  const seen = new Set();
  return findings.filter(({ context, url }) => {
    const key = JSON.stringify([context, url]);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function findExternalCssSubresources(css, context = 'stylesheet') {
  const tree = parseCss(css, {
    context,
    parseCustomProperty: true,
    // Unsupported syntax should fail verification instead of being ignored as
    // an unexamined raw node.
    onParseError(error) { throw error; },
  });
  const findings = [];
  const collect = (context, url) => {
    if (isExternalUrl(url)) findings.push({ context, url });
  };

  walkCss(tree, (node) => {
    if (node.type === 'Atrule' && ident.decode(node.name).toLowerCase() === 'import') {
      const first = node.prelude?.children?.first;
      if (first?.type === 'String' || first?.type === 'Url') collect('CSS @import', first.value);
    }
    if (node.type === 'Url') collect('CSS url()', node.value);
    if (node.type === 'Function') {
      const name = ident.decode(node.name).toLowerCase();
      if (cssStringUrlFunctions.has(name)) {
        for (const argument of node.children) {
          if (argument.type === 'String') collect(`CSS ${name}()`, argument.value);
        }
      }
    }
  });

  return uniqueFindings(findings);
}

// In srcset, commas inside a URL are data. Read a URL up to ASCII whitespace,
// then read its descriptors up to the next separator outside parentheses.
const asciiWhitespace = /[\t\n\f\r ]/;

function* srcsetUrls(value) {
  let position = 0;
  while (position < value.length) {
    while (position < value.length && (value[position] === ',' || asciiWhitespace.test(value[position]))) {
      position += 1;
    }
    const start = position;
    while (position < value.length && !asciiWhitespace.test(value[position])) position += 1;
    if (position === start) return;

    const candidate = value.slice(start, position);
    yield candidate.replace(/,+$/, '');
    if (candidate.endsWith(',')) continue;

    let parentheses = 0;
    while (position < value.length) {
      const character = value[position++];
      if (character === ',' && parentheses === 0) break;
      if (character === '(') parentheses += 1;
      if (character === ')' && parentheses > 0) parentheses -= 1;
    }
  }
}

function attributeUrls(name, value) {
  if (name === 'srcset' || name === 'imagesrcset') return srcsetUrls(value);
  if (name === 'ping') return value.split(/[\t\n\f\r ]+/);
  return [value];
}

const requestAttributes = new Map([
  ['a', ['ping']],
  ['area', ['ping']],
  ['audio', ['src']],
  ['base', ['href']],
  ['body', ['background']],
  ['button', ['formaction']],
  ['embed', ['src']],
  ['feimage', ['href', 'xlink:href']],
  ['form', ['action']],
  ['frame', ['src']],
  ['html', ['manifest']],
  ['iframe', ['src']],
  ['image', ['href', 'xlink:href']],
  ['img', ['src', 'srcset']],
  ['input', ['src', 'formaction']],
  ['object', ['data']],
  ['portal', ['src']],
  ['script', ['src', 'href', 'xlink:href']],
  ['source', ['src', 'srcset']],
  ['table', ['background']],
  ['td', ['background']],
  ['th', ['background']],
  ['track', ['src']],
  ['use', ['href', 'xlink:href']],
  ['video', ['src', 'poster']],
]);

const networkLinkRelations = new Set([
  'apple-touch-icon', 'apple-touch-icon-precomposed', 'dns-prefetch', 'icon',
  'manifest', 'mask-icon', 'modulepreload', 'preconnect', 'prefetch', 'preload',
  'prerender', 'stylesheet',
]);

function linkRequestAttributes(attributes) {
  const relations = (attributes.get('rel') ?? '').toLowerCase().split(/[\t\n\f\r ]+/);
  if (relations.includes('preload')) return ['href', 'imagesrcset'];
  if (relations.some((relation) => networkLinkRelations.has(relation))) return ['href'];
  return [];
}

export function* htmlElements(root) {
  for (const child of root.childNodes ?? []) {
    if (!child.tagName) continue;
    yield child;
    yield* htmlElements(child);
  }
}

export function findExternalHtmlSubresources(source) {
  const document = typeof source === 'string' ? parseHtml(source, { scriptingEnabled: false }) : source;
  const findings = [];

  for (const element of htmlElements(document)) {
    const tagName = element.tagName.toLowerCase();
    const attributes = new Map(element.attrs.map(({ prefix, name, value }) => [
      prefix ? `${prefix}:${name}` : name, value,
    ]));
    const requests = tagName === 'link' ? linkRequestAttributes(attributes) : requestAttributes.get(tagName) ?? [];
    for (const attributeName of requests) {
      const value = attributes.get(attributeName);
      if (value === undefined) continue;
      for (const url of attributeUrls(attributeName, value)) {
        if (isExternalUrl(url)) findings.push({ context: `${tagName}[${attributeName}]`, url });
      }
    }

    const inlineStyle = attributes.get('style');
    if (inlineStyle !== undefined) {
      findings.push(...findExternalCssSubresources(inlineStyle, 'declarationList').map(({ context, url }) => ({
        context: `${tagName}[style] ${context}`, url,
      })));
    }
    if (tagName === 'style') {
      const css = element.childNodes.filter((child) => child.nodeName === '#text').map((child) => child.value).join('');
      findings.push(...findExternalCssSubresources(css).map(({ context, url }) => ({
        context: `style element ${context}`, url,
      })));
    }
    if (tagName === 'iframe' && attributes.has('srcdoc')) {
      findings.push(...findExternalHtmlSubresources(attributes.get('srcdoc')).map(({ context, url }) => ({
        context: `iframe[srcdoc] ${context}`, url,
      })));
    }
  }

  return uniqueFindings(findings);
}
