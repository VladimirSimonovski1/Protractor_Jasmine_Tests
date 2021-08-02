import {
  ElementFinder,
  ElementArrayFinder,
  Locator,
  element,
} from "protractor";
import { IFetchElement } from "./interfaces/IFetchElement";
import { Logger } from "tslog";

const log: Logger = new Logger();

export class ElementFetch implements IFetchElement {
  public async fetchElement(locator: Locator): Promise<ElementFinder> {
    log.info("Fetching element...");
    const fetchedElement = await element(locator);
    return fetchedElement;
  }

  public async fetchElements(locator: Locator): Promise<ElementArrayFinder> {
    log.info("Fetching elements...");
    const fetchedElements = await element.all(locator);
    return fetchedElements;
  }
}
