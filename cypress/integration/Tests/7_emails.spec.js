///<reference types="cypress"/>
import chat from "../Tests/pageObjects/chatPage";
import signIn from "../Tests/pageObjects/signinPage";
import testData from "../../support/testData";
import main from "./pageObjects/mainPage";
import emails from "./pageObjects/emailsPage";

const existedExternalAddress = "tezroDevEmailAddress@mailto.plus";
const existedInternalAddress = "spell@mio.i-link.pro";
let randomInternalAddress = `internalAddress${Math.round(Math.random() * 1000)}@mio.i-link.pro`;
let randomExternalAddress = `externalAddress${Math.round(Math.random() * 1000)}@gmail.com`;

describe("Tezro Support testing", () => {
    beforeEach(() => {
      let userLoginDataNumber = 0;
      signIn.openSigninPage();
      signIn.typeSeedPhrase(userLoginDataNumber);
      signIn.enterPincode(userLoginDataNumber);
      signIn.enterPincode(userLoginDataNumber);
    });

    it("1. Sending message to external email-address", ()=> {
        cy.wait(3000)
        main.openEmails()
        emails.openCreatingNewEmailModal()
    })

});  