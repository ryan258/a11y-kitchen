import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { builtStations } from '../../src/data/stations.js';
import { intentionalFailures } from '../fixtures/intentional-failures.js';

for (const route of ['/', '/about/', '/teachers/']) {
  test(`@a11y ${route} has no automated findings`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

// Only one explanation panel is visible at a time, and axe cannot see the
// hidden ones, so every mode has to be scanned explicitly.
const modes = ['Advocate', 'Builder', 'Presenter'];

async function expectExactLedger(page, entries) {
  const expected = entries.filter((entry) => entry.toolRule);
  const { violations } = await new AxeBuilder({ page }).analyze();
  expect(violations.map(({ id }) => id).sort()).toEqual([...new Set(expected.map(({ toolRule }) => toolRule))].sort());

  for (const violation of violations) {
    const unmatched = expected.filter(({ toolRule }) => toolRule === violation.id);
    expect(violation.nodes).toHaveLength(unmatched.length);

    for (const node of violation.nodes) {
      expect(node.target).toHaveLength(1);
      const [selector] = node.target;
      expect(typeof selector).toBe('string');
      const actual = page.locator(selector);
      await expect(actual).toHaveCount(1);
      const index = await actual.evaluate(
        (element, selectors) => selectors.findIndex((candidate) => element.matches(candidate)),
        unmatched.map((entry) => entry.selector),
      );
      expect(index, `Unexpected ${violation.id} node ${selector}`).toBeGreaterThanOrEqual(0);
      const [entry] = unmatched.splice(index, 1);
      expect(node.impact).toBe(entry.expectedImpact);
      expect(node.failureSummary).toMatch(entry.expectedMessage);
    }
  }
}

for (const station of builtStations) {
  const route = `/stations/${station.slug}/`;
  const expected = intentionalFailures.filter((entry) => entry.station === station.id && entry.view === 'barrier');

  for (const mode of modes) {
    test(`@a11y Station ${station.id} fixed view has no automated findings in ${mode} mode`, async ({ page }) => {
      await page.goto(route);
      await page.getByRole('radio', { name: 'Try the fix' }).check();
      await page.getByRole('button', { name: mode }).click();
      await expect(page.locator(`[data-atk-mode-panel="${mode.toLowerCase()}"]`)).toBeVisible();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test(`@a11y Station ${station.id} compare view adds no findings beyond the barrier ledger`, async ({ page }) => {
    await page.goto(route);
    await page.getByRole('radio', { name: 'Compare side by side' }).check();
    await expect(page.locator('[data-atk-panel="fixed"]')).toBeVisible();

    await expectExactLedger(page, expected);
  });

  test(`@a11y Station ${station.id} barrier matches its exact exception ledger`, async ({ page }) => {
    await page.goto(route);
    expect(expected.length).toBeGreaterThan(0);
    await expectExactLedger(page, expected);

    for (const entry of expected) {
      await expect(page.locator(entry.selector)).toHaveCount(1);
    }

    if (station.id === '01') {
      for (const entry of expected) {
        const field = page.locator(entry.selector);
        await expect(field).toHaveAttribute('placeholder', /\S+/);
        const id = await field.getAttribute('id');
        await expect(page.locator(`label[for="${id}"]`)).toHaveCount(0);
      }
    }
  });
}

const dynamicFixedStates = [
  {
    name: 'Station 02 field-specific error',
    route: '/stations/error-message/',
    setup: async (page) => {
      await page.locator('#atk-02-fixed-zip').fill('12');
      await page.locator('[data-atk-02-fixed-form]').getByRole('button', { name: 'Update payment' }).click();
      await expect(page.locator('#atk-02-fixed-zip-error')).toBeVisible();
    },
  },
  {
    name: 'Station 04 persistent menu',
    route: '/stations/disappearing-menu/',
    setup: async (page) => {
      await page.locator('[data-atk-04-fixed-trigger]').click();
      await expect(page.locator('[data-atk-04-fixed-menu]')).toBeVisible();
    },
  },
  {
    name: 'Station 06 validation error',
    route: '/stations/memory-tax/',
    setup: async (page) => {
      await page.locator('#atk-06-fixed-code').fill('111111');
      await page.locator('[data-atk-06-fixed-form]').getByRole('button', { name: 'Confirm transfer' }).click();
      await expect(page.locator('#atk-06-fixed-code-error')).toBeVisible();
    },
  },
  {
    name: 'Station 07 open dialog',
    route: '/stations/keyboard-trap/',
    setup: async (page) => {
      await page.locator('[data-atk-07-fixed-open]').click();
      await expect(page.locator('[data-atk-07-fixed-dialog]')).toBeVisible();
    },
  },
  {
    name: 'Station 11 expanded transcript',
    route: '/stations/caption-gap/',
    setup: async (page) => {
      await page.locator('#panel-fix-11 .media-transcript summary').click();
      await expect(page.locator('#panel-fix-11 .media-transcript')).toHaveAttribute('open', '');
    },
  },
];

for (const state of dynamicFixedStates) {
  test(`@a11y ${state.name} has no automated findings`, async ({ page }) => {
    await page.goto(state.route);
    await page.getByRole('radio', { name: 'Try the fix' }).check();
    await state.setup(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
