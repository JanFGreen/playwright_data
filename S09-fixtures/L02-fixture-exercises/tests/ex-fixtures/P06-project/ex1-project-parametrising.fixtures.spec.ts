// Example of using project parameters in fixtures (naive approach)
// see playwright.config.ts projects[] for use parameters

import { test } from '@playwright/test';

const myTest = test.extend<{ name: string }>({
  name: async ({}, use, testInfo) => {
    console.log('🌱 f1 name fixture initialized');

    const projectUse = testInfo.project.use as { customName?: string };
    const projectCustomName = projectUse.customName ?? 'not-set';
    await use(projectCustomName);
  },
});

myTest('ex1.1 test execute fixture', async ({ name }) => {
  console.log('🧪 t1 test my fixture');
  console.log(name);
});
