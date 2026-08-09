import { test, expect } from '@playwright/test';
import { stations } from '../../src/data/stations.js';

const routes = ['/', '/about/', ...stations.map((station) => `/stations/${station.slug}/`)];

for (const route of routes) {
  test(`shell: ${route} starts with a working skip link and unique IDs`, async ({ page }) => {
    await page.goto(route);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();

    const currentLabel = route === '/about/' ? 'About & philosophy' : 'Stations';
    await expect(page.getByRole('link', { name: currentLabel })).toHaveAttribute('aria-current', 'page');

    if (route === '/') {
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Interface Barriers, Tested & Fixed');
      await expect(page.locator('.ticket')).toHaveCount(12);
    }
    if (route === '/about/') {
      await expect(page.getByRole('heading', { level: 1 })).toContainText('About A11y Test Kitchen');
    }

    const duplicates = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
      return [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
    });
    expect(duplicates).toEqual([]);
  });

  test(`shell: ${route} reflows without page-level horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 900 });
    await page.goto(route);
    const sizes = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));
    expect(sizes.page).toBeLessThanOrEqual(sizes.viewport);
  });
}

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
  await expect(page.locator('.ticket')).toHaveCount(12);
  await expect(page.locator('.status-tag--built')).toHaveCount(12);
  await expect(page.locator('.status-tag-shape')).toHaveCount(12);

  for (const station of stations) {
    await page.goto(`/stations/${station.slug}/`);
    const barrier = page.locator('.state-chip--barrier').first();
    const fixed = page.locator('.state-chip--fix').first();
    await expect(barrier).toContainText('Barrier');
    await expect(fixed).toContainText('Fixed');
    await expect(barrier.locator('.state-shape')).toHaveCount(1);
    await expect(fixed.locator('.state-shape')).toHaveCount(1);
  }
});
