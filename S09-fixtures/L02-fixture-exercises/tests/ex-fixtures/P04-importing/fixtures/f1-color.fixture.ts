// Standalone fixture1 example
import { test } from '@playwright/test';

export const myTestColor = test.extend<{ color: string }>({
  color: '🌳 f1 RED color',
});
