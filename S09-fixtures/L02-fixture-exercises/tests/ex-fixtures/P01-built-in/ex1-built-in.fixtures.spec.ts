// Exercises with built-in fixtures
// Tun it in UI Mode for best experience
import { test } from '@playwright/test';

// No fixture = fully configurable test
test('ex1.0 no fixture', async () => {
  console.log('🧪 t0 test no fixture');
});

// fixture can:
// run before your test (page open),
// provide data to your test (page.goto(''))
// run after your test (page close)
test('ex1.1 page fixture', async ({ page }) => {
  console.log('🧪 t1 test with page fixture');
  await page.goto('');
});

test('ex1.2 context fixture', async ({ context }) => {
  console.log('🧪 t2 test with context fixture');
  const page = await context.newPage();
  await page.goto('');
});

test('ex1.3 browser fixture', async ({ browser }) => {
  console.log('🧪 t3 test with browser fixture');
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('');
});
