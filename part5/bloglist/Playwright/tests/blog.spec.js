// @ts-check
import { test, expect, describe, beforeEach } from "@playwright/test";

describe("Playwright blog homepage", () => {
  beforeEach(async ({ page, request }) => {
    // Reset the backend state
    await request.post("http://localhost:3003/api/testing/reset");

    // Create a user
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    // Go to app homepage
    await page.goto("http://localhost:5173/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Log in to application" })
    ).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByRole("heading", { name: "blogs" })).toBeVisible();

      await expect(page.getByText("Matti Luukkainen logged-in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Wrong username or password")).toBeVisible();
    });
  });

  // test('get started link', async ({ page }) => {
  //   await page.goto('https://playwright.dev/');

  //   // Click the get started link.
  //   await page.getByRole('link', { name: 'Get started' }).click();

  //   // Expects page to have a heading with the name of Installation.
  //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  // });
});
