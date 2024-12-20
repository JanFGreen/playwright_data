import { ArticlePayload } from '@_src/api/models/article.api.model';
import { prepareRandomArticle } from '@_src/ui/factories/article.factory';

export function prepareArticlePayload(): ArticlePayload {
  const randomArticleData = prepareRandomArticle();
  const articleData = {
    title: randomArticleData.title,
    body: randomArticleData.body,
    date: '2024-01-30T15:44:31Z',
    image:
      '.\\data\\images\\256\\tester-app_9f26eff6-2390-4460-8829-81a9cbe21751.jpg',
  };
  return articleData;
}
