import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173/';

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  //獲得登入連結
  await page.getByRole('link', { name: '登入' }).click();

  await expect(page.getByRole('heading', { name: '登入' })).toBeVisible();

  await page.locator('[name=email]').fill('test11@gmail.com');
  await page.locator('[name=password]').fill('test11');

  await page.getByRole('button', { name: '登入' }).click();

  await expect(page.getByText('登入成功')).toBeVisible();
});

test('允許用戶添加酒店', async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name='name']").fill('測試名稱');
  await page.locator("[name='city']").fill('測試城市');
  await page.locator("[name='description']").fill('測試描述....');
  await page.locator("[name='pricePerNight']").fill('5000');
  await page.selectOption('select[name="starRating"]', '3');
  await page.getByText('汽車旅館').check();
  await page.getByLabel('免費WiFi').check();
  await page.getByLabel('停車處').check();

  await page.locator('[name="adultCount"]').fill('2');
  await page.locator('[name="childCount"]').fill('1');

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'images', 'test1.avif'),
    path.join(__dirname, 'images', 'test2.avif'),
  ]);

  await page.getByRole('button', { name: '保存' }).click();
  await expect(page.getByText('已保存飯店!')).toBeVisible();
});

test('應該顯示飯店', async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText('e2e測試名稱').first()).toBeVisible();
  await expect(page.getByText('測試描述....').first()).toBeVisible();
  await expect(page.getByText('測試城市').first()).toBeVisible();
  await expect(page.getByText('汽車旅館').first()).toBeVisible();
  await expect(page.getByText('5000 每晚').first()).toBeVisible();
  await expect(page.getByText('2 成人, 1 兒童').first()).toBeVisible();
  await expect(page.getByText('3 星級').first()).toBeVisible();

  await expect(
    page.getByRole('link', { name: '詳細資訊' }).first()
  ).toBeVisible();
  await expect(page.getByRole('link', { name: '新增飯店' })).toBeVisible();
});

test('可以編輯飯店', async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole('link', { name: '詳細資訊' }).first().click();

  await page.waitForSelector('[name="name"]', { state: 'attached' });
  await expect(page.locator('[name="name"]')).toHaveValue('e2e測試名稱');
  await page.locator('[name="name"]').fill('e2e測試名稱1');
  await page.getByRole('button', { name: '保存' }).click();
  await expect(page.getByText('更新成功')).toBeVisible();

  await page.getByRole('link', { name: '詳細資訊' }).first().click();
  await expect(page.locator('[name="name"]')).toHaveValue('e2e測試名稱1');
  await page.locator('[name="name"]').fill('e2e測試名稱');
  await page.getByRole('button', { name: '保存' }).click();
});
