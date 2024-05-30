import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test('允許用戶登入', async ({ page }) => {
  await page.goto(UI_URL);

  //獲得登入連結
  await page.getByRole('link', { name: '登入' }).click();

  await expect(page.getByRole('heading', { name: '登入' })).toBeVisible();

  await page.locator('[name=email]').fill('test11@gmail.com');
  await page.locator('[name=password]').fill('test11');

  await page.getByRole('button', { name: '登入' }).click();

  await expect(page.getByText('登入成功')).toBeVisible();
  await expect(page.getByRole('link', { name: '我的預訂' })).toBeVisible();
  await expect(page.getByRole('link', { name: '我的飯店' })).toBeVisible();
  await expect(page.getByRole('button', { name: '登出' })).toBeVisible();
});

test('允許用戶註冊', async ({ page }) => {
  const testEmail = `test_email_${
    Math.floor(Math.random() * 90000) + 10000
  }@gmail.com`;
  await page.goto(UI_URL);

  await page.getByRole('link', { name: '登入' }).click();
  await page.getByRole('link', { name: '點擊此處註冊' }).click();
  await expect(
    page.getByRole('heading', { name: '建立一個帳戶' })
  ).toBeVisible();

  await page.locator('[name=firstName]').fill('test_firstName');
  await page.locator('[name=lastName]').fill('test_lastName');
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill('test_password');
  await page.locator('[name=confirmPassword]').fill('test_password');

  await page.getByRole('button', { name: '建立帳號' }).click();

  await expect(page.getByText('註冊成功')).toBeVisible();
  await expect(page.getByRole('link', { name: '我的預訂' })).toBeVisible();
  await expect(page.getByRole('link', { name: '我的飯店' })).toBeVisible();
  await expect(page.getByRole('button', { name: '登出' })).toBeVisible();
});
