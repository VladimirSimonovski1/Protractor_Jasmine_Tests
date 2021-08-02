import { IWaitElement } from "./interfaces/IWaitElement";
import { browser, ElementFinder, ExpectedConditions } from "protractor";
import { Logger } from "tslog";

const log: Logger = new Logger();

export class ElementWait implements IWaitElement {
  s;
  public async waitForElementToBeClickable(
    element: ElementFinder
  ): Promise<boolean> {
    log.info("Waiting for element to be enabled for clicking...");
    await browser.wait(ExpectedConditions.elementToBeClickable(element), 5000);
    if (element.isEnabled()) {
      log.info("Element is ready to be clicked!");
      return true;
    } else {
      log.error("Element is still not ready to be clicked!");
      return false;
    }
  }

  public async waitForElementToBePresentInTheDOM(
    element: ElementFinder
  ): Promise<boolean> {
    log.info("Waiting for element to be located in the DOM...");
    await browser.wait(ExpectedConditions.presenceOf(element), 5000);
    if (element.isEnabled()) {
      log.info("Element is in the DOM!");
      return true;
    } else {
      log.error("Element is not in the DOM!");
      return false;
    }
  }

  public async waitForElementToBeVisibleOnThePage(
    element: ElementFinder
  ): Promise<boolean> {
    await this.waitForElementToBePresentInTheDOM(element);
    log.info("Waiting for element to become visible...");
    await browser.wait(ExpectedConditions.visibilityOf(element), 5000);
    if (element.isDisplayed()) {
      log.info("Element is visible!");
      return true;
    } else {
      log.error("Element is not visible!");
      return false;
    }
  }

  public async waitForElementToBeSelected(
    element: ElementFinder
  ): Promise<boolean> {
    log.info("Waiting for element to be selected...");
    await browser.wait(ExpectedConditions.elementToBeSelected(element), 5000);
    if (element.isSelected()) {
      log.info("Element is selected!");
      return true;
    } else {
      log.error("Element is not selected!");
      return false;
    }
  }

  public async waitForElementToBeStale(
    element: ElementFinder
  ): Promise<boolean> {
    log.info("Waiting for element to disappear from the DOM...");
    await browser.wait(ExpectedConditions.stalenessOf(element), 5000);
    if (!element.isEnabled()) {
      log.info("Element disappeared!");
      return true;
    } else {
      log.error("Element is still in the DOM!");
      return false;
    }
  }
}
