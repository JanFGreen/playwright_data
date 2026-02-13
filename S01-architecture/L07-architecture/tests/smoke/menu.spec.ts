import { MainMenuComponent } from '../../src/components/main-menu.component';
import { ArticlesPage } from '../../src/pages/articles.page';
import { CommentsPage } from '../../src/pages/comments.page';
import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Verify menu main buttons', () => {
  test('comments button navigates to comments page @GAD-R01-03', async ({
    page,
  }) => {
    //Arange
    const articlesPage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    //Act
    //const mainMenu = new MainMenuComponent(page);
    await articlesPage.goto();
    await articlesPage.mainMenu.commentsButton.click();

    //Assert
    const title = await commentsPage.getTitle();
    expect(title).toContain('Comments');
  });

  test('articles button navigates to articles page @GAD-R01-04', async ({
    page,
  }) => {
    //Arange
    const articlesPage = new ArticlesPage(page);
    const commentsPage = new CommentsPage(page);

    //Act
    //const mainMenu = new MainMenuComponent(page);
    await commentsPage.goto();
    await commentsPage.mainMenu.articlesButton.click();

    //Assert
    const title = await articlesPage.getTitle();
    expect(title).toContain('Articles');
  });

  test('home page button navigates to home page @GAD-R01-05', async ({
    page,
  }) => {
    //Arange
    const articlesPage = new ArticlesPage(page);
    const homePage = new HomePage(page);

    //Act
    //const mainMenu = new MainMenuComponent(page);
    await articlesPage.goto();
    await articlesPage.mainMenu.homeButton.click();

    //Assert
    const title = await homePage.getTitle();
    expect(title).toContain('GAD');
  });
});
