import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { expect, test } from '@playwright/test';

test('Login with correct credentials @GAD_R02_01', async ({ page }) => {
  //Arange
  const loginPage = new LoginPage(page);
  const email = 'Moses.Armstrong@Feest.ca';
  const password = 'test1';

  //Act
  await loginPage.goto();
  await loginPage.login(email, password);

  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.getTitle();

  //Assert
  expect(title).toContain(`Welcome`);
});
