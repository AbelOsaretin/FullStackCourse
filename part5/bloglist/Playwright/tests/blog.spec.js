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

  describe("user likes a blog", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("user can like a blog", async ({ page }) => {
      // Create a blog
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByLabel("title").fill("a blog created by playwright");
      await page.getByLabel("author").fill("Daddy Cool");
      await page.getByLabel("url").fill("https://example.com");
      await page.getByRole("button", { name: "create" }).click();

      // Like the blog
      await page
        .getByText("a blog created by playwright Daddy Coolview")
        .getByRole("button", { name: "view" })
        .click();
      await page
        .getByText("a blog created by playwright Daddy Cool")
        .getByRole("button", { name: "like" })
        .click();

      // Verify that the like count has increased
      await page.reload();
      await page.reload();
      await page.reload();

      await page
        .getByText("a blog created by playwright Daddy Coolview")
        .getByRole("button", { name: "view" })
        .click();

      await expect(page.getByText("likes 1")).toBeVisible();
    });
  });

  describe("user deletes a blog", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a user can delete a blog", async ({ page }) => {
      // create a blog
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByLabel("title").fill("a blog created by playwright");
      await page.getByLabel("author").fill("Daddy Cool");
      await page.getByLabel("url").fill("https://example.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(
        page.getByText("a blog created by playwright Daddy Coolview")
      ).toBeVisible();

      await page.reload();
      await page.reload();
      await page.reload();

      // delete the blog
      await page
        .getByText("a blog created by playwright Daddy Coolview")
        .getByRole("button", { name: "view" })
        .click();
      await page
        .getByText("a blog created by playwright Daddy Cool")
        .getByRole("button", { name: "remove" })
        .click();

      page.on("dialog", async (dialog) => {
        // Verify the message displayed in the dialog
        expect(dialog.message()).toContain(
          "Remove blog a blog created by playwright by Daddy Cool"
        );

        // 2. Accept the dialog (equivalent to clicking 'OK')
        await dialog.accept();
      });

      await page.reload();
      await page.reload();
      await page.reload();

      // verify that the blog is deleted
      await expect(
        page.getByText("a blog created by playwright Daddy Coolview")
      ).not.toBeVisible();
    });
  });

  describe("blogs are ordered by likes", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByLabel("username").fill("mluukkai");
      await page.getByLabel("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("blogs are arranged in order according to likes", async ({ page }) => {
      // Create first blog
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByLabel("title").fill("First blog");
      await page.getByLabel("author").fill("Author One");
      await page.getByLabel("url").fill("https://example1.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.getByText("First blog Author Oneview")).toBeVisible();

      // Create second blog
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByLabel("title").fill("Second blog");
      await page.getByLabel("author").fill("Author Two");
      await page.getByLabel("url").fill("https://example2.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.getByText("Second blog Author Twoview")).toBeVisible();

      // Create third blog
      await page.getByRole("button", { name: "new note" }).click();
      await page.getByLabel("title").fill("Third blog");
      await page.getByLabel("author").fill("Author Three");
      await page.getByLabel("url").fill("https://example3.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.getByText("Third blog Author Threeview")).toBeVisible();

      // Like second blog 3 times
      await page
        .getByText("Second blog Author Twoview")
        .getByRole("button", { name: "view" })
        .click();
      await page
        .getByText("Second blog Author Two")
        .getByRole("button", { name: "like" })
        .click();
      await page.waitForTimeout(500);
      await page
        .getByText("Second blog Author Two")
        .getByRole("button", { name: "like" })
        .click();
      await page.waitForTimeout(500);
      await page
        .getByText("Second blog Author Two")
        .getByRole("button", { name: "like" })
        .click();

      // Like third blog 1 time
      await page
        .getByText("Third blog Author Threeview")
        .getByRole("button", { name: "view" })
        .click();
      await page
        .getByText("Third blog Author Three")
        .getByRole("button", { name: "like" })
        .click();

      // Reload to see updated order
      await page.reload();
      await page.reload();
      await page.reload();
      await page.reload();
      await page.reload();
      await page.reload();
      await expect(page.getByText("First blog Author Oneview")).toBeVisible();

      // Get all blog elements
      const blogs = await page.locator(".blog").all();

      // Verify the order: Second blog (3 likes), Third blog (1 like), First blog (0 likes)
      await expect(blogs[0]).toContainText("Second blog");
      await expect(blogs[1]).toContainText("Third blog");
      await expect(blogs[2]).toContainText("First blog");
    });
  });
});
