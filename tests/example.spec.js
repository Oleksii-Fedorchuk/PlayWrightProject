import { test, expect } from "@playwright/test";

test.describe("First test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/"); // Замініть на потрібний URL
  });

  test.only("Find guest login", async ({ page }) => {
    const guestLogin = page.locator(
      '//button[@class="header-link -guest" ' + 'and text()="Guest log in"]'
    );
    const count = await guestLogin.count();
    expect(count).toBe(1);
    await guestLogin.click();

    // await expect(guestLogin, "Button should be visible").toBeVisible();
    // await expect(guestLogin).not.toBeHidden();
    // await expect(guestLogin).toBeEnabled();
    // await expect(guestLogin).not.toBeHidden();
  });

  test.only("Find All text in header button", async ({ page }) => {
    const expectedButtonText = ["Home", "About", "Contacts", "Guest log in"];
    const buttons = page.locator(".header-link");

    const actualText = [];
    const count = await buttons.count();

    for (let buttonItem of await buttons.all()) {
      actualText.push(await buttonItem.innerText());
    }
    expect(actualText.sort()).toEqual(expectedButtonText.sort());
  });

  test.only("First navigate test", async ({ page }) => {
    const signInButton = page.locator(".header_signin", { hasText: "Sign In" });
    await signInButton.click();
    const modalSignIn = page.locator("div.modal-dialog");
    const emailInput = modalSignIn.locator("input#signinEmail");
    const passwordInput = modalSignIn.locator("input#signinPassword");
    const signInButtonModal = modalSignIn.locator(".btn-primary");

    await emailInput.fill("Test@com");
    await passwordInput.fill("1234");
    await expect(signInButtonModal).toBeDisabled();
    await expect(modalSignIn.locator('.invalid-feedback')).toHaveText('Email is incorrect')
    await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    await expect(emailInput).toHaveScreenshot('invalid-email-input.png', {maxDiffPixelRatio: 0.2,})
  });
});
