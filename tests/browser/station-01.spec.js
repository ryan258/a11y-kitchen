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

test('barrier: first submit destroys the values and second submit accepts', async ({ page }) => {
  const member = page.locator('#atk-01-barrier-member-number');
  const reason = page.locator('#atk-01-barrier-reason');
  const status = page.locator('[data-atk-barrier-status]');

  await member.fill('482731');
  await reason.fill('Moving away');
  await page.locator('[data-atk-barrier-form]').getByRole('button', { name: 'Cancel membership' }).click();
  await expect(member).toHaveValue('');
  await expect(reason).toHaveValue('');
  await expect(status).toHaveText('Invalid input.');

  await member.fill('482731');
  await reason.fill('Moving away');
  await page.locator('[data-atk-barrier-form]').getByRole('button', { name: 'Cancel membership' }).click();
  await expect(status).toHaveText('Membership canceled.');
  await expect(page.locator('[data-atk-barrier-timer]')).toHaveText('Timer stopped.');
});

test('barrier: the countdown starts once and expiry clears both fields', async ({ page }) => {
  const form = page.locator('[data-atk-barrier-form]');
  const member = page.locator('#atk-01-barrier-member-number');
  const reason = page.locator('#atk-01-barrier-reason');

  await expect(form).toHaveAttribute('data-atk-duration-seconds', '30');
  await form.evaluate((element) => { element.dataset.atkDurationSeconds = '1'; });
  await member.fill('482731');
  await reason.fill('Moving away');
  await page.waitForTimeout(1400);

  await expect(member).toHaveValue('');
  await expect(reason).toHaveValue('');
  await expect(page.locator('[data-atk-barrier-status]')).toHaveText(
    'Session terminated. Please re-initiate.',
  );
  await expect(page.locator('[data-atk-barrier-timer]')).toHaveText('Time expired.');
});

test('barrier: hiding pauses the timer and reset clears timer, message, and attempts', async ({ page }) => {
  const timer = page.locator('[data-atk-barrier-timer]');
  const status = page.locator('[data-atk-barrier-status]');
  await page.locator('[data-atk-barrier-form]')
    .evaluate((element) => { element.dataset.atkDurationSeconds = '3'; });
  await page.locator('#atk-01-barrier-member-number').focus();
  await page.waitForTimeout(500);
  await page.getByRole('radio', { name: 'Try the fix' }).check();
  await expect(timer).toContainText('Paused while hidden.');
  const pausedText = await timer.textContent();
  await page.waitForTimeout(1100);
  expect(await timer.textContent()).toBe(pausedText);

  await page.getByRole('radio', { name: 'Compare side by side' }).check();
  await page.locator('[data-atk-barrier-reset]').click();
  await expect(timer).toHaveText('Time left: 3 seconds.');
  await expect(status).toHaveText('');

  await page.locator('#atk-01-barrier-member-number').fill('482731');
  await page.locator('#atk-01-barrier-reason').fill('Moving away');
  await page.locator('[data-atk-barrier-form]').getByRole('button', { name: 'Cancel membership' }).click();
  await expect(status).toHaveText('Invalid input.');
});

test('fixed: validation names the field, keeps its value, and announces once', async ({ page }) => {
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
  // role="alert" announces on its own; focusing it too would read it twice.
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
  await barrierMember.fill('111111');
  await fixedMember.fill('482731');

  await page.locator('[data-atk-fixed-reset]:visible').click();
  await expect(fixedMember).toHaveValue('');
  await expect(barrierMember).toHaveValue('111111');
  await expect(page.getByRole('radio', { name: 'Compare side by side' })).toBeChecked();
  await expect(page.locator('#atk-01-fixed-heading')).toBeFocused();

  await page.locator('[data-atk-barrier-reset]').click();
  await expect(barrierMember).toHaveValue('');
  await expect(page.getByRole('radio', { name: 'Compare side by side' })).toBeChecked();
  await expect(page.locator('#atk-01-barrier-heading')).toBeFocused();
});
