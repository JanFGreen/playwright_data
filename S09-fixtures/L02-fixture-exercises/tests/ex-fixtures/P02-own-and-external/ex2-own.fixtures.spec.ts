// Example of own dynamic fixture configuration
import { test } from '@playwright/test';

// super simple fixture
// test.extend - we changing test object
// myLog: it is name of the fixture
// async({}, use) => { ... } - it is function that will be executed
// params: {} - it is params that will be passed to the test
// params: use - it is function that will be executed in the test
// await use({}); - is for test to wait for fixture to finish
const myTest = test.extend({
  myLog: async ({}, use) => {
    console.log('🌱 f1.1 Fixture before test');
    await use('🌳 f1.2 Hello from fixture');
    console.log('🍂 f1.3 Fixture after test');
  },
});

myTest('ex2.1 test using nothing', async () => {
  console.log('🧪 t1 test no action');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
myTest('ex2.2 test calling fixture', async ({ myLog }) => {
  console.log('🧪 t2 test my fixture imported');
});

myTest('ex2.3 test execute fixture', async ({ myLog }) => {
  console.log('🧪 t3 test my fixture executed');
  console.log(await myLog);
});

myTest('ex2.4 test with built-in', async ({ page }) => {
  await page.goto('');
  console.log('🧪 t4 test with built-in');
});
