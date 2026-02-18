import { randomArticleData } from '../../src/factories/article.factory';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { loginuser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/view/add-article.view';
import { expect, test } from '@playwright/test';

test('Login with correct credentials @GAD_R02_01', async ({ page }) => {
  //Arange
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(loginuser1);

  const articlePage = new ArticlesPage(page);
  await articlePage.goto();

  //Act
  await articlePage.addArticleButtonLogged.click();

  const addArticleView = new AddArticleView(page);
  await expect.soft(addArticleView.profileMessage).toBeVisible();

  //const newArticleTitle = 'test title';
  const randomArticle = randomArticleData();

  await addArticleView.createArticle(randomArticle);

  const article = new ArticlePage(page);
  await expect(article.articleTitle).toHaveText(randomArticle.title);
});
