import { LoginUser } from '../models/user.model';
import { BasePage } from './base.page';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  url = '/login/';
  loginFiled: Locator;
  passwordField: Locator;
  loginButton: Locator;

  profileMessage = this.page.getByTestId('hello');

  constructor(page: Page) {
    super(page);
    this.loginFiled = page.getByRole('textbox', { name: 'Enter User Email' });
    this.passwordField = page.getByRole('textbox', { name: 'Enter Password' });
    this.loginButton = page.getByRole('button', { name: 'LogIn' });
  }

  //   async login(email: string, password: string): Promise<void> {
  //     await this.loginFiled.fill(email);
  //     await this.passwordField.fill(password);
  //     await this.loginButton.click();
  //   }

  async login(userLoginData: LoginUser): Promise<void> {
    await this.loginFiled.fill(userLoginData.userEmail);
    await this.passwordField.fill(userLoginData.userPassword);
    await this.loginButton.click();
  }
}
