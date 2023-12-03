// Example of own fixtures with function initialized eagerly and lazily
// Use debugging to see the difference between eager and lazy initialization
import { test } from '@playwright/test';

const myTest = test.extend({
  eager: async ({}, use) => {
    console.log('🌱 f1.1 eager function initialized');
    const human = { name: '🌱 Ewa', time: Date.now() };
    await use(human);
  },
  lazy: async ({}, use) => {
    console.log('🌱 f2.1 lazy fixture initialized');
    function human(): { name: string; time: number } {
      console.log('🌳 f2.2 name fixture function');
      return { name: '🌳 Ewa', time: Date.now() };
    }
    await use(human);
  },
  // Same as 'lazy' but with arrow function initialization
  lazyArrow: async ({}, use) => {
    console.log('🌱 f3.1 lazy fixture initialized');
    const human = (): { name: string; time: number } => {
      console.log('🌳 f3.2 name fixture function');
      return { name: '🌳 Ewa', time: Date.now() };
    };
    await use(human);
  },
});

myTest('ex1.1 test execute fixture eager', async ({ eager }) => {
  console.log('🧪 t2 before using my fixture');
  // add breakpoint below to debug fixture function usage
  console.log(`🧪 t2 eager name ${eager.name}`);
  console.log(`🧪 t2 eager time ${eager.time}`);
});

myTest('ex1.2 test execute fixture lazy', async ({ lazy }) => {
  console.log('🧪 t2 before using my fixture');
  const human = lazy();
  // add breakpoint below to debug fixture function usage
  console.log(`🧪 t2 lazy name ${human.name}`);
  console.log(`🧪 t2 lazy time ${human.time}`);
});

myTest('ex1.3 test execute fixture lazyArrow', async ({ lazyArrow }) => {
  console.log('🧪 t3 before using my fixture');
  const human = lazyArrow();
  // add breakpoint below to debug fixture function usage
  console.log(`🧪 t3 lazyArrow name ${human.name}`);
  console.log(`🧪 t3 lazyArrow time ${human.time}`);
});
