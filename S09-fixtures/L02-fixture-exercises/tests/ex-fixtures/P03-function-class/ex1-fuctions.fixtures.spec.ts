// Example of own fixtures with function
import { test } from '@playwright/test';

const myTest = test.extend({
  name: async ({}, use) => {
    console.log('🌱 f1.1 name fixture initialized');

    function printName(input: string): void {
      console.log('🌳 f1.2 name fixture function');
      // add breakpoint below to debug function usage
      console.log(input);
    }

    await use(printName);
  },
});

myTest('ex1.1 test execute fixture', async ({ name }) => {
  console.log('🧪 t1.1 test and before using my fixture');
  // add breakpoint below to debug fixture function usage
  await name('🧪 t1.2 Ewa');
});
