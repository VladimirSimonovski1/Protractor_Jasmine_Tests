import { ElementFinder } from "protractor";

export interface IWaitElement {
  /**
   * Waits for the element to become clickable
   * @param element The element passed as an argument
   * @returns true if element is clickable, false if not
   */
  waitForElementToBeClickable(element: ElementFinder): Promise<boolean>;

  /**
   * Waits for the element to be present in the DOM
   * @param element The element passed as an argument
   * @returns true if element is present in the DOM, false if not
   */
  waitForElementToBePresentInTheDOM(element: ElementFinder): Promise<boolean>;

  /**
   * Waits for the element to be visible on the page
   * @param element The element passed as an argument
   * @returns true if element is visible on the page, false if not
   */
  waitForElementToBeVisibleOnThePage(element: ElementFinder): Promise<boolean>;

  /**
   * Waits for the element to become selected
   * @param element The element passed as an argument
   * @returns true if element is selected, false if not
   */
  waitForElementToBeSelected(element: ElementFinder): Promise<boolean>;

  /**
   * Waits for the element to become stale(not in the DOM)
   * @param element The element passed as an argument
   * @returns true if element is stale, false if not
   */
  waitForElementToBeStale(element: ElementFinder): Promise<boolean>;
}
