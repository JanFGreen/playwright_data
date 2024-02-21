// Example of own dynamic and static fixture configuration
// super simple fixture with more complex object
import { test } from '@playwright/test';

interface MyObject {
  myStatic: string;
  myLog: string;
}

const myTest = test.extend<MyObject>({
  myStatic: '🌳 f1 hello',
  myLog: async ({}, use) => {
    console.log('🌱 f2.1 Fixture before test');
    await use('🌳 f2.2 Hello from fixture');
    console.log('🍂 f2.3 Fixture after test');
  },
});

myTest('ex3.1 test using nothing', async () => {
  console.log('🧪 t1 test no action');
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
myTest('ex3.2 test calling fixture', async ({ myLog, myStatic }) => {
  console.log('🧪 t2 test my fixture imported');
});

myTest('ex3.3 test execute fixture', async ({ myLog, myStatic }) => {
  console.log('🧪 t3 test my fixture executed');
  console.log(myStatic);
  console.log(await myLog);
  // pay attention to await in above line, is not needed due to MyObject interface
  // without interface await will not call the warning:
  // " 'await' has no effect on the type of this expression. ts(80007)"
  // see ex2-own.fixtures.spec.ts for comparison
});

myTest('ex3.4 test with built-in', async ({ page }) => {
  await page.goto('');
  console.log('🧪 t4 test with built-in');
});
