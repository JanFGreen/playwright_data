import { AddArticle } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomArticleData(): AddArticle {
  const registerArticleData: AddArticle = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(5),
  };

  return registerArticleData;
}

export function randomArticleDataWithParams(
  titleLength: number,
  bodyLength: number,
): AddArticle {
  const registerArticleData: AddArticle = {
    title: faker.string.alpha(titleLength),
    body: faker.lorem.paragraph(bodyLength),
  };

  return registerArticleData;
}
