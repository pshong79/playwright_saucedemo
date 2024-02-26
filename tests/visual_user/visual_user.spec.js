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
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com');
  });

  test('verify visual layout of inventory page', async ({ page }) => {
    await expect(page).toHaveScreenshot('image.png');
  });
});