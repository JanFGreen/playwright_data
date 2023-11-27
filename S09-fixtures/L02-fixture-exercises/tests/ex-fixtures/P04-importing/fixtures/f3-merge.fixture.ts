// Example of merging fixtures

import { mergeTests } from '@playwright/test';
import { myTestColor } from './f1-color.fixture';
import { myTestAnimal } from './f2-animal.fixture';

export const test = mergeTests(myTestColor, myTestAnimal);
