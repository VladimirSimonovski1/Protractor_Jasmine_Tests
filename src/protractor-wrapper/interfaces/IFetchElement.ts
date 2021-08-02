import { ElementArrayFinder, ElementFinder, Locator } from "protractor";

export interface IFetchElement {
  /**
   * Finds element
   * @param locator The type of locator passed as an argument
   * @returns Element if not undefined
   */
  fetchElement(locator: Locator): Promise<ElementFinder>;

  /**
   * Find elements
   * @param locator The type of locator passed as an argument
   * @returns Element if not undefined
   */
  fetchElements(locator: Locator): Promise<ElementArrayFinder>;
}
