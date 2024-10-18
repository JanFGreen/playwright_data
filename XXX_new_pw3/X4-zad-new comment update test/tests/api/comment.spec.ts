import { prepareArticlePayload } from '@_api/factories/article-payload.api.factory';
import { getAuthorizationHeader } from '@_api/factories/authorization-header.api.factory';
import { prepareCommentPayload } from '@_api/factories/comment-payload.api.factory';
import { ArticlePayload } from '@_api/models/article.api.model';
import { CommentPayload } from '@_api/models/comment.api.model';
import { Headers } from '@_api/models/headers.api.model';
import { apiLinks } from '@_api/utils/api.util';
import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Verify comment update', () => {
  let headers: Headers;
  let articleData: ArticlePayload;
  let commentData: CommentPayload;

  test.beforeAll('should login', async ({ request }) => {
    headers = await getAuthorizationHeader(request);
  });

  test.beforeEach('create an article and comment', async ({ request }) => {
    headers = await getAuthorizationHeader(request);
    articleData = prepareArticlePayload();

    const responseArticle = await request.post(apiLinks.articlesUrl, {
      headers,
      data: articleData,
    });

    // Arrange
    const expectedStatusCode = 201;

    // Assert
    const actualArticleResponseStatus = responseArticle.status();
    expect(
      actualArticleResponseStatus,
      `expected status code ${expectedStatusCode}, and received ${actualArticleResponseStatus}`,
    ).toBe(expectedStatusCode);

    const responseArticleData = await responseArticle.json();
    articleData.id = responseArticleData.id;

    commentData = prepareCommentPayload(articleData.id);
    const responseComment = await request.post(apiLinks.commentsUrl, {
      headers,
      data: commentData,
    });

    // Assert
    const actualCommentResponseStatus = responseComment.status();
    expect(
      actualCommentResponseStatus,
      `expected status code ${expectedStatusCode}, and received ${actualCommentResponseStatus}`,
    ).toBe(expectedStatusCode);

    const responseCommentData = await responseComment.json();
    commentData.id = responseCommentData.id;
  });

  test('should update a comment with logged-in user @GAD-R08-04', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 200;
    const updatedCommentData = prepareCommentPayload(articleData.id);

    // Act
    const response = await request.put(
      `${apiLinks.commentsUrl}/${commentData.id}`,
      {
        headers,
        data: updatedCommentData,
      },
    );
    const updatedCommentJson = await response.json();

    // Assert
    expect(
      response.status(),
      `Comment could not be updated: ${JSON.stringify(updatedCommentJson)}`,
    ).toBe(expectedStatusCode);

    expect.soft(updatedCommentJson.body).toEqual(updatedCommentData.body);
  });
});
