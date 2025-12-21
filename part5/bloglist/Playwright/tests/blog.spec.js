// @ts-check
import { test, expect, describe, beforeEach } from '@playwright/test';


describe('Playwright blog homepage', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });


test('Login form is shown', async ({ page }) => {

  // Expect a title "to contain" a substring.
  await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible();
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

});