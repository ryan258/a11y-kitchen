import test from 'node:test';
import assert from 'node:assert/strict';
import {
  findExternalCssSubresources,
  findExternalHtmlSubresources,
} from '../../scripts/lib/external-subresources.mjs';

test('CSS scanner rejects remote imports and asset URLs', () => {
  const findings = findExternalCssSubresources(`
    @import url('https://fonts.example/kitchen.css');
    .remote { background-image: url(//cdn.example/spoon.svg); }
    .local { background-image: url('../spoon.svg'); }
    .inline { background-image: url('data:image/svg+xml,%3Csvg/%3E'); }
    /* url('https://comment.example/does-not-load.svg') */
  `);

  assert.deepEqual(findings, [
    { context: 'CSS @import', url: 'https://fonts.example/kitchen.css' },
    { context: 'CSS url()', url: 'https://fonts.example/kitchen.css' },
    { context: 'CSS url()', url: '//cdn.example/spoon.svg' },
  ]);
});

test('CSS scanner understands escaped URLs, compact imports, and image-set strings', () => {
  assert.deepEqual(findExternalCssSubresources(String.raw`
    @import"https://cdn.example/compact.css";
    .escaped { background: url(https\3a //cdn.example/escaped.png); }
    .alternatives {
      background: image-set("/image.png" type("image/png") 1x, "https://cdn.example/retina.png" 2x);
    }
    .literal { content: "url(https://example.com/not-a-request.png)"; }
  `), [
    { context: 'CSS @import', url: 'https://cdn.example/compact.css' },
    { context: 'CSS url()', url: 'https://cdn.example/escaped.png' },
    { context: 'CSS image-set()', url: 'https://cdn.example/retina.png' },
  ]);
});

test('HTML scanner rejects request-capable remote references', () => {
  const findings = findExternalHtmlSubresources(`
    <script src="https://scripts.example/app.js"></script>
    <link rel="preload" href="//cdn.example/font.woff2" as="font">
    <iframe src="http://frames.example/lesson"></iframe>
    <img src="/local.png" srcset="/local.png 1x, https://images.example/two.png 2x">
    <div style="background: url('https://images.example/background.png')"></div>
  `);

  assert.deepEqual(findings, [
    { context: 'script[src]', url: 'https://scripts.example/app.js' },
    { context: 'link[href]', url: '//cdn.example/font.woff2' },
    { context: 'iframe[src]', url: 'http://frames.example/lesson' },
    { context: 'img[srcset]', url: 'https://images.example/two.png' },
    { context: 'div[style] CSS url()', url: 'https://images.example/background.png' },
  ]);
});

test('HTML scanner permits navigation links and local or inline resources', () => {
  const findings = findExternalHtmlSubresources(`
    <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2</a>
    <link rel="canonical" href="https://kitchen.example/">
    <script src="/_astro/app.js"></script>
    <link rel="icon" href="data:image/svg+xml,%3Csvg/%3E">
    <img src="/images/local.png" alt="">
    <style>.local { background: url('/images/local.png'); }</style>
  `);

  assert.deepEqual(findings, []);
});

test('HTML URL checks use decoded attribute references like the browser', () => {
  const findings = findExternalHtmlSubresources(`
    <img src="https&#58;//images.example/entity.png">
    <script src="https&colon;&sol;&sol;scripts.example/app.js"></script>
    <img src="&#x2f;&#47;images.example/protocol-relative.png">
    <div style="background: url('https&#x3a;//images.example/inline.png')"></div>
    <img src="ht&#9;tps://images.example/tab.png">
    <img src="&#1;https&#58;//images.example/control.png">
    <img src="&#92;&#92;images.example/encoded-backslashes.png">
    <img src="&bsol;&bsol;images.example/named-backslashes.png">
  `);
  assert.deepEqual(findings, [
    { context: 'img[src]', url: 'https://images.example/entity.png' },
    { context: 'script[src]', url: 'https://scripts.example/app.js' },
    { context: 'img[src]', url: '//images.example/protocol-relative.png' },
    { context: 'div[style] CSS url()', url: 'https://images.example/inline.png' },
    { context: 'img[src]', url: 'ht\ttps://images.example/tab.png' },
    { context: 'img[src]', url: '\u0001https://images.example/control.png' },
    { context: 'img[src]', url: '\\\\images.example/encoded-backslashes.png' },
    { context: 'img[src]', url: '\\\\images.example/named-backslashes.png' },
  ]);
});

test('escaped literal references and encoded local paths remain local', () => {
  assert.deepEqual(findExternalHtmlSubresources(`
    <img src="https&amp;colon;//images.example/literal-reference.png">
    <img src="&#47;images/local.png">
    <img src="&#160;https://images.example/same-origin-path.png">
    <a href="https&#58;//navigation.example/">Navigation</a>
  `), []);
});

test('HTML scanner observes attribute quoting, the first duplicate, and inert markup', () => {
  assert.deepEqual(findExternalHtmlSubresources(`
    <!-- <img src="https://images.example/comment.png"> -->
    <script>const example = '<img src="https://images.example/string.png">';</script>
    <img alt="A > B" src="https://images.example/after-quoted-greater-than.png">
    <img src="https://images.example/first.png" src="/local.png">
    <img src="/local.png" src="https://images.example/second.png">
  `), [
    { context: 'img[src]', url: 'https://images.example/after-quoted-greater-than.png' },
    { context: 'img[src]', url: 'https://images.example/first.png' },
  ]);
});

test('image candidates can follow a data URL in both srcset and preload imagesrcset', () => {
  assert.deepEqual(findExternalHtmlSubresources(`
    <link rel="preload" as="image"
      imagesrcset="data:image/png;base64,AAAA 1x, https://images.example/preloaded.png 2x">
    <img src="/local.png"
      srcset="data:image/png;base64,AAAA 1x, https://images.example/with,comma.png 2x">
    <img src="/local.png" srcset="/local.png, https://images.example/no-descriptor.png">
  `), [
    { context: 'link[imagesrcset]', url: 'https://images.example/preloaded.png' },
    { context: 'img[srcset]', url: 'https://images.example/with,comma.png' },
    { context: 'img[srcset]', url: 'https://images.example/no-descriptor.png' },
  ]);
});
