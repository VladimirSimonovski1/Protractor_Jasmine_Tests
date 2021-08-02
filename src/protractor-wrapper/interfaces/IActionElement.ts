import { ElementFinder } from "protractor";

export interface IActionElement {
  /**
   * Click on the element
   * @param element The element passed as an argument
   */
  clickOnElement(element: ElementFinder): Promise<void>;

  /**
   * Get text from element
   * @param element The element passed as an argument
   * @returns The text of an element
   */
  getTextFromElement(element: ElementFinder): Promise<string>;

  /**
   * Send value to an input field
   * @param element The element passed as an argument
   * @param text The text to be entered passed as an argument
   */
  inputValueToField(element: ElementFinder, text: string): Promise<void>;
}
