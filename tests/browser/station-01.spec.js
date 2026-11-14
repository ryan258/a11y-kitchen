import { test, expect } from '@playwright/test';

const route = '/stations/cancellation-form/';

test.beforeEach(async ({ page }) => {
  await page.goto(route);
});

test('view: barrier is default and each native display mode exposes the right panels', async ({ page }) => {
  const barrier = page.locator('[data-atk-panel="barrier"]');
  const fixed = page.locator('[data-atk-panel="fixed"]');
  const barrierMode = page.getByRole('radio', { name: 'Try the barrier' });
  const fixedMode = page.getByRole('radio', { name: 'Try the fix' });
  const compareMode = page.getByRole('radio', { name: 'Compare side by side' });

  await expect(page.locator('.station-eyebrow')).toContainText('Station 01');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Cancel a membership');
  await expect(page.locator('.task-bar')).toContainText('This demonstration sends and saves no data.');
  await expect(page.locator('.view-switch-fieldset')).toBeVisible();
  await expect(page.locator('.changed-panels-section')).toBeVisible();

  await expect(barrierMode).toBeChecked();
  await expect(barrier).toBeVisible();
  await expect(fixed).toBeHidden();

  await fixedMode.check();
  await expect(fixedMode).toBeChecked();
  await expect(barrier).toBeHidden();
  await expect(fixed).toBeVisible();

  await compareMode.check();
  await expect(compareMode).toBeChecked();
  await expect(barrier).toBeVisible();
  await expect(fixed).toBeVisible();
});

test('view: compare uses columns at 60rem and stacks below the breakpoint', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.getByRole('radio', { name: 'Compare side by side' }).check();
  const barrierWide = await page.locator('[data-atk-panel="barrier"]').boundingBox();
  const fixedWide = await page.locator('[data-atk-panel="fixed"]').boundingBox();
  expect(Math.abs(barrierWide.y - fixedWide.y)).toBeLessThan(2);
  expect(fixedWide.x).toBeGreaterThan(barrierWide.x + barrierWide.width - 2);

  await page.setViewportSize({ width: 800, height: 900 });
  const barrierNarrow = await page.locator('[data-atk-panel="barrier"]').boundingBox();
  const fixedNarrow = await page.locator('[data-atk-panel="fixed"]').boundingBox();
  expect(fixedNarrow.y).toBeGreaterThan(barrierNarrow.y);
});

test('view: panel state survives changes and focus cannot remain hidden', async ({ page }) => {
  const barrierInput = page.locator('#atk-01-barrier-member-number');
  await barrierInput.fill('482731');
  await barrierInput.focus();

  const fixedMode = page.getByRole('radio', { name: 'Try the fix' });
  await fixedMode.evaluate((input) => {
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await expect(fixedMode).toBeFocused();

  await page.getByRole('radio', { name: 'Compare side by side' }).check();
  await expect(barrierInput).toHaveValue('482731');
});

test('barrier: first submit destroys the values and a complete retry succeeds', async ({ page }) => {
  const member = page.locator('#atk-01-barrier-member-number');
  const reason = page.locator('#atk-01-barrier-reason');
  const status = page.locator('[data-atk-barrier-status]');
  const submit = page.locator('[data-atk-barrier-form]').getByRole('button', { name: 'Cancel membership' });

  await member.fill('482731');
  await reason.fill('Moving away');
  await submit.click();
  await expect(member).toHaveValue('');
  await expect(reason).toHaveValue('');
  await expect(status).toHaveText('Invalid input.');

  await submit.click();
  await expect(status).toHaveText('Invalid input.');
  await member.fill('482731');
  await submit.click();
  await expect(status).toHaveText('Invalid input.');
  await expect(member).toHaveValue('482731');

  await reason.fill('Moving away');
  await submit.click();
  await expect(status).toHaveText('Membership canceled.');
  await expect(page.locator('[data-atk-barrier-timer]')).toHaveText('Timer stopped.');
});

test('barrier: the countdown starts once and expiry requires reset', async ({ page }) => {
  await page.clock.install();
  const form = page.locator('[data-atk-barrier-form]');
  const member = page.locator('#atk-01-barrier-member-number');
  const reason = page.locator('#atk-01-barrier-reason');
  const countdown = page.locator('#atk-01-barrier-countdown');
  const toggle = page.locator('[data-atk-barrier-toggle-countdown]');
  const timer = page.locator('[data-atk-barrier-timer]');

  await expect(form).toHaveAttribute('data-atk-duration-seconds', '30');
  await form.evaluate((element) => { element.dataset.atkDurationSeconds = '10'; });
  await member.fill('482731');
  await reason.fill('Moving away');
  const initialReadout = await timer.textContent();

  await page.getByRole('button', { name: 'Hide countdown' }).press('Enter');
  await expect(countdown).toBeHidden();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await expect(member).toHaveValue('482731');
  await expect(reason).toHaveValue('Moving away');

  await page.clock.runFor(1000);
  await page.getByRole('button', { name: 'Show countdown' }).press('Enter');
  await expect(countdown).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toBeFocused();
  await expect(timer).not.toHaveText(initialReadout);
  await page.getByRole('button', { name: 'Hide countdown' }).press('Enter');
  await page.clock.runFor(10_000);

  await expect(member).toHaveValue('');
  await expect(reason).toHaveValue('');
  await expect(page.locator('[data-atk-barrier-status]')).toHaveText(
    'Session terminated. Please re-initiate.',
  );
  await expect(countdown).toBeHidden();
  await page.getByRole('button', { name: 'Show countdown' }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(countdown).toBeVisible();
  await expect(timer).toHaveText('Time expired.');
  await member.fill('482731');
  await reason.fill('Moving away');
  await form.getByRole('button', { name: 'Cancel membership' }).click();
  await expect(page.locator('[data-atk-barrier-status]')).toHaveText(
    'Session terminated. Please re-initiate.',
  );
  await expect(timer).toHaveText('Time expired.');
  await page.getByRole('button', { name: 'Hide countdown' }).click();
  await form.getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(member).toBeEmpty();
  await expect(reason).toBeEmpty();
  await expect(countdown).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(timer).toHaveText('Time left: 10 seconds.');
});

test('barrier: hiding pauses the timer and reset clears timer, message, and attempts', async ({ page }) => {
  const timer = page.locator('[data-atk-barrier-timer]');
  const status = page.locator('[data-atk-barrier-status]');
  await page.evaluate(() => {
    const activeIntervals = new Set();
    const originalSetInterval = window.setInterval.bind(window);
    const originalClearInterval = window.clearInterval.bind(window);
    window.setInterval = (...args) => {
      const identifier = originalSetInterval(...args);
      activeIntervals.add(identifier);
      return identifier;
    };
    window.clearInterval = (identifier) => {
      activeIntervals.delete(identifier);
      originalClearInterval(identifier);
    };
    window.__atkTimerProbe = { activeCount: () => activeIntervals.size };
  });
  await page.locator('[data-atk-barrier-form]')
    .evaluate((element) => { element.dataset.atkDurationSeconds = '3'; });
  await page.locator('#atk-01-barrier-member-number').focus();
  expect(await page.evaluate(() => window.__atkTimerProbe.activeCount())).toBe(1);
  await page.waitForTimeout(500);
  await page.getByRole('radio', { name: 'Try the fix' }).check();
  await expect(timer).toContainText('Paused while hidden.');
  expect(await page.evaluate(() => window.__atkTimerProbe.activeCount())).toBe(0);
  const pausedText = await timer.textContent();
  await page.waitForTimeout(1100);
  expect(await timer.textContent()).toBe(pausedText);
  expect(await page.evaluate(() => window.__atkTimerProbe.activeCount())).toBe(0);

  await page.getByRole('radio', { name: 'Compare side by side' }).check();
  expect(await page.evaluate(() => window.__atkTimerProbe.activeCount())).toBe(1);
  await page.locator('[data-atk-barrier-reset]').click();
  expect(await page.evaluate(() => window.__atkTimerProbe.activeCount())).toBe(0);
  await expect(timer).toHaveText('Time left: 3 seconds.');
  await expect(status).toHaveText('');

  await page.locator('#atk-01-barrier-member-number').fill('482731');
  await page.locator('#atk-01-barrier-reason').fill('Moving away');
  await page.locator('[data-atk-barrier-form]').getByRole('button', { name: 'Cancel membership' }).click();
  await expect(status).toHaveText('Invalid input.');
});

test('fixed: validation names the field and keeps its value and focus', async ({ page }) => {
  await page.getByRole('radio', { name: 'Try the fix' }).check();
  const member = page.locator('#atk-01-fixed-member-number');
  const error = page.locator('#atk-01-fixed-member-error');
  const submit = page.locator('[data-atk-fixed-step="1"]').getByRole('button', { name: 'Continue' });
  await member.fill('12a');
  await submit.click();
  await expect(error).toHaveText(
    'Member number: Enter exactly six digits. Your value was kept so you can fix it.',
  );
  await expect(error).toHaveAttribute('role', 'alert');
  // Speech output is checked separately with assistive technology.
  await expect(error).toHaveAttribute('aria-atomic', 'true');
  await expect(error).not.toBeFocused();
  await expect(error).not.toHaveAttribute('tabindex');
  await expect(submit).toBeFocused();
  await expect(member).toHaveValue('12a');
  await expect(member).toHaveAttribute('aria-invalid', 'true');

  await member.fill('482731');
  await expect(member).not.toHaveAttribute('aria-invalid');
  await expect(error).toHaveText('');
});

test('fixed: step focus, back, retained values, review, and confirmation work', async ({ page }) => {
  await page.getByRole('radio', { name: 'Try the fix' }).check();
  const member = page.locator('#atk-01-fixed-member-number');
  const reason = page.locator('#atk-01-fixed-reason');

  await member.fill('482731');
  await page.locator('[data-atk-fixed-step="1"]').getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#atk-01-fixed-step-2-heading')).toBeFocused();
  const review = page.locator('[data-atk-fixed-step="2"]').getByRole('button', { name: 'Review cancellation' });
  await review.click();
  await expect(page.locator('#atk-01-fixed-reason-error')).toHaveText(
    'Reason for cancellation: Enter a short reason before you continue.',
  );
  await expect(review).toBeFocused();
  await expect(reason).toHaveAttribute('aria-invalid', 'true');
  await reason.fill('Moving away');
  await expect(reason).not.toHaveAttribute('aria-invalid');
  await page.locator('[data-atk-fixed-step="2"]').getByRole('button', { name: 'Go back' }).click();
  await expect(page.locator('#atk-01-fixed-step-1-heading')).toBeFocused();
  await expect(member).toHaveValue('482731');

  await page.locator('[data-atk-fixed-step="1"]').getByRole('button', { name: 'Continue' }).click();
  await expect(reason).toHaveValue('Moving away');
  await page.locator('[data-atk-fixed-step="2"]').getByRole('button', { name: 'Review cancellation' }).click();
  await expect(page.locator('#atk-01-fixed-step-3-heading')).toBeFocused();
  await expect(page.locator('[data-atk-fixed-review-member]')).toHaveText('482731');
  await expect(page.locator('[data-atk-fixed-review-reason]')).toHaveText('Moving away');

  await page.locator('[data-atk-fixed-step="3"]').getByRole('button', { name: 'Confirm cancellation' }).click();
  await expect(page.locator('#atk-01-fixed-complete-heading')).toBeFocused();
  await expect(page.locator('[data-atk-fixed-complete]')).toContainText('No data was sent or saved.');
});

test('reset: each panel resets independently without changing the selected view', async ({ page }) => {
  await page.getByRole('radio', { name: 'Compare side by side' }).check();
  const barrierMember = page.locator('#atk-01-barrier-member-number');
  const fixedMember = page.locator('#atk-01-fixed-member-number');
  const fixedReason = page.locator('#atk-01-fixed-reason');
  const reviewMember = page.locator('[data-atk-fixed-review-member]');
  const reviewReason = page.locator('[data-atk-fixed-review-reason]');
  await barrierMember.fill('111111');
  await fixedMember.fill('482731');
  await page.locator('[data-atk-fixed-form="1"]').getByRole('button', { name: 'Continue' }).click();
  await fixedReason.fill('Moving away');
  await page.getByRole('button', { name: 'Review cancellation' }).click();
  await expect(reviewMember).toHaveText('482731');
  await expect(reviewReason).toHaveText('Moving away');

  await page.locator('[data-atk-fixed-reset]:visible').click();
  await expect(fixedMember).toHaveValue('');
  await expect(fixedReason).toHaveValue('');
  await expect(reviewMember).toBeEmpty();
  await expect(reviewReason).toBeEmpty();
  await expect(barrierMember).toHaveValue('111111');
  await expect(page.getByRole('radio', { name: 'Compare side by side' })).toBeChecked();
  await expect(page.locator('#atk-01-fixed-heading')).toBeFocused();

  await page.locator('[data-atk-barrier-reset]').click();
  await expect(barrierMember).toHaveValue('');
  await expect(page.getByRole('radio', { name: 'Compare side by side' })).toBeChecked();
  await expect(page.locator('#atk-01-barrier-heading')).toBeFocused();
});
