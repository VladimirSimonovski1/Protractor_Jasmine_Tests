import "jasmine";
import { HomePage } from "../../page-object/implementation/HomePage";
import { ChaiAssertions } from "../../specs/assertions/ChaiAssertions";
import * as Data from "../../resources/QamindData";

describe("HOME PAGE", () => {
  const homePage = new HomePage();

  beforeAll(async (): Promise<void> => {
    await homePage.navigateToQamind();
  });

  it("Should verify QAMIND logo & tagline", async (): Promise<void> => {
    const qamindLogo = await homePage.checkIfLogoExists();
    ChaiAssertions.checkIfActualValueIsTrue(qamindLogo);

    const qamindTagline = await homePage.getQamindTagline();
    ChaiAssertions.checkIfActualEqualsExpected(
      qamindTagline,
      Data.expectedTagline
    );
  });

  it("Count the number of protractor related blogs", async (): Promise<void> => {
    await homePage.searchForBlog("Protractor");
    const numOfBlogs = await homePage.validateTheNumberOfBlogs();
    ChaiAssertions.checkIfActualContainsExpected(
      numOfBlogs,
      "12",
      `The total number of blogs: ${numOfBlogs}`
    );
  });

  it("Verify that 'Using Protractor for smooth E2E automation' blog appears when searching for Protractor blogs", async (): Promise<void> => {
    await homePage.searchForBlog("Protractor");
    const searchResult = await homePage.verifySearchResult();
    ChaiAssertions.checkIfActualEqualsExpected(
      searchResult,
      Data.expectedSearchResult,
      `The search result: ${searchResult}`
    );
  });

  it("Verify no search results for random keyword", async (): Promise<void> => {
    await homePage.searchForBlog("tdsdsr");
    const searchResult = await homePage.verifyNoSearchResult();
    ChaiAssertions.checkIfActualEqualsExpected(
      searchResult,
      Data.expectedNoSearchResult + ' "tdsdsr"'
    );
  });

  it("Count the number of recent posts", async (): Promise<void> => {
    const numOfRecentPosts = await homePage.countTheNumOfRecentPosts();
    ChaiAssertions.checkIfActualEqualsExpected(numOfRecentPosts, 5);
  });

  it("Join the newsletter", async (): Promise<void> => {
    const successMessage = await homePage.subscribeToNewsletter();
    ChaiAssertions.checkIfActualEqualsExpected(
      successMessage,
      Data.expectedSuccessMessage,
      `Success message is: ${successMessage}`
    );
  });

  Data.categories.forEach((category: string, index: number) => {
    it("Open blogs by category and verify header", async () => {
      await homePage.selectCategory(category);
      const categoryHeader = await homePage.verifyCategoryHeader();
      ChaiAssertions.checkIfActualEqualsExpected(
        categoryHeader,
        Data.categoryHeader + "“" + Data.categories[index] + "”"
      );
    });
  });

  it("Verify LinkedIn profile of the author of QAMIND", async () => {
    const isLinkedProfileCorrect = await homePage.verifyAuthorLinkedInProfile();
    ChaiAssertions.checkIfActualValueIsTrue(isLinkedProfileCorrect);
  });
});
