import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { getAuthorizationHeader } from '@_src/api/factories/authorization-header.api.factory';
import { createCommentWithApi } from '@_src/api/factories/comment-create.api.factory';
import { prepareCommentPayload } from '@_src/api/factories/comment-payload.api.factory';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrls } from '@_src/api/utils/api.util';
import { expect, test } from '@_src/ui/fixtures/merge.fixture';

test.describe('Verify comments create operations @api @comment @create', () => {
  let articleId: number;
  let headers: Headers;

  test.beforeAll('create an article', async ({ request }) => {
    headers = await getAuthorizationHeader(request);

    const articleResponse = await createArticleWithApi(request, headers);
    const articleJson = await articleResponse.json();
    articleId = articleJson.id;
  });

  test('should not create an comment without a logged-in user @GAD-R08-04', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 401;
    const commentData = prepareCommentPayload(articleId);

    // Arrange
    const response = await request.post(apiUrls.commentsUrl, {
      data: commentData,
    });

    // Assert
    expect(response.status()).toBe(expectedStatusCode);
  });

  test('should create a comment with logged-in user @GAD-R08-04', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 201;
    const commentData = prepareCommentPayload(articleId);

    // Act
    const responseComment = await createCommentWithApi(
      request,
      headers,
      articleId,
      commentData,
    );

    // Assert
    const actualResponseStatus = responseComment.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    const comment = await responseComment.json();
    expect.soft(comment.body).toEqual(commentData.body);
  });

  test('should create a comment with modification of nonexistent id logged-in user @GAD-R08-06', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 201;
    const commentData = prepareCommentPayload(articleId);

    // Act
    const responseComment = await request.put(
      `${apiUrls.commentsUrl}/${new Date().valueOf()}`,
      {
        headers,
        data: commentData,
      },
    );

    // Assert
    const actualResponseStatus = responseComment.status();
    expect
      .soft(
        actualResponseStatus,
        `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      )
      .toBe(expectedStatusCode);

    const commentJson = await responseComment.json();
    expect.soft(commentJson.body).toEqual(commentData.body);
  });
});
