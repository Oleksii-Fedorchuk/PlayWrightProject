import BasePage from "../BasePage";

export default class mainPage extends BasePage {
  constructor(page) {
    super(page, "/", page.locator("button", { hasText: "Guest log in" }));
  }
}
