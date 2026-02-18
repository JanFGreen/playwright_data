import { randomArticleData } from '../../src/factories/article.factory';
import { AddArticle } from '../../src/models/article.model';
import { ArticlePage } from '../../src/pages/article.page';
import { ArticlesPage } from '../../src/pages/articles.page';
import { LoginPage } from '../../src/pages/login.page';
import { loginuser1 } from '../../src/test-data/user.data';
import { AddArticleView } from '../../src/view/add-article.view';
import { expect, test } from '@playwright/test';

test.describe('Verify article creation', () => {
  let loginPage: LoginPage;
  let articlePage: ArticlesPage;
  let addArticleView: AddArticleView;
  let randomArticle: AddArticle;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    articlePage = new ArticlesPage(page);
    addArticleView = new AddArticleView(page);

    await loginPage.goto();
    await loginPage.login(loginuser1);
    await articlePage.goto();
    await articlePage.addArticleButtonLogged.click();

    randomArticle = randomArticleData();
  });

  test('Create article with correct data', async ({ page }) => {
    //Arange
    const article = new ArticlePage(page);

    //Act
    await expect.soft(addArticleView.profileMessage).toBeVisible();

    //const newArticleTitle = 'test title';
    await addArticleView.createArticle(randomArticle);

    await expect(article.articleTitle).toHaveText(randomArticle.title);
  });

  test('Create article with empty title', async () => {
    //Arange
    randomArticle.title = '';

    await expect.soft(addArticleView.profileMessage).toBeVisible();

    await addArticleView.createArticle(randomArticle);
    await expect(addArticleView.errorPopup).toHaveText(
      'Article was not created',
    );
  });

  test('Create article with empty body', async () => {
    //Arange
    randomArticle.body = '';

    await expect.soft(addArticleView.profileMessage).toBeVisible();

    await addArticleView.createArticle(randomArticle);
    await expect(addArticleView.errorPopup).toHaveText(
      'Article was not created',
    );
  });
});
