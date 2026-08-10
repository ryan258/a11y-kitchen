import { test, expect } from '@playwright/test';
import { stations } from '../../src/data/stations.js';

const forbiddenTaskBarAnswers = {
  '03': 'online return',
  '06': '734219',
  '10': 'ATK-511',
  '11': 'Press Done',
};

for (const station of stations) {
  test(`station ${station.id}: shared page, view, reset isolation, and audience contract`, async ({ page }) => {
    await page.goto(`/stations/${station.slug}/`);
    const barrier = page.locator('[data-atk-panel="barrier"]');
    const fixed = page.locator('[data-atk-panel="fixed"]');

    await expect(page.locator('[data-atk-station]')).toHaveAttribute('data-atk-station', station.id);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(station.task);
    await expect(barrier).toHaveCount(1);
    await expect(fixed).toHaveCount(1);
    await expect(barrier).toBeVisible();
    await expect(fixed).toBeHidden();
    await expect(barrier.getByText('This version is broken on purpose.')).toHaveCount(1);
    if (forbiddenTaskBarAnswers[station.id]) {
      await expect(page.locator('.task-bar')).not.toContainText(forbiddenTaskBarAnswers[station.id]);
    }
    await expect(barrier.locator('button', { hasText: 'Reset Barrier' })).toHaveCount(1);
    await expect(fixed.locator('button', { hasText: 'Reset Fixed' })).toHaveCount(1);

    await page.getByRole('radio', { name: 'Try the fix' }).check();
    await expect(barrier).toBeHidden();
    await expect(fixed).toBeVisible();
    await page.getByRole('radio', { name: 'Compare side by side' }).check();
    await expect(barrier).toBeVisible();
    await expect(fixed).toBeVisible();

    await expect(page.locator('[data-atk-mode-panel]:visible')).toHaveCount(1);
    await expect(page.locator('[data-atk-mode-panel="builder"]')).toBeVisible();
    await expect(page.locator('[data-atk-mode-panel="builder"] .wcag-list a')).toHaveCount(station.criteria.length);
    await page.getByRole('button', { name: 'Advocate' }).click();
    await expect(page.locator('[data-atk-mode-panel="advocate"]')).toBeVisible();
    await page.getByRole('button', { name: 'Presenter' }).click();
    await expect(page.locator('[data-atk-mode-panel="presenter"]')).toBeVisible();
    await expect(page.locator('[data-atk-mode-panel="presenter"] blockquote')).toHaveCount(3);

    // Every reset stays scoped to its panel: neither reset may change the
    // selected compare view or the global audience mode.
    await barrier.getByRole('button', { name: 'Reset Barrier' }).click();
    await expect(page.getByRole('radio', { name: 'Compare side by side' })).toBeChecked();
    await expect(barrier).toBeVisible();
    await expect(fixed).toBeVisible();
    await expect(page.locator('[data-atk-mode-panel="presenter"]')).toBeVisible();
    await fixed.getByRole('button', { name: 'Reset Fixed' }).click();
    await expect(page.getByRole('radio', { name: 'Compare side by side' })).toBeChecked();
    await expect(barrier).toBeVisible();
    await expect(fixed).toBeVisible();
    await expect(page.locator('[data-atk-mode-panel="presenter"]')).toBeVisible();
  });
}

test('station 02: vague retry and field-specific recovery both complete', async ({ page }) => {
  await page.goto('/stations/error-message/');
  const barrierForm = page.locator('[data-atk-02-barrier-form]');
  await barrierForm.locator('input').fill('60614');
  await barrierForm.getByRole('button', { name: 'Update payment' }).click();
  await expect(page.locator('[data-atk-02-barrier-status]')).toHaveText('Invalid input.');
  await barrierForm.getByRole('button', { name: 'Update payment' }).click();
  await expect(page.locator('[data-atk-02-barrier-status]')).toHaveText('Payment details updated.');
  await barrierForm.getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(barrierForm.locator('input')).toBeEmpty();
  await expect(page.locator('[data-atk-02-barrier-status]')).toBeEmpty();
  await expect(page.locator('#atk-02-barrier-heading')).toBeFocused();

  await page.getByRole('radio', { name: 'Try the fix' }).check();
  const input = page.locator('#atk-02-fixed-zip');
  const error = page.locator('#atk-02-fixed-zip-error');
  const completion = page.locator('[data-atk-02-fixed-complete]');
  await input.fill('12');
  const submit = page.locator('[data-atk-02-fixed-form]').getByRole('button', { name: 'Update payment' });
  await submit.click();
  await expect(error).toContainText('Enter exactly five digits');
  // role="alert" announces on its own; focusing it too would read it twice.
  await expect(error).not.toBeFocused();
  await expect(error).not.toHaveAttribute('tabindex');
  await expect(submit).toBeFocused();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(input).toHaveValue('12');
  await input.fill('60614');
  await page.locator('[data-atk-02-fixed-form]').getByRole('button', { name: 'Update payment' }).click();
  await expect(page.locator('#atk-02-fixed-complete-heading')).toBeFocused();
  await expect(completion).toBeVisible();
  await input.fill('123');
  await expect(completion).toBeHidden();
  await submit.click();
  await expect(error).toContainText('Enter exactly five digits');
  await expect(completion).toBeHidden();
  await page.getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(input).toBeEmpty();
  await expect(input).not.toHaveAttribute('aria-invalid');
  await expect(error).toBeEmpty();
  await expect(completion).toBeHidden();
  await expect(page.locator('#atk-02-fixed-heading')).toBeFocused();
});

test('station 03: both versions reach the same return result and reset', async ({ page }) => {
  await page.goto('/stations/reading-wall/');
  await page.locator('[data-atk-panel="barrier"] input[value="online"]').check();
  await page.locator('[data-atk-panel="barrier"]').getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('[data-atk-panel="barrier"] [data-atk-choice-status]')).toContainText('ATK-302');
  await page.locator('[data-atk-panel="barrier"]').getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(page.locator('[data-atk-panel="barrier"] input:checked')).toHaveCount(0);
  await expect(page.locator('[data-atk-panel="barrier"] [data-atk-choice-status]')).toBeEmpty();
  await expect(page.locator('#atk-03-barrier-heading')).toBeFocused();
  await page.getByRole('radio', { name: 'Try the fix' }).check();
  await page.locator('[data-atk-panel="fixed"] input[value="online"]').check();
  await page.locator('[data-atk-panel="fixed"]').getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('[data-atk-panel="fixed"] [data-atk-choice-status]')).toContainText('ATK-302');
  await page.locator('[data-atk-panel="fixed"]').getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(page.locator('[data-atk-panel="fixed"] input:checked')).toHaveCount(0);
  await expect(page.locator('[data-atk-panel="fixed"] [data-atk-choice-status]')).toBeEmpty();
  await expect(page.locator('#atk-03-fixed-heading')).toBeFocused();
});

test('station 04: backup works and fixed menu supports Escape with focus return', async ({ page }) => {
  await page.goto('/stations/disappearing-menu/');
  await page.getByRole('button', { name: 'Open Settings with safe backup' }).click();
  await expect(page.locator('[data-atk-04-barrier-status]')).toHaveText('Settings opened.');
  await page.getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(page.locator('[data-atk-04-barrier-status]')).toBeEmpty();
  await expect(page.locator('#atk-04-barrier-heading')).toBeFocused();

  await page.getByRole('radio', { name: 'Try the fix' }).check();
  const trigger = page.locator('[data-atk-04-fixed-trigger]');
  await trigger.click();
  const fixedMenu = page.locator('[data-atk-04-fixed-menu]');
  await expect(fixedMenu).toBeVisible();
  await expect(fixedMenu.getByRole('button')).toHaveCount(1);
  await expect(fixedMenu.getByRole('button', { name: 'Settings' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-atk-04-fixed-menu]')).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await expect(fixedMenu).toBeVisible();
  await page.keyboard.press('Shift+Tab');
  await expect(trigger).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(fixedMenu).toBeHidden();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();

  await trigger.click();
  await page.locator('[data-atk-04-fixed-settings]').click();
  await expect(page.locator('[data-atk-04-fixed-status]')).toHaveText('Settings opened.');
  await expect(trigger).toBeFocused();
  await page.getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(page.locator('[data-atk-04-fixed-status]')).toBeEmpty();
  await expect(page.locator('[data-atk-04-fixed-menu]')).toBeHidden();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#atk-04-fixed-heading')).toBeFocused();
});

test('station 05: automatic interrupt is escapable and fixed update keeps focus', async ({ page }) => {
  await page.goto('/stations/interruption/');
  const barrierForm = page.locator('[data-atk-05-barrier-form]');
  await barrierForm.evaluate((form) => { form.dataset.atkInterruptDelay = '100'; });
  const name = page.locator('#atk-05-barrier-name');
  await name.fill('Sam Lee');
  await expect(page.locator('[data-atk-05-interrupt]')).toBeVisible();
  await expect(page.locator('[data-atk-05-close-interrupt]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-atk-05-interrupt]')).toBeHidden();
  await expect(name).toBeFocused();

  await barrierForm.getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(name).toBeEmpty();
  await expect(page.locator('[data-atk-05-interrupt]')).toBeHidden();
  await expect(page.locator('[data-atk-05-barrier-status]')).toBeEmpty();
  await expect(page.locator('#atk-05-barrier-heading')).toBeFocused();
  await name.fill('Sam Lee');
  await expect(page.locator('[data-atk-05-interrupt]')).toBeVisible();
  await page.keyboard.press('Escape');

  await page.getByRole('radio', { name: 'Try the fix' }).check();
  const check = page.locator('[data-atk-05-check]');
  await page.locator('#atk-05-fixed-name').fill('Sam Lee');
  await page.locator('#atk-05-fixed-date').fill('2026-08-19');
  await page.locator('#atk-05-fixed-time').selectOption('10:30');
  await check.focus();
  await check.click();
  await expect(check).toBeFocused();
  await expect(page.locator('[data-atk-05-fixed-status]')).toContainText('10:30 AM is available');
  await page.locator('[data-atk-05-fixed-form]').getByRole('button', { name: 'Book appointment' }).click();
  await expect(page.locator('[data-atk-05-fixed-status]')).toContainText('Appointment booked');
  await page.getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(page.locator('#atk-05-fixed-name')).toBeEmpty();
  await expect(page.locator('#atk-05-fixed-date')).toBeEmpty();
  await expect(page.locator('#atk-05-fixed-time')).toHaveValue('');
  await expect(page.locator('[data-atk-05-fixed-status]')).toBeEmpty();
  await expect(page.locator('#atk-05-fixed-heading')).toBeFocused();
});

test('station 06: barrier hides its code while the fix can fill it', async ({ page }) => {
  await page.goto('/stations/memory-tax/');
  await expect(page.locator('[data-atk-06-barrier-code-step]')).toContainText('734219');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('[data-atk-06-barrier-code-step]')).toBeHidden();
  await expect(page.locator('[data-atk-06-barrier-form]')).toBeVisible();
  await page.locator('#atk-06-barrier-code').fill('111111');
  await page.locator('[data-atk-06-barrier-form]').getByRole('button', { name: 'Confirm transfer' }).click();
  await expect(page.locator('[data-atk-06-barrier-status]')).toContainText('does not match');
  await page.getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(page.locator('[data-atk-06-barrier-code-step]')).toBeVisible();
  await expect(page.locator('[data-atk-06-barrier-form]')).toBeHidden();
  await expect(page.locator('#atk-06-barrier-code')).toBeEmpty();
  await expect(page.locator('[data-atk-06-barrier-status]')).toBeEmpty();
  await expect(page.locator('#atk-06-barrier-heading')).toBeFocused();
  await page.getByRole('radio', { name: 'Try the fix' }).check();
  await page.locator('[data-atk-06-fixed-provided-code]').evaluate((code) => {
    code.textContent = '918204';
  });
  await page.getByRole('button', { name: 'Use this code' }).click();
  await expect(page.locator('#atk-06-fixed-code')).toHaveValue('918204');
  await page.locator('[data-atk-06-fixed-form]').getByRole('button', { name: 'Confirm transfer' }).click();
  await expect(page.locator('[data-atk-06-fixed-status]')).toContainText('Transfer confirmed');
  const fixedInput = page.locator('#atk-06-fixed-code');
  const fixedError = page.locator('#atk-06-fixed-code-error');
  const fixedStatus = page.locator('[data-atk-06-fixed-status]');
  await fixedInput.fill('111111');
  await expect(fixedStatus).toBeEmpty();
  await page.locator('[data-atk-06-fixed-form]').getByRole('button', { name: 'Confirm transfer' }).click();
  await expect(fixedError).toContainText('Enter the six digits');
  await expect(fixedStatus).toBeEmpty();
  await page.getByRole('button', { name: 'Use this code' }).click();
  await expect(fixedInput).toHaveValue('918204');
  await expect(fixedInput).not.toHaveAttribute('aria-invalid');
  await expect(fixedError).toBeEmpty();
  await expect(fixedStatus).toBeEmpty();
  await page.locator('[data-atk-06-fixed-form]').getByRole('button', { name: 'Confirm transfer' }).click();
  await expect(fixedStatus).toContainText('Transfer confirmed');
  await page.getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(fixedInput).toBeEmpty();
  await expect(fixedInput).not.toHaveAttribute('aria-invalid');
  await expect(fixedError).toBeEmpty();
  await expect(fixedStatus).toBeEmpty();
  await expect(page.locator('#atk-06-fixed-heading')).toBeFocused();
});

test('station 07: safety Escape releases the cycle and fixed dialog has a close control', async ({ page }) => {
  await page.goto('/stations/keyboard-trap/');
  const barrierOpen = page.locator('[data-atk-07-barrier-open]');
  await barrierOpen.click();
  const barrierDialog = page.locator('[data-atk-07-barrier-dialog]');
  await expect(barrierDialog).toBeVisible();
  expect(await barrierDialog.getAttribute('aria-modal')).toBeNull();
  await page.keyboard.press('Tab');
  await expect(page.locator('[data-atk-07-cycle]').nth(1)).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(barrierDialog).toBeHidden();
  await expect(barrierOpen).toBeFocused();

  await barrierOpen.click();
  await page.getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(barrierDialog).toBeHidden();
  await expect(page.locator('[data-atk-07-barrier-status]')).toBeEmpty();
  await expect(page.locator('#atk-07-barrier-heading')).toBeFocused();

  await barrierOpen.click();
  const fixedMode = page.getByRole('radio', { name: 'Try the fix' });
  await fixedMode.evaluate((input) => {
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await expect(barrierDialog).toBeHidden();
  await expect(fixedMode).toBeFocused();

  const fixedOpen = page.locator('[data-atk-07-fixed-open]');
  await fixedOpen.click();
  const fixedDialog = page.locator('[data-atk-07-fixed-dialog]');
  await expect(fixedDialog).toBeVisible();
  await expect(fixedDialog.getByRole('button')).toHaveCount(1);
  await fixedDialog.getByRole('button', { name: 'Close promotion' }).click();
  await expect(fixedDialog).toBeHidden();
  await expect(fixedOpen).toBeFocused();
  await page.getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(page.locator('[data-atk-07-fixed-dialog]')).toBeHidden();
  await expect(page.locator('[data-atk-07-fixed-status]')).toBeEmpty();
  await expect(page.locator('#atk-07-fixed-heading')).toBeFocused();
});

test('station 08: replay and fixed controls both select Balcony', async ({ page }) => {
  await page.goto('/stations/invisible-focus/');
  await page.getByRole('button', { name: 'Next product focus' }).click();
  await expect(page.locator('[data-atk-08-readout]')).toContainText('Balcony');
  await page.getByRole('button', { name: 'Buy current option' }).click();
  await expect(page.locator('[data-atk-08-barrier-status]')).toContainText('Balcony ticket purchased');
  await page.getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(page.locator('[data-atk-08-readout]')).toContainText('Standard');
  await expect(page.locator('[data-atk-08-barrier-status]')).toBeEmpty();
  await expect(page.locator('#atk-08-barrier-heading')).toBeFocused();

  await page.getByRole('radio', { name: 'Try the fix' }).check();
  await page.getByRole('radio', { name: 'Balcony · $30' }).check();
  await page.getByRole('button', { name: 'Buy ticket' }).click();
  await expect(page.locator('[data-atk-08-fixed-status]')).toContainText('Balcony ticket purchased');
  await page.getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(page.locator('[data-atk-08-fixed-form] input:checked')).toHaveCount(0);
  await expect(page.locator('[data-atk-08-fixed-status]')).toBeEmpty();
  await expect(page.locator('#atk-08-fixed-heading')).toBeFocused();
});

test('station 09: delete works and fixed button names the item', async ({ page }) => {
  await page.goto('/stations/unlabelled-icon/');
  await page.locator('[data-atk-09-barrier-delete]').click();
  await expect(page.locator('[data-atk-09-barrier-item]')).toBeHidden();
  await expect(page.locator('[data-atk-09-barrier-status]')).toContainText('Notes.txt deleted');
  // Deleting hides the row that held the focused button, so focus must land on
  // the panel heading rather than being lost or dumped on the live region.
  await expect(page.locator('#atk-09-barrier-heading')).toBeFocused();
  await expect(page.locator('[data-atk-09-barrier-status]')).not.toHaveAttribute('tabindex');
  await page.getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(page.locator('[data-atk-09-barrier-item]')).toBeVisible();
  await expect(page.locator('[data-atk-09-barrier-status]')).toBeEmpty();
  await expect(page.locator('#atk-09-barrier-heading')).toBeFocused();

  await page.getByRole('radio', { name: 'Try the fix' }).check();
  const fixedDelete = page.getByRole('button', { name: 'Delete Notes.txt' });
  await expect(fixedDelete).toHaveCount(1);
  await fixedDelete.click();
  await expect(page.locator('[data-atk-09-fixed-status]')).toContainText('Notes.txt deleted');
  await expect(page.locator('#atk-09-fixed-heading')).toBeFocused();
  await expect(page.locator('[data-atk-09-fixed-status]')).not.toHaveAttribute('tabindex');
  await page.getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(page.locator('[data-atk-09-fixed-item]')).toBeVisible();
  await expect(page.locator('[data-atk-09-fixed-status]')).toBeEmpty();
  await expect(page.locator('#atk-09-fixed-heading')).toBeFocused();
});

test('station 10: both versions identify the same failed order', async ({ page }) => {
  await page.goto('/stations/color-only-status/');
  await page.locator('[data-atk-10-barrier-form] input[value="ATK-511"]').check();
  await page.locator('[data-atk-10-barrier-form]').getByRole('button', { name: 'Check order' }).click();
  await expect(page.locator('[data-atk-10-barrier-form] [data-atk-10-status]')).toContainText('Correct');
  await page.locator('[data-atk-10-barrier-form]').getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(page.locator('[data-atk-10-barrier-form] input:checked')).toHaveCount(0);
  await expect(page.locator('[data-atk-10-barrier-form] [data-atk-10-status]')).toBeEmpty();
  await expect(page.locator('#atk-10-barrier-heading')).toBeFocused();
  await page.getByRole('radio', { name: 'Try the fix' }).check();
  await page.locator('[data-atk-10-fixed-form] input[value="ATK-511"]').check();
  await page.locator('[data-atk-10-fixed-form]').getByRole('button', { name: 'Check order' }).click();
  await expect(page.locator('[data-atk-10-fixed-form] [data-atk-10-status]')).toContainText('Correct');
  await page.locator('[data-atk-10-fixed-form]').getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(page.locator('[data-atk-10-fixed-form] input:checked')).toHaveCount(0);
  await expect(page.locator('[data-atk-10-fixed-form] [data-atk-10-status]')).toBeEmpty();
  await expect(page.locator('#atk-10-fixed-heading')).toBeFocused();
});

test('station 11: fixed media has captions and transcript and both tasks reset', async ({ page }) => {
  await page.goto('/stations/caption-gap/');
  await expect(page.locator('#panel-barrier-11 track')).toHaveCount(0);
  await expect(page.locator('#panel-barrier-11 .media-transcript')).toHaveCount(0);
  await page.locator('#panel-barrier-11 input[value="done"]').check();
  await page.locator('#panel-barrier-11').getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('#panel-barrier-11 [data-atk-11-status]')).toContainText('Correct');
  await page.locator('#panel-barrier-11').getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(page.locator('#panel-barrier-11 input:checked')).toHaveCount(0);
  await expect(page.locator('#panel-barrier-11 [data-atk-11-status]')).toBeEmpty();
  await expect(page.locator('#atk-11-barrier-heading')).toBeFocused();
  await page.getByRole('radio', { name: 'Try the fix' }).check();
  await expect(page.locator('#panel-fix-11 track[kind="captions"]')).toHaveCount(1);
  const transcript = page.locator('#panel-fix-11 .media-transcript');
  await transcript.locator('summary').click();
  await expect(transcript).toHaveAttribute('open', '');
  await page.locator('[data-atk-11-form]').nth(1).locator('input[value="done"]').check();
  await page.locator('[data-atk-11-form]').nth(1).getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('#panel-fix-11 [data-atk-11-status]')).toContainText('Correct');
  await page.locator('#panel-fix-11').getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(transcript).not.toHaveAttribute('open', '');
  await expect(page.locator('#panel-fix-11 input:checked')).toHaveCount(0);
  await expect(page.locator('#panel-fix-11 [data-atk-11-status]')).toBeEmpty();
  await expect(page.locator('#atk-11-fixed-heading')).toBeFocused();
});

test('station 12: rendered target geometry and selection match the station brief', async ({ page }) => {
  await page.goto('/stations/target-too-small/');
  const small = page.locator('.target-demo--small button');
  const firstSmall = await small.nth(0).boundingBox();
  const secondSmall = await small.nth(1).boundingBox();
  expect(firstSmall.width).toBe(20);
  expect(firstSmall.height).toBe(20);
  expect(secondSmall.x - firstSmall.x - firstSmall.width).toBe(2);
  await small.nth(1).click();
  await expect(small.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#panel-barrier-12').getByRole('button', { name: 'Reset Barrier' }).click();
  await expect(small.nth(1)).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#panel-barrier-12 [data-atk-12-status]')).toBeEmpty();
  await expect(page.locator('#atk-12-barrier-heading')).toBeFocused();

  await page.getByRole('radio', { name: 'Try the fix' }).check();
  const large = page.locator('.target-demo--large button');
  const firstLarge = await large.nth(0).boundingBox();
  expect(firstLarge.width).toBe(44);
  expect(firstLarge.height).toBe(44);
  await large.nth(1).click();
  await expect(large.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#panel-fix-12 [data-atk-12-status]')).toHaveText('Selected option B.');
  await page.locator('#panel-fix-12').getByRole('button', { name: 'Reset Fixed' }).click();
  await expect(large.nth(1)).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('#panel-fix-12 [data-atk-12-status]')).toBeEmpty();
  await expect(page.locator('#atk-12-fixed-heading')).toBeFocused();
});
