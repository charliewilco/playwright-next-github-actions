import { expect, test } from "@playwright/test";

test("should find link", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.waitForSelector("[data-testid='ABOUT_LINK']");
  await page.click("[data-testid='ABOUT_LINK']");

  await page.waitForSelector("[data-testid='ABOUT_TITLE']");
});

test("should create a new item", async ({ page }) => {
  await page.waitForSelector("[data-testid='NEW_LINK'");
  await page.click("[data-testid='NEW_LINK'");

  await page.waitForSelector("[data-testid='NEW_FORM']");

  await page.waitForSelector("input[name='name']");
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

  await page.waitForSelector("[data-testid='LIST_HOME']");
  await page.waitForSelector("[data-testid='PERSON_CARD']");
});
