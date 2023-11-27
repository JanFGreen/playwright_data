// Example of comparing fixture with before/after each usage
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

myTest('ex1.1 test execute fixture', async ({ myLog, myStatic }) => {
  console.log('🧪 t1 test my fixture executed');
  console.log(myStatic);
  console.log(myLog);
});

// example of before each replacement for fixture
test.describe('ex1.2 test without fixture', () => {
  const myStatic = '🌳 be1 hello';

  test.beforeEach(async ({}) => {
    console.log('🌱 be1 before test');
  });

  test('ex1.2 test with before each', async () => {
    console.log('🧪 t2 test my code executed');
    console.log(myStatic);
    console.log(myLog());
  });

  test.afterEach(async ({}) => {
    console.log('🍂 ae1 after test');
  });
});

function myLog(): string {
  return '🌳 f1 Hello from function';
}

// Result:

// 1. test with fixture
// [pw-ex] › ex-fixtures\L08-fixtures-vs-before-each\ex1-fixture-and-before.fixtures.spec.ts:19:1 › ex1.1 test execute fixture
// 🌱 f2.1 Fixture before test
// 🧪 t1 test my fixture executed
// 🌳 f1 hello
// 🌳 f2.2 Hello from fixture
// 🍂 f2.3 Fixture after test
//   1 passed (1.1s)

// 2. test without fixture
// [pw-ex] › ex-fixtures\L08-fixtures-vs-before-each\ex1-fixture-and-before.fixtures.spec.ts:33:7 › ex1.2 test without fixture › ex1.2 test with before each
// 🌱 be1 before test
// 🧪 t2 test my code executed
// 🌳 be1 hello
// 🌳 f1 Hello from function
// 🍂 ae1 after test
//   1 passed (1.1s)

// Summary:
// - fixture helps to define complex flow
// - fixture is portable and can be reused
// - before each is more flexible and can be used in more complex scenarios
// - before each is provide transparency and is more readable
