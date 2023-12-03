import { defineConfig, devices } from '@playwright/test';
import { MyCustomOption } from './tests/ex-fixtures/P06-project/ex2-project-advanced-options.fixtures.spec';

interface MyCustomConfig {
  customName: string;
}
// remember to add interface below in <> like 'MyCustomConfig' to use custom option in config
export default defineConfig<MyCustomConfig & MyCustomOption>({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    actionTimeout: 0,
    trace: 'on',
  },
  projects: [
    {
      name: 'pw-ex',
      use: {
        ...devices['Desktop Chrome'],
        // comment below to test with default value form fixture
        customName: '⚙️ L06 ex1-project customName form playwright.config.ts',
        customSurname:
          '⚙️ L06 ex2-project customSurname form playwright.config.ts',
      },
    },
  ],
});
