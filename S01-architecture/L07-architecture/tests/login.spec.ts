import { LoginPage } from '../src/pages/login.page';
import { WelcomePage } from '../src/pages/welcome.page';
import { loginuser1 } from '../src/test-data/user.data';
import { expect, test } from '@playwright/test';

test('Login with correct credentials @GAD_R02_01', async ({ page }) => {
  //Arange
  const loginPage = new LoginPage(page);
  // const email = 'Moses.Armstrong@Feest.ca';
  // const password = 'test1';

  // Move data to test data + interface reduce imports
  // const userLoginData = {
  //   email: 'Moses.Armstrong@Feest.ca',
  //   password: 'test1',
  // };

  //Act
  await loginPage.goto();
  await loginPage.login(loginuser1);

  const welcomePage = new WelcomePage(page);
  const title = await welcomePage.title();

  //Assert
  expect(title).toContain(`Welcome`);
});
