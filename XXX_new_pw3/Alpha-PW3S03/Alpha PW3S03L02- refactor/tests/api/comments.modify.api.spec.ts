import { createArticleWithApi } from '@_src/api/factories/article-create.api.factory';
import { getAuthorizationHeader } from '@_src/api/factories/authorization-header.api.factory';
import { createCommentWithApi } from '@_src/api/factories/comment-create.api.factory';
import { prepareCommentPayload } from '@_src/api/factories/comment-payload.api.factory';
import { CommentPayload } from '@_src/api/models/comment.api.model';
import { Headers } from '@_src/api/models/headers.api.model';
import { apiUrls } from '@_src/api/utils/api.util';
import { expect, test } from '@_src/ui/fixtures/merge.fixture';
import { APIResponse } from '@playwright/test';

test.describe('Verify comments modify operations @api @comments @delete', () => {
  let articleId: number;
  let headers: Headers;
  let responseComment: APIResponse;
  let commentData: CommentPayload;

  test.beforeAll('create an article', async ({ request }) => {
    headers = await getAuthorizationHeader(request);

    const responseArticle = await createArticleWithApi(request, headers);
    const articleJson = await responseArticle.json();
    articleId = articleJson.id;
  });

  test.beforeEach('create a comment', async ({ request }) => {
    commentData = prepareCommentPayload(articleId);
    responseComment = await createCommentWithApi(
      request,
      headers,
      articleId,
      commentData,
    );
  });

  test.describe('Verify comments modify with PUT', () => {
    test('should modify a comment with PUT logged-in user @GAD-R08-06', async ({
      request,
    }) => {
      // Arrange
      const expectedStatusCode = 200;
      const newCommentData = prepareCommentPayload(articleId);
      const comment = await responseComment.json();

      // Act
      const responseCommentModify = await request.put(
        `${apiUrls.commentsUrl}/${comment.id}`,
        {
          headers,
          data: newCommentData,
        },
      );

      // Assert
      const actualResponseStatus = responseCommentModify.status();
      expect(
        actualResponseStatus,
        `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      const modifiedCommentJson = await responseCommentModify.json();
      expect.soft(modifiedCommentJson.body).toEqual(newCommentData.body);
      expect.soft(modifiedCommentJson.body).not.toEqual(commentData.body);
    });

    test('should not modify a comment with PUT a non logged-in user @GAD-R08-06', async ({
      request,
    }) => {
      // Arrange
      const expectedStatusCode = 401;
      const newCommentData = prepareCommentPayload(articleId);
      const comment = await responseComment.json();

      // Act
      const responseCommentModify = await request.put(
        `${apiUrls.commentsUrl}/${comment.id}`,
        {
          data: newCommentData,
        },
      );

      // Assert
      const actualResponseStatus = responseCommentModify.status();
      expect
        .soft(
          actualResponseStatus,
          `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
        )
        .toBe(expectedStatusCode);

      const responseCommentNonModified = await request.get(
        `${apiUrls.commentsUrl}/${comment.id}`,
      );
      const nonModifiedCommentJson = await responseCommentNonModified.json();
      expect.soft(nonModifiedCommentJson.body).not.toEqual(newCommentData.body);
      expect.soft(nonModifiedCommentJson.body).toEqual(commentData.body);
    });
  });

  test.describe('Verify comments modify with PATCH', () => {
    test('should modify a comment with PATCH logged-in user @GAD-R08-06', async ({
      request,
    }) => {
      // Arrange
      const expectedStatusCode = 200;
      const newCommentDate = prepareCommentPayload(articleId).date;
      const comment = await responseComment.json();

      // Act
      const responseCommentModify = await request.patch(
        `${apiUrls.commentsUrl}/${comment.id}`,
        {
          headers,
          data: { date: newCommentDate },
        },
      );

      // Assert
      const actualResponseStatus = responseCommentModify.status();
      expect(
        actualResponseStatus,
        `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
      ).toBe(expectedStatusCode);

      const modifiedCommentJson = await responseCommentModify.json();
      expect.soft(modifiedCommentJson.date).toEqual(newCommentDate);
      expect.soft(modifiedCommentJson.body).toEqual(commentData.body);
    });

    test('should not modify a comment with PATCH a non logged-in user @GAD-R08-06', async ({
      request,
    }) => {
      // Arrange
      const expectedStatusCode = 401;
      const newCommentDate = prepareCommentPayload(articleId).date;
      const comment = await responseComment.json();

      // Act
      const responseCommentModify = await request.patch(
        `${apiUrls.commentsUrl}/${comment.id}`,
        {
          data: { date: newCommentDate },
        },
      );

      // Assert
      const actualResponseStatus = responseCommentModify.status();
      expect
        .soft(
          actualResponseStatus,
          `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
        )
        .toBe(expectedStatusCode);

      const responseCommentNonModified = await request.get(
        `${apiUrls.commentsUrl}/${comment.id}`,
      );
      const nonModifiedCommentJson = await responseCommentNonModified.json();
      expect.soft(nonModifiedCommentJson.date).not.toEqual(newCommentDate);
      expect.soft(nonModifiedCommentJson.body).toEqual(commentData.body);
    });

    test('should not modify a comment with PATCH with nonexisting field @GAD-R08-06', async ({
      request,
    }) => {
      // Arrange
      const expectedStatusCode = 422;
      const comment = await responseComment.json();

      const nonExistingFieldName = 'hello';
      const payload = {};
      payload[nonExistingFieldName] = new Date().valueOf();

      const expectedErrorMessage = `One of field is invalid (empty, invalid or too long) or there are some additional fields: Field validation: \"${nonExistingFieldName}\" not in [id,user_id,article_id,body,date]`;

      // Act
      const responseCommentModify = await request.patch(
        `${apiUrls.commentsUrl}/${comment.id}`,
        {
          headers,
          data: payload,
        },
      );

      // Assert
      const actualResponseStatus = responseCommentModify.status();
      expect
        .soft(
          actualResponseStatus,
          `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
        )
        .toBe(expectedStatusCode);

      const responseCommentModifyJson = await responseCommentModify.json();
      expect
        .soft(await responseCommentModifyJson.error.message)
        .toContain(expectedErrorMessage);
    });
  });
});
