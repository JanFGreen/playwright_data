import { prepareUserPayload } from '@_src/api/factories/user-register.factory';
import { expect, test } from '@_src/merge.fixture';
import { nonStandardInputs } from 'tests/api/data/nonStandardInputs';

test.describe('User Registration Validation', () => {
  test('verify if user can be created via API', async ({ usersRequest }) => {
    // Arrange
    const expectedStatusCode = 201;
    const usersData = prepareUserPayload();

    // Arrange
    const response = await usersRequest.post(usersData);

    // Assert
    expect(response.status()).toBe(expectedStatusCode);
  });

  nonStandardInputs.forEach((input) => {
    test(`verify if user can be created via API with non standard input: ${input}`, async ({
      usersRequest,
    }) => {
      // Arrange
      const usersData = prepareUserPayload();
      usersData.firstname = input;

      // Arrange
      const response = await usersRequest.post(usersData);

      // Assert
      await expect.soft(response).toBeOK();
    });
  });
});
