import { IBrowser } from "./interfaces/IBrowser";
import { browser, ElementFinder } from "protractor";
import { Logger } from "tslog";

const log: Logger = new Logger();

export class Browser implements IBrowser {
  constructor() {
    browser.ignoreSynchronization = true;
  }

  public async restartBrowser(): Promise<void> {
    await browser.restart();
    log.info("Browser restarted!");
  }

  public async close(): Promise<void> {
    await browser.close();
    log.info("Browser closed!");
  }

  public async maximizeBrowserWindow(): Promise<void> {
    await browser.manage().window().maximize();
    log.info("Browser window maximized!");
  }

  public async changeWindowSize(width: number, height: number): Promise<void> {
    await browser.manage().window().setSize(width, height);
    const windowSize = await browser.manage().window().getSize();
    log.info(
      `The size of the browser is: ${windowSize.width}; x ${windowSize.height}`
    );
  }

  public async navigateTo(url: string): Promise<void> {
    log.info(`Navigate to ${url} URL....`);
    await browser.navigate().to(url);
  }

  public async refreshPage(): Promise<void> {
    log.info("Refreshing the webpage");
    await browser.navigate().refresh();
  }

  public async goBack(): Promise<void> {
    log.info("Going back one step in the browser...");
    await browser.navigate().back();
  }

  public async deleteAllCookies(): Promise<void> {
    log.info("Deleting all the current cookies");
    await browser.manage().deleteAllCookies();
    const cookiesLength = (await browser.manage().getCookies()).length;
    log.info(`Current length of cookies is ${cookiesLength}`);
  }

  public async executeScript(script: string): Promise<void> {
    await browser.executeScript(script);
  }

  public async scrollToElement(
    script: string,
    element: ElementFinder
  ): Promise<void> {
    await browser.executeScript(script, element);
  }

  public async getCurrentUrl(): Promise<string> {
    await browser.sleep(5000);
    return await browser.getCurrentUrl();
  }
}
