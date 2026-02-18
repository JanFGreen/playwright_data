import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class ArticlePage extends BasePage {
  url = '/articles.html';
  mainMenu = new MainMenuComponent(this.page);
  articleTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.articleTitle = page.getByTestId('article-title');
  }
}
