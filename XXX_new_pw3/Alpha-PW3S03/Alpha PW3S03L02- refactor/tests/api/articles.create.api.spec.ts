import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { getAuthorizationHeader } from '@_src/api/factories/authorization-header.api.factory';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrls } from '@_src/api/utils/api.util';
import { expect, test } from '@_src/ui/fixtures/merge.fixture';

test.describe('Verify articles create operations @api @articles @create', () => {
  test('should not create an article without a logged-in user @GAD-R08-03', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 401;
    const articleData = prepareArticlePayload();

    // Arrange
    const response = await request.post(apiUrls.articlesUrl, {
      data: articleData,
    });

    // Assert
    expect(response.status()).toBe(expectedStatusCode);
  });

  test.describe('Article  create operations', () => {
    let headers: Headers;

    test.beforeAll('should login', async ({ request }) => {
      headers = await getAuthorizationHeader(request);
    });

    test('should create an article with logged-in user @GAD-R08-03', async ({
      request,
    }) => {
      // Arrange
      const expectedStatusCode = 201;

      // Act
      const articleData = prepareArticlePayload();
      const responseArticle = await createArticleWithApi(
        request,
        headers,
        articleData,
      );

      // Assert
      const actualResponseStatus = responseArticle.status();
      expect(
        actualResponseStatus,
        `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      const articleJson = await responseArticle.json();
      expect.soft(articleJson.title).toEqual(articleData.title);
      expect.soft(articleJson.body).toEqual(articleData.body);
    });

    test('should create an article when making put on nonexisting id logged-in user @GAD-R08-05', async ({
      request,
    }) => {
      // Arrange
      const expectedStatusCode = 201;
      const newArticleData = prepareArticlePayload();

      // Act
      const responseArticleModify = await request.put(
        `${apiUrls.articlesUrl}/${new Date().valueOf()}`,
        {
          data: newArticleData,
          headers,
        },
      );

      // Assert
      const actualResponseStatus = responseArticleModify.status();
      expect
        .soft(
          actualResponseStatus,
          `expected status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
        )
        .toBe(expectedStatusCode);

      // Assert check modified article
      const modifiedArticleJson = await responseArticleModify.json();
      expect.soft(modifiedArticleJson.title).toEqual(newArticleData.title);
      expect.soft(modifiedArticleJson.body).toEqual(newArticleData.body);
    });
  });
});
