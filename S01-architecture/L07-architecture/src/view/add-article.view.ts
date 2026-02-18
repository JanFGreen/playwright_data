import { AddArticle } from '../models/article.model';
import { Locator, Page } from '@playwright/test';

export class AddArticleView {
  articleTitle: Locator;
  articleBody: Locator;
  saveArticle: Locator;

  profileMessage: Locator;

  constructor(private page: Page) {
    this.articleTitle = page.getByTestId('title-input');
    this.articleBody = page.getByTestId('body-text');
    this.saveArticle = page.getByTestId('save');
    this.profileMessage = page.getByRole('heading', { name: 'Add New Entry' });
  }

  async createArticle(article: AddArticle): Promise<void> {
    await this.articleTitle.fill(article.title);
    await this.articleBody.fill(article.body);
    await this.saveArticle.click();
  }
}
