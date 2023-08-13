import { test, expect } from '@playwright/test';
import {LazadaAPI} from '../index';


let code;

test('Test Login', async ({ page }) => {
  const url = LazadaAPI.auth.authURL();
  console.log(url);
  await page.goto(url);

  const countrySelector = await page.locator('#country > span');
  await countrySelector.click();
  await page.waitForTimeout(100);
  await page.locator('body > div:nth-child(11) > div > div > ul > li:nth-child(3)').click();
  await page.waitForTimeout(100);
  await page.type('#fm-login-id', process.env.TEST_ACCOUNT as string);
  await page.waitForTimeout(100);
  await page.type('#fm-login-password', process.env.TEST_PASSWORD as string);

  await page.locator('#fm-login-submit').click();
  console.log(page.url());
  await page.waitForNavigation();
  const searchParams = new URLSearchParams(page.url().substring(page.url().indexOf('?')));
  code = searchParams.get('code');
  expect(typeof code === 'string').toBeTruthy();
  if (code) {
    const resultAccessToken = await LazadaAPI.api.GenerateAccessToken({ code });
    console.log(resultAccessToken);
    expect(resultAccessToken.access_token ? true : false).toBeTruthy();
  }
});
