import { test, expect } from '@playwright/test';
import { builtStations, stations } from '../../src/data/stations.js';

const routes = ['/', '/about/', '/teachers/', ...builtStations.map((station) => `/stations/${station.slug}/`)];

async function expectNoHorizontalOverflow(page, route, width) {
  const sizes = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    page: document.documentElement.scrollWidth,
  }));
  expect(sizes.page, `${route} overflowed at ${width}px`).toBeLessThanOrEqual(sizes.viewport);
}

for (const route of routes) {
  test(`shell: ${route} starts with a working skip link and unique IDs`, async ({ page }) => {
    await page.goto(route);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();

    const navigation = page.getByRole('navigation', { name: 'Main navigation' });
    const currentPage = navigation.locator('[aria-current="page"]');

    if (route === '/') {
      await expect(currentPage).toHaveText('Stations');
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Interface Barriers, Tested & Fixed');
      await expect(page.locator('.ticket')).toHaveCount(stations.length);
    }
    if (route === '/about/') {
      await expect(currentPage).toHaveText('About & philosophy');
      await expect(page.getByRole('heading', { level: 1 })).toContainText('About A11y Test Kitchen');
    }
    if (route === '/teachers/') {
      await expect(currentPage).toHaveText('Teaching guide');
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Teaching with A11y Test Kitchen');
    }
    if (route.startsWith('/stations/')) {
      await expect(currentPage).toHaveCount(0);
      const stationNavigation = page.getByRole('navigation', { name: 'Station navigation' });
      await expect(stationNavigation.getByRole('link', { name: 'All stations' })).toHaveAttribute('href', '/#stations-rail-heading');
    }

    await expect(page.locator('link[rel="icon"]')).toHaveAttribute('href', /^data:image\/svg\+xml,/);

    const duplicates = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
      return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    });
    expect(duplicates).toEqual([]);
  });

  test(`shell: ${route} reflows without page-level horizontal overflow`, async ({ page }) => {
    for (const width of [320, 640]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await expectNoHorizontalOverflow(page, route, width);
      if (!route.startsWith('/stations/')) continue;

      await page.getByRole('radio', { name: 'Try the fix' }).check();
      await page.getByRole('button', { name: 'Advocate', exact: true }).click();
      await expectNoHorizontalOverflow(page, route, width);

      await page.getByRole('radio', { name: 'Compare side by side' }).check();
      await page.getByRole('button', { name: 'Presenter', exact: true }).click();
      await expectNoHorizontalOverflow(page, route, width);
    }
  });
}

test.describe('static station fallback', () => {
  test.use({ javaScriptEnabled: false });

  test('offers readable notes and keeps demo forms unavailable with JavaScript disabled', async ({ page }) => {
    await page.goto('/stations/cancellation-form/');
    await expect(page.locator('[data-atk-static-lesson]')).toBeVisible();
    await expect(page.locator('[data-atk-demo]')).toBeHidden();
    await expect(page.locator('[data-atk-mode-switch]')).toBeHidden();
    await expect(page.getByRole('region', { name: 'Advocate explanation' })).toBeVisible();
    await expect(page.locator('[data-atk-barrier-form]')).toHaveAttribute('method', 'dialog');
  });
});

test('mode: defaults to Builder, exposes one panel, and persists across routes', async ({ page }) => {
  await page.goto('/stations/cancellation-form/');

  await expect(page.getByRole('button', { name: 'Builder' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-atk-mode-panel]:visible')).toHaveCount(1);
  await expect(page.locator('[data-atk-mode-panel="builder"]')).toBeVisible();

  await page.getByRole('button', { name: 'Advocate' }).click();
  await expect(page.getByRole('button', { name: 'Advocate' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-atk-mode-panel="advocate"]')).toBeVisible();
  await expect(page.locator('[data-atk-mode-panel]:visible')).toHaveCount(1);

  await page.goto('/about/');
  await expect(page.getByRole('button', { name: 'Advocate' })).toHaveAttribute('aria-pressed', 'true');
  await page.goto('/stations/cancellation-form/');
  await expect(page.locator('[data-atk-mode-panel="advocate"]')).toBeVisible();
});

test('mode: invalid stored state falls back to Builder', async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem('atk-mode', 'chef'));
  await page.goto('/stations/cancellation-form/');
  await expect(page.getByRole('button', { name: 'Builder' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-atk-mode-panel="builder"]')).toBeVisible();
});

test('mode: storage failures do not break in-page switching', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, 'getItem', {
      configurable: true,
      value() { throw new Error('storage read blocked'); },
    });
    Object.defineProperty(Storage.prototype, 'setItem', {
      configurable: true,
      value() { throw new Error('storage write blocked'); },
    });
  });

  await page.goto('/stations/cancellation-form/');
  await expect(page.getByRole('button', { name: 'Builder' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Presenter' }).click();
  await expect(page.getByRole('button', { name: 'Presenter' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-atk-mode-panel="presenter"]')).toBeVisible();
  expect(errors).toEqual([]);
});

test('shell: reduced-motion preference removes authored transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const durations = await page.locator('.button--primary').evaluate((element) => {
    const styles = getComputedStyle(element);
    return [styles.transitionDuration, styles.animationDuration];
  });
  expect(durations.every((duration) => Number.parseFloat(duration) <= 0.00001)).toBe(true);
});

test('state indicators contain the required word and a separate shape', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.ticket')).toHaveCount(stations.length);
  await expect(page.locator('.status-tag--built')).toHaveCount(builtStations.length);
  await expect(page.locator('.status-tag-shape')).toHaveCount(stations.length);

  for (const station of builtStations) {
    await page.goto(`/stations/${station.slug}/`);
    const barrier = page.locator('.state-chip--barrier').first();
    const fixed = page.locator('.state-chip--fix').first();
    await expect(barrier).toContainText('Barrier');
    await expect(fixed).toContainText('Fixed');
    await expect(barrier.locator('.state-shape')).toHaveCount(1);
    await expect(fixed.locator('.state-shape')).toHaveCount(1);
  }
});
