// Example of exporting expect with fixture

import { mergeTests } from '@playwright/test';
import { myTestColor } from './f1-color.fixture';
import { myTestAnimal } from './f2-animal.fixture';

export const test = mergeTests(myTestColor, myTestAnimal);

// ex4 - exporting expect with fixture
export { expect } from '@playwright/test';
