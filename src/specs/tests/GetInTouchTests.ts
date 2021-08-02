import "jasmine";
import { GetInTouchPage } from "../../page-object/implementation/GetInTouchPage";
import { ChaiAssertions } from "../../specs/assertions/ChaiAssertions";
import * as Data from "../../resources/QamindData";

describe("GET IN TOUCH PAGE", () => {
  const getInTouchPage = new GetInTouchPage();

  beforeAll(async (): Promise<void> => {
    await getInTouchPage.navigateToQamind();
  });

  it("Get in touch with the author without populating the form", async () => {
    await getInTouchPage.submitForm();
    const failMessages = await getInTouchPage.verifyFailedSubmission();
    for (const message of failMessages) {
      ChaiAssertions.checkIfActualEqualsExpected(
        message,
        Data.expectedFailMessage,
        `The list of validation message: ${failMessages}`
      );
    }
  });

  it("Get in touch with the author", async () => {
    await getInTouchPage.fillInFormAndSubmitIt();
    const confirmationMessage =
      await getInTouchPage.verifySuccessfulSubmission();
    ChaiAssertions.checkIfActualEqualsExpected(
      confirmationMessage,
      Data.expectedConfirmationMessage
    );
  });
});
