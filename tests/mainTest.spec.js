import { test, expect } from "@playwright/test";
import MainPage from "../integrations/pageObjects/pages/mainPage/mainPage.js";

test.describe("Main Page", () => {
  let mainPage;
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1512, height: 982 },
    });

    const page = await context.newPage();

    mainPage = new MainPage(page);
  });
  test.afterAll(async ({ browser }) => {
    await page.close();
    await browser.close();
  });

  test("Open main page", async () => {
    await mainPage.open();
    await mainPage.waitLoaded();
  });
});
