import { expect, test } from "@playwright/test";
import { dbConnect, dbDisconnect, dbDrop } from "../db/connect";

test.beforeAll(async () => {
  await dbConnect();
  await dbDrop();
});

test.afterAll(async () => {
  await dbDisconnect();
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

  await page.evaluate(() => {
    const input = document.querySelector<HTMLInputElement>("input[name='age']");

    if (input) {
      input.value = "";
    }
  });
  await page.type("input[name='age']", "37");
  await page.type("input[name='city']", "Tacoma, WA");

  await page.click("button[type='submit']");

  await expect(page.locator("[data-testid='PERSON_CARD']")).toContainText(
    "Charlie"
  );
});
