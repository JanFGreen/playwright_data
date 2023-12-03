// Example of using project parameters in fixtures
// see playwright.config.ts projects[] for use parameters

// 3 use cases
// 1. default value from project
// 2. default value from fixture
// 3. override value from fixture

import { test } from '@playwright/test';

// this interface is used in playwright.config.ts
export interface MyCustomOption {
  customSurname: string;
}

interface MyCustomConfig {
  surname: string;
}

const myTest = test.extend<MyCustomConfig & MyCustomOption>({
  // this is default option but it will be overridden if specified in project
  customSurname: [
    '🌳 f1 default customName (must disable option in project)',
    { option: true },
  ],
  // using custom option in fixture
  surname: async ({ customSurname }, use) => {
    console.log('🌱 f2 name fixture initialized');
    const projectCustomName = customSurname;
    await use(projectCustomName);
  },
});

// Uncomment below to override default value form project or fixture (if project option is disabled)
// myTest.use({ customSurname: "ex10-o1 override customSurname" });

myTest('ex2.1 test execute fixture', async ({ surname }) => {
  console.log('🧪 t1 test my fixture');
  console.log(surname);
});
