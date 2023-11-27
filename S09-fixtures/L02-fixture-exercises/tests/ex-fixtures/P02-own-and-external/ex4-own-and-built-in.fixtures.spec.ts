// Example of extending built-in fixtures
import { test } from '@playwright/test';

const myTest = test.extend({
  myLog: async ({}, use) => {
    console.log('🌱 f1.1 Fixture before test');
    await use('🌳 f1.2 Hello from fixture');
    console.log('🍂 f1.3 Fixture after test');
  },
  // consider changing page fixture name if needed
  page: async ({ page }, use) => {
    console.log('🌱 f2.1 page fixture overridden test');
    // do the stuff you want to do with page
    // return page
    await use(page);
  },
});

myTest('ex4.1 test execute fixture', async ({ myLog }) => {
  console.log(`🧪 t1 my fixture \n  ${await myLog}`);
});

myTest('ex4.2 test with built-in', async ({ page }) => {
  await page.goto('');
  console.log('🧪 t2 test with built-in');
});

myTest('ex4.3 test importing page and myLog', async ({ page, myLog }) => {
  console.log(`🧪 t3.1 test my fixture \n ${await myLog}`);
  await page.goto('');
  console.log('🧪 t3.2 executed my fixture then built-in');
});

myTest('ex4.4 test importing myLog and page', async ({ myLog, page }) => {
  console.log('🧪 t4.1 test my fixture');
  console.log(await myLog);
  await page.goto('');
  console.log('🧪 t4.2 executed built-in with my fixture');
});
