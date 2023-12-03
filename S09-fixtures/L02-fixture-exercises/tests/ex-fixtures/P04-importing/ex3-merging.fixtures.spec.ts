// Example of using externally merged fixtures

import { test } from './fixtures/f3-merge.fixture';

test('ex3.1 test merged external fixtures', async ({ color, animal }) => {
  console.log('🧪 t1 merged external fixtures');
  console.log(color);
  console.log(animal);
});
