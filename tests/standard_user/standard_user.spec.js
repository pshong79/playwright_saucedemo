// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('standard_user', () => {
  test.beforeEach(async ({ page }) => {
    let username = 'standard_user';
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

  test('view product details', async ({ page }) => {
    // Product = Sauce Labs Fleece Jacket
    let product = /Sauce Labs Fleece Jacket/;
    let product_description = /It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office./;
    
    await page.locator('#item_5_title_link').click();

    await expect(page.locator('.inventory_details_name')).toHaveText(product);
    await expect(page.locator('.inventory_details_desc')).toHaveText(product_description);
  });

  test('add product to cart by product details', async ({ page }) => {
    // Product = Test.allTheThings() T-Shirt (Red)
    let product = 'Test.allTheThings() T-Shirt (Red)';

    await page.locator('#item_3_title_link').click();
    await expect(page.locator('.inventory_details_name')).toHaveText(product);
    
    await page.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveText(/Remove/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText(/1/);
  });

  test('add product to cart by inventory page', async ({ page }) => {
    // Product = Sauce Labs Bike Light
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await expect(page.locator('#remove-sauce-labs-bike-light')).toHaveText(/Remove/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText(/1/);
  });

  test('checkout', async ({ page }) => {
    let product = 'Sauce Labs Bike Light';
    let firstname = 'John';
    let lastname = 'Smith';
    let zipcode = '12345';

    // Test setup: Add product (Sauce Labs Bike Light) to cart
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await expect(page.locator('#remove-sauce-labs-bike-light')).toHaveText(/Remove/);
    await expect(page.locator('.shopping_cart_badge')).toHaveText(/1/);
    await page.locator('.shopping_cart_link').click();

    // Could just assert page by URL if there are other test verifying the contents of the page
    // await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('.title')).toHaveText(/Your Cart/);
    await expect(page.locator('.inventory_item_name')).toHaveText(product);

    await page.getByRole('button', { name: 'Checkout' }).click();

    // Same here - could assert page by URL if other test(s) verify contents of page
    // await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator('.title')).toHaveText(/Checkout: Your Information/);
    await page.locator('#first-name').fill(firstname);
    await page.locator('#last-name').fill(lastname);
    await page.locator('#postal-code').fill(zipcode);

    await page.locator('#continue').click();

    // Same here - could assert page by URL if other test(s) verify contents of page
    // await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('.title')).toHaveText(/Checkout: Overview/);
    await expect(page.locator('.inventory_item_name')).toHaveText(product); 
    
    await page.locator('#finish').click();

    // Same here - could assert page by URL if other test(s) verify contents of page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('.title')).toHaveText(/Checkout: Complete!/);
    await expect(page.locator('h2.complete-header')).toHaveText('Thank you for your order!');

    await page.getByRole('button', {name: 'Back Home' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});
