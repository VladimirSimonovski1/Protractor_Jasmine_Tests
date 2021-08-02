import { IBasePage } from "../../page-object/contracts/IBasePage";
import { ElementFetch } from "../../protractor-wrapper/ElementFetch";
import { ElementAction } from "../..//protractor-wrapper/ElementAction";
import { ElementWait } from "../../protractor-wrapper/ElementWait";
import { Browser } from "../../protractor-wrapper/Browser";
import { ElementFinder, Locator } from "protractor";

export abstract class BasePage implements IBasePage {
  baseURL: string;
  find = new ElementFetch();
  action = new ElementAction();
  wait = new ElementWait();
  browserQa = new Browser();

  constructor(base: string) {
    this.baseURL = base;
  }

  public async navigateToQamind() {
    await this.browserQa.deleteAllCookies();
    await this.browserQa.maximizeBrowserWindow();
    await this.browserQa.navigateTo(this.baseURL);
  }

  public async clearInputFieldAndEnterText(
    locator: Locator,
    text: string
  ): Promise<void> {
    const element = await this.find.fetchElement(locator);
    await this.browserQa.scrollToElement(
      "arguments[0].scrollIntoView(true);",
      element
    );
    await this.wait.waitForElementToBeVisibleOnThePage(element);
    await this.action.inputValueToField(element, text);
  }

  public async waitForElementToBeClickableAndClick(
    locator: Locator
  ): Promise<void> {
    const element = await this.find.fetchElement(locator);
    await this.browserQa.scrollToElement(
      "arguments[0].scrollIntoView(true);",
      element
    );
    await this.wait.waitForElementToBeClickable(element);
    await this.action.clickOnElement(element);
  }

  public async returnElementValueIfDisplayed(
    locator: Locator
  ): Promise<string> {
    const element = await this.find.fetchElement(locator);
    await this.wait.waitForElementToBeVisibleOnThePage(element);
    return await this.action.getTextFromElement(element);
  }

  public async returnElementsIfDisplayed(
    locator: Locator
  ): Promise<ElementFinder[]> {
    const elements = await this.find.fetchElements(locator);
    for (const element of elements) {
      this.wait.waitForElementToBeVisibleOnThePage(element);
    }
    return elements;
  }

  public async confirmIfValueIsDisplayed(locator: Locator): Promise<boolean> {
    const element = await this.find.fetchElement(locator);
    const isElementVisible = await this.wait.waitForElementToBeVisibleOnThePage(
      element
    );
    if (isElementVisible === true) {
      return isElementVisible;
    } else {
      throw new Error("Element is not visible on the screen!");
    }
  }

  public async returnDisplayedURL(): Promise<string> {
    return await this.browserQa.getCurrentUrl();
  }
}
