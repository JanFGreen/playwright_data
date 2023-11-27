// Example how fixture are loaded and executed
import { test } from '@playwright/test';

test.describe('ex2.1 describe', () => {
  // 1 beforeAll
  // 2 beforeEach
  // 3 test (fixture) and code
  test.beforeEach(async () => {
    console.log('⚓ be1 beforeEach with test with fixture');
  });

  test('ex2.1 page fixture', async ({ page }) => {
    await page.goto('');
    console.log('🧪 t1 test with page fixture');
  });
});

test.describe('ex2.2 describe', () => {
  // 1 fixtures imported in beforeEach
  // 2 beforeEach
  // 3 test (fixture) and code
  test.beforeEach(async ({ page }) => {
    console.log('⚓ be2 beforeEach with fixture');
    await page.goto('');
  });

  test('ex2.2 page fixture', async ({ page }) => {
    await page.goto('');
    console.log('🧪 t2 test with page fixture');
  });
});
