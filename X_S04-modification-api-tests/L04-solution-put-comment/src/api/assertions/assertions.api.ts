import { Headers } from '@_src/api/models/headers.api.models';
import { expect } from '@_src/ui/fixtures/merge.fixture';
import { APIRequestContext } from '@playwright/test';

export async function expectGetResponseStatus(
  request: APIRequestContext,
  url: string,
  expectedStatusCode: number,
  headers?: Headers,
): Promise<void> {
  const responseArticleGet = await request.get(url, { headers });

  expect(
    responseArticleGet.status(),
    `expected status code ${expectedStatusCode}, and received ${responseArticleGet.status()}`,
  ).toBe(expectedStatusCode);
}
