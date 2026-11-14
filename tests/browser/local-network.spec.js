import { expect, test } from '@playwright/test';
import { builtStations } from '../../src/data/stations.js';

test.use({ serviceWorkers: 'block' });

const routes = [
  '/', '/about/', '/teachers/',
  ...builtStations.map(({ slug }) => `/stations/${slug}/`),
];

for (const route of routes) {
  test(`network: ${route} and its demo controls stay on the exhibit origin`, async ({ page, context, baseURL }) => {
    const origin = new URL(baseURL).origin;
    const unexpected = new Set();
    const isExternalHttp = (url) => ['http:', 'https:'].includes(url.protocol) && url.origin !== origin;

    // Record requests even if browser redirect handling bypasses the route hook.
    context.on('request', (request) => {
      if (isExternalHttp(new URL(request.url()))) unexpected.add(request.url());
    });
    await context.route(isExternalHttp, (request) => request.abort());
    await context.routeWebSocket((url) => {
      const protocol = url.protocol === 'wss:' ? 'https:' : 'http:';
      return `${protocol}//${url.host}` !== origin;
    }, (socket) => {
      unexpected.add(socket.url());
      return socket.close();
    });

    const response = await page.goto(route);
    expect(response?.ok()).toBe(true);
    if (route.startsWith('/stations/')) {
      await page.getByRole('button', { name: 'Advocate', exact: true }).click();
      await page.getByRole('button', { name: 'Presenter', exact: true }).click();
      await page.getByRole('button', { name: 'Builder', exact: true }).click();
      await page.getByRole('radio', { name: 'Try the fix' }).check();
      await page.getByRole('radio', { name: 'Compare side by side' }).check();
      await page.getByRole('button', { name: 'Reset Barrier', exact: true }).click();
      await page.getByRole('button', { name: 'Reset Fixed', exact: true }).click();
    }
    await page.evaluate(async () => { await document.fonts.ready; });
    expect([...unexpected]).toEqual([]);
  });
}
