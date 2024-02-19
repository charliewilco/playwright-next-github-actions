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
	await page.getByRole("link", { name: "New" }).click();
	await page.locator('input[name="name"]').click();
	await page.locator('input[name="name"]').fill("Charlie");
	await page.locator('input[name="name"]').press("Tab");
	await page.locator('input[name="city"]').fill("Tacoma");
	await page.locator('input[name="city"]').press("Tab");
	await page.getByRole("spinbutton").fill("33");
	await page.getByRole("button", { name: "Submit" }).click();
	expect(page.locator("#age")).toContainText("33");
});

test("can update item", async ({ page }) => {
	await page.goto("/");

	await page.getByRole("button", { name: "Edit" }).click();
	await page.locator('input[name="name"]').click();
	await page.locator('input[name="name"]').press("Meta+a");
	await page.locator('input[name="name"]').fill("Rutherford");
	await page.locator('input[name="name"]').press("Tab");
	await page.locator('input[name="city"]').fill("Portland");
	await page.getByRole("button", { name: "Submit" }).click();

	expect(page.locator("h1")).toContainText("Rutherford");
});

test.skip("can remove item", async ({ page }) => {
	await page.goto("/");
	await page.click("text=Details");

	await expect(page.locator("h1")).toContainText("Rutherford");

	await page.click("text=Delete");
	await expect(page).toHaveURL("/");
	await expect(page.locator(".empty")).toContainText("No people found");
});
