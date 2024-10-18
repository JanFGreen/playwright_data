import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { prepareArticlePayload } from '@_src/api/factories/article-payload.api.factory';
import { getAuthorizationHeader } from '@_src/api/factories/authorization-header.api.factory';
import { ArticlePayload } from '@_src/api/models/article.api.model';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrls } from '@_src/api/utils/api.util';
import { expect, test } from '@_src/ui/fixtures/merge.fixture';
import { APIResponse } from '@playwright/test';

test.describe('Verify articles modification operations @api @articles', () => {
  let responseArticle: APIResponse;
  let headers: Headers;
  let articleData: ArticlePayload;

  test.beforeAll('should login', async ({ request }) => {
    headers = await getAuthorizationHeader(request);
  });

  test.beforeEach('create an article', async ({ request }) => {
    articleData = prepareArticlePayload();
    responseArticle = await createArticleWithApi(request, headers, articleData);
  });

  test('should modify an article with logged-in user @GAD-R08-05', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 200;
    const articleJson = await responseArticle.json();
    const articleId = articleJson.id;
    const newArticleData = prepareArticlePayload();

    // Act
    const responseArticleModify = await request.put(
      `${apiUrls.articlesUrl}/${articleId}`,
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
    expect.soft(modifiedArticleJson.title).not.toEqual(articleData.title);
    expect.soft(modifiedArticleJson.body).not.toEqual(articleData.body);
  });

  test('should not modify an article with a non logged-in user @GAD-R08-05', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 401;
    const articleJson = await responseArticle.json();
    const articleId = articleJson.id;
    const newArticleData = prepareArticlePayload();

    // Act
    const responseArticleModify = await request.put(
      `${apiUrls.articlesUrl}/${articleId}`,
      {
        data: newArticleData,
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

    // Assert check non modified article

    const responseArticleNonModified = await request.get(
      `${apiUrls.articlesUrl}/${articleId}`,
    );

    const nonModifiedArticleJson = await responseArticleNonModified.json();
    expect.soft(nonModifiedArticleJson.title).not.toEqual(newArticleData.title);
    expect.soft(nonModifiedArticleJson.body).not.toEqual(newArticleData.body);
    expect.soft(nonModifiedArticleJson.title).toEqual(articleData.title);
    expect.soft(nonModifiedArticleJson.body).toEqual(articleData.body);
  });
});
