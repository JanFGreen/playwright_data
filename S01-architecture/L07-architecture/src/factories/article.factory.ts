import { AddArticle } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/en';

export function randomArticleData(): AddArticle {
  const registerUserData: AddArticle = {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(5),
  };

  return registerUserData;
}
