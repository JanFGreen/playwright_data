// Example of own automatic fixture configuration
import { test } from '@playwright/test';

// remember to add the type to the fixture, best void since we not call it { myLog: void }
// make fixture value in []
// add {auto: true} to the fixture

const myTest = test.extend<{ myLog: void }>({
  myLog: [
    async ({}, use): Promise<void> => {
      console.log('🌱 f1.1 Fixture before test');
      await use();
      console.log('🍂 f1.2 Fixture after test');
    },
    { auto: true },
  ],
});

// no need to import fixture, it execute automatically
myTest('ex1.1 test using auto fixture', async () => {
  console.log('🧪 t1 test using auto fixture');
});

myTest('ex1.2 test with built-in and auto', async ({ page }) => {
  await page.goto('');
  console.log('🧪 t2 test with built-in and auto');
});
