// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('visual_user', () => {
  test.beforeEach(async ({ page }) => {
    // On the initial test run, `standard_user` must be used so that the initial, expected image
    // is saved.
    // Then, run the tests using `visual_user`. This will use the expected image saved on the inital run
    // and compare with the image taken during subsequent runs.

    // More information can be found here: https://playwright.dev/docs/test-snapshots and 
    // https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1

    // let username = 'standard_user';
    let username = 'visual_user';
    let password = 'secret_sauce';

    // Go to the starting url before each test.
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com');
  });

  test('visual layout of inventory page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveScreenshot('inventory.png');
  });

  test('visual layout of sauce labs backpack details page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory-item.html?id=4');
    await expect(page).toHaveScreenshot('backpack.png');
  });

  test('visual layout of sauce labs bike light details page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory-item.html?id=0');
    await expect(page).toHaveScreenshot('bike-light.png');
  });

  test('visual layout of sauce labs bolt t-shirt details page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory-item.html?id=1');
    await expect(page).toHaveScreenshot('bolt-tshirt.png');
  });

  test('visual layout of sauce labs fleece jacket details page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory-item.html?id=5');
    await expect(page).toHaveScreenshot('fleece-jacket.png');
  });

  test('visual layout of sauce labs onesie details page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory-item.html?id=2');
    await expect(page).toHaveScreenshot('onesie.png');
  });

  test('visual layout of test.allthethings() t-shirt (red) details page', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory-item.html?id=3');
    await expect(page).toHaveScreenshot('testallthethings-tshirt.png');
  });
});