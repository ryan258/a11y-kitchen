const externalUrlPattern = /^(?:https?:)?\/\//i;
const externalSchemePattern = /^https?:/i;

function isExternalUrl(reference) {
  const value = reference.trim();
  return externalUrlPattern.test(value) || externalSchemePattern.test(value);
}

function uniqueFindings(findings) {
  const seen = new Set();
  return findings.filter(({ context, url }) => {
    const key = `${context}\u0000${url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function findExternalCssSubresources(css) {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const findings = [];
  const collect = (pattern, context) => {
    for (const match of source.matchAll(pattern)) {
      const url = match[1] ?? match[2] ?? match[3] ?? '';
      if (isExternalUrl(url)) findings.push({ context, url: url.trim() });
    }
  };

  collect(
    /@import\s+(?:url\(\s*)?(?:"([^"]+)"|'([^']+)'|([^'"\s;)]+))/gi,
    'CSS @import',
  );
  collect(
    /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"\s]+))\s*\)/gi,
    'CSS url()',
  );

  return uniqueFindings(findings);
}

function attributesFor(tag) {
  const attributes = new Map();
  for (const match of tag.matchAll(/\s([^\s"'<>\/=]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g)) {
    attributes.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attributes;
}

function attributeUrls(name, value) {
  if (name === 'srcset') {
    if (value.trim().startsWith('data:')) return [value.trim()];
    return value.split(',').map((candidate) => candidate.trim().split(/\s+/)[0]);
  }
  if (name === 'ping') return value.trim().split(/\s+/);
  return [value];
}

const requestAttributes = new Map([
  ['a', ['ping']],
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
  ['link', ['href']],
  ['object', ['data']],
  ['portal', ['src']],
  ['script', ['src']],
  ['source', ['src', 'srcset']],
  ['table', ['background']],
  ['td', ['background']],
  ['th', ['background']],
  ['track', ['src']],
  ['use', ['href', 'xlink:href']],
  ['video', ['src', 'poster']],
]);

export function findExternalHtmlSubresources(html) {
  const findings = [];

  for (const match of html.matchAll(/<([a-z][\w:-]*)\b[^>]*>/gi)) {
    const tagName = match[1].toLowerCase();
    const attributes = attributesFor(match[0]);
    for (const attributeName of requestAttributes.get(tagName) ?? []) {
      const value = attributes.get(attributeName);
      if (value === undefined) continue;
      for (const url of attributeUrls(attributeName, value)) {
        if (isExternalUrl(url)) {
          findings.push({ context: `${tagName}[${attributeName}]`, url: url.trim() });
        }
      }
    }

    const inlineStyle = attributes.get('style');
    if (inlineStyle !== undefined) {
      findings.push(...findExternalCssSubresources(inlineStyle).map((finding) => ({
        context: `${tagName}[style] ${finding.context}`,
        url: finding.url,
      })));
    }
  }

  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    findings.push(...findExternalCssSubresources(match[1]).map((finding) => ({
      context: `style element ${finding.context}`,
      url: finding.url,
    })));
  }

  return uniqueFindings(findings);
}
