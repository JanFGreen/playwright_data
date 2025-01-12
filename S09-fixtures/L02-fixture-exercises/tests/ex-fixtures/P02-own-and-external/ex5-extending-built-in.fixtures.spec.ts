// Example of extending built-in fixtures
import { test, Page } from '@playwright/test';

// in ES2020 you can use this syntax
// const myTest = test.extend({

const myTest = test.extend<Page>({
  page: async ({ page }, use) => {
    console.log('🌱 f1.1 Page fixture overridden before');
    await page.goto('');

    await use(page);

    console.log('🍂 f1.2 Page fixture overridden after');
  },
});

myTest('e5.1 test with overridden page', async ({ page }) => {
  console.log('🧪 t1 before usage of page');
  console.log(page.url());
});
