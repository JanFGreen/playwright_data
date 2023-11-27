// Example of using import fixtures from other file

import { myTestColor as test } from './fixtures/f1-color.fixture';

test('ex1.1 test execute external fixture', async ({ color }) => {
  console.log('🧪 t1 test my fixture');
  console.log(color);
});
