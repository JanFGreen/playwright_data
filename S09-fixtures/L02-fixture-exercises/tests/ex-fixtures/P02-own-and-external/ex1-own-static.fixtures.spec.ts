// Example of own static fixture
import { test } from '@playwright/test';

// Super simple fixture
// We need to define interface for our fixture
const myTest = test.extend<{ myLog: string }>({
  myLog: '🌳 f1 hello',
});

// Use new test object myTest
myTest('ex1.1 test using nothing', async () => {
  console.log('🧪 t1 test no action');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
myTest('ex1.2 test calling fixture', async ({ myLog }) => {
  console.log('🧪 t2 test my fixture imported');
});

myTest('ex1.3 test execute fixture', async ({ myLog }) => {
  console.log('🧪 t3 test my fixture executed');
  console.log(myLog);
});

myTest('ex1.4 test with built-in', async ({ page }) => {
  await page.goto('');
  console.log('🧪 t4 test with built-in');
});
