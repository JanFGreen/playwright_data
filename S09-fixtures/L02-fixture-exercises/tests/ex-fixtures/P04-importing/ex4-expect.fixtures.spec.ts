// Example of using expect and externally merged fixtures

import { expect, test } from './fixtures/f4-expect.fixture';

test('ex4.1 test use expect form my fixture', async ({ color }) => {
  console.log('🧪 t1 test my fixture with expect');

  const expectedColor = '🌳 f1 RED color';
  expect(color).toBe(expectedColor);
});
