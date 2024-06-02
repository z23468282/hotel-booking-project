import { test, expect } from '@playwright/test';

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

test('顯示飯店搜尋結果', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder('您要去哪裡 ?').fill('測試');
  await page.getByRole('button', { name: '搜 尋' }).click();

  await expect(page.getByText('家飯店')).toBeVisible();
  await expect(page.getByText('e2e測試名稱')).toBeVisible();
});

test('顯示飯店詳細資訊', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder('您要去哪裡 ?').fill('測試');
  await page.getByRole('button', { name: '搜 尋' }).click();

  await page.getByText('e2e測試名稱').click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole('button', { name: '現在預訂' })).toBeVisible();
});

test('預訂飯店', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder('您要去哪裡 ?').fill('測試');

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split('T')[0];
  await page.getByPlaceholder('選擇退房日期').fill(formattedDate);

  await page.getByRole('button', { name: '搜 尋' }).click();

  await page.getByText('e2e測試名稱').click();
  await page.getByRole('button', { name: '現在預訂' }).click();

  await expect(page.getByText('總費用: $15000')).toBeVisible();

  const stripeFrame = page.frameLocator('iframe').first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill('4242424242424242');
  await stripeFrame.locator('[placeholder="MM / YY"]').fill('10/30');
  await stripeFrame.locator('[placeholder="CVC"]').fill('111');
  await stripeFrame.locator('[placeholder="ZIP"]').fill('11111');

  await page.getByRole('button', { name: '確定預訂' }).click();
  await expect(page.getByText('預訂資料已儲存')).toBeVisible();
});
