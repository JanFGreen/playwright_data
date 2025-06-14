/* eslint-disable no-console */
import { FullConfig, request } from '@playwright/test';

async function globalTeardown(config: FullConfig): Promise<void> {
  console.log('❌❤️ Global Teardown');
  const baseURL = config.projects[0].use.baseURL;
  const requestContext = await request.newContext();

  const urlEmptyDB = `${baseURL!}/api/restoreEmptyDB`;

  try {
    const response = await requestContext.get(urlEmptyDB);
    console.log('Response ok?', response.ok());
  } catch {
    throw new Error(
      `❌ Failed to connect to ${urlEmptyDB} 
      check if the application is running and the baseUrl is correct`,
    );
  }
}

export default globalTeardown;
