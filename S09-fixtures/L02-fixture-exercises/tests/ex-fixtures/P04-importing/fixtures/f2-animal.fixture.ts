// Standalone fixture2 example
import { test } from '@playwright/test';

export const myTestAnimal = test.extend<{ animal: string }>({
  animal: '🌳 f2 CAT animal',
});
