# Playwright + Next.js Example

![E2E Testing](https://github.com/charliewilco/puppeteer-next-github-actions/workflows/E2E%20Testing/badge.svg)

This is a really simple project that shows the usage building an E2E test with [Playwright](https://playwright.dev/).

This was a reduced test case to see if GitHub Actions could run the E2E tests with the headless browswer; also uses TypeScript and MongoDB.

Install [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

```
brew tap mongodb/brew
```

```
brew install mongodb-community
```

Install the project dependencies:

```
npm install
```

Install playwright:

```
npx playwright install --with-deps
```

Build the project first:

```
npm run build
```

## Notes

Tests are meant to be simple, doesn't focus on doing evaluation for assertion but to see if one of the operations catches and fails to continue.

```ts
test("should find link", async ({ page }) => {
  await page.goto("/");

  await page.click("text=About");
  await expect(page).toHaveURL("/about");
  await expect(page.locator("h1")).toContainText("About");
});
```
