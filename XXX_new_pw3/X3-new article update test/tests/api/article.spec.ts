import { prepareArticlePayload } from '@_api/factories/article-payload.api.factory';
import { getAuthorizationHeader } from '@_api/factories/authorization-header.api.factory';
import { ArticlePayload } from '@_api/models/article.api.model';
import { Headers } from '@_api/models/headers.api.model';
import { apiLinks } from '@_api/utils/api.util';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { APIResponse } from '@playwright/test';

test.describe('Verify article update', () => {
  let responseArticle: APIResponse;
  let headers: Headers;
  let articleData: ArticlePayload;

  test.beforeAll('should login', async ({ request }) => {
    headers = await getAuthorizationHeader(request);
  });

  test.beforeEach('create an article', async ({ request }) => {
    articleData = prepareArticlePayload();
    responseArticle = await request.post(apiLinks.articlesUrl, {
      headers,
      data: articleData,
    });

    // Arrange
    const expectedStatusCode = 201;

    // Assert
    const actualResponseStatus = responseArticle.status();
    expect(
      actualResponseStatus,
      `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    const responseArticleData = await responseArticle.json();
    articleData.id = responseArticleData.id;
  });

  test('should update an article with logged-in user @GAD-R08-04', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 200;
    const updatedArticleData = prepareArticlePayload();

    // Act
    const response = await request.put(
      `${apiLinks.articlesUrl}/${articleData.id}`,
      {
        headers,
        data: updatedArticleData,
      },
    );
    const updatedArticleJson = await response.json();

    // Assert
    expect(
      response.status(),
      `Article could not be updated: ${JSON.stringify(updatedArticleJson)}`,
    ).toBe(expectedStatusCode);

    expect.soft(updatedArticleJson.title).toEqual(updatedArticleData.title);
    expect.soft(updatedArticleJson.body).toEqual(updatedArticleData.body);
  });
});
