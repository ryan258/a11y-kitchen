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
    <script src="/_astro/app.js"></script>
    <link rel="icon" href="data:image/svg+xml,%3Csvg/%3E">
    <img src="/images/local.png" alt="">
    <style>.local { background: url('/images/local.png'); }</style>
  `);

  assert.deepEqual(findings, []);
});
