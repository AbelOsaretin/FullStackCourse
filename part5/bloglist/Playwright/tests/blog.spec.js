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

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByLabel("title").fill("a blog created by playwright");
      await page.getByLabel("author").fill("Daddy Cool");
      await page.getByLabel("url").fill("https://example.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText("a blog created by playwright Daddy Coolview")
      ).toBeVisible();
    });
  });
});
