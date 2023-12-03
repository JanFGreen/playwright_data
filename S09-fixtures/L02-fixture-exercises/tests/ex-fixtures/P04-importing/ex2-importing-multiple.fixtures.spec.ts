// Example of merging fixtures

import { mergeTests } from '@playwright/test';
import { myTestColor } from './fixtures/f1-color.fixture';
import { myTestAnimal } from './fixtures/f2-animal.fixture';

const test = mergeTests(myTestColor, myTestAnimal);

test('ex2.1 test merge fixtures', async ({ color, animal }) => {
  console.log('🧪 t1 multiple fixtures');
  console.log(color);
  console.log(animal);
});
