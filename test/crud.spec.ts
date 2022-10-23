import { expect, test } from "@playwright/test";
import { DBAdapter } from "../src/db/adapter";

test.beforeAll(async () => {
  await DBAdapter.instance.connect();
  await DBAdapter.instance.drop();
});

test.afterAll(async () => {
  await DBAdapter.instance.disconnect();
});

test("should find link", async ({ page }) => {
  await page.goto("/");

  await page.click("text=About");
  await expect(page).toHaveURL("/about");
  await expect(page.locator("h1")).toContainText("About");
});

test("should create a new item", async ({ page }) => {
  await page.goto("/");
  await page.click("text=New");
  await expect(page).toHaveURL("/new");

  await page.type("input[name='name']", "Charlie");

  await page.fill("input[name='age']", "");
  await page.type("input[name='age']", "37");
  await page.fill("input[name='city']", "");
  await page.type("input[name='city']", "Tacoma, WA");

  await page.click("button[type='submit']");

  await expect(page.locator(".card")).toContainText("Charlie");
  await expect(page.locator(".city")).toContainText("Tacoma, WA");
  await expect(page.locator(".city")).not.toContainText("Seattle");
});

test("can update item", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Edit");
  await page.fill("input[name='name']", "");
  await page.type("input[name='name']", "Rutherford");
  await page.click("button[type='submit']");

  await expect(page.locator("h5")).toContainText("Rutherford");
  await expect(page.locator(".city")).toContainText("Tacoma, WA");

  await page.goto("/");
  await expect(page.locator("h5")).toContainText("Rutherford");
});

test("can remove item", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Details");

  await expect(page.locator("h1")).toContainText("Rutherford");

  await page.click("text=Delete");
  await expect(page).toHaveURL("/");
  await expect(page.locator(".empty")).toContainText("No people found");
});
