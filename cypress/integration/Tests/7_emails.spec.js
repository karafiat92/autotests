///<reference types="cypress"/>
import chat from "../Tests/pageObjects/chatPage";
import signIn from "../Tests/pageObjects/signinPage";
import testData from "../../support/testData";
import main from "./pageObjects/mainPage";
import emails from "./pageObjects/emailsPage";

const existedExternalAddress = "e.antonova@ilink.dev";
const existedInternalAddress = "spell@mio.i-link.pro";
const recipientEmailMessageName = "Mr Spell"
let randomInternalAddress = `internaladdress${Math.round(Math.random() * 1000)}@mio.i-link.pro`;
let randomExternalAddress = `externaladdress${Math.round(Math.random() * 1000)}@gmail.com`;

let randomSubject = `subject № ${Math.round(Math.random() * 1000)}`;
let randomMessage = `message № ${Math.round(Math.random() * 1000)}`;

describe("Sending a message to email-address", () => {
    beforeEach(() => {
      let userLoginDataNumber = 0;
      signIn.openSigninPage();
      signIn.typeSeedPhrase(userLoginDataNumber);
      signIn.enterPincode(userLoginDataNumber);
      signIn.enterPincode(userLoginDataNumber);
    });

    it("2. Sending a message to existed internal email-address", ()=> {
        cy.wait(3000)
        main.openEmails()
        emails.openCreatingNewEmailModal()
        .enterEmailAddress(existedInternalAddress)
        .enterEmailSubject(randomSubject)
        .enterEmailMessage(randomMessage)
        .sendNewEmailModal()
        .openEmailChat(recipientEmailMessageName)
        .findMessageInEmailChat(randomSubject, randomMessage)
        .openEmailMessageContextMenu (randomMessage)
        .chooseContextMenuItem("Delete") 
        .deleteEmailMessage()
        .checkEmailMessageWasDeleted(randomSubject, randomMessage)
        
    })
    it("1. Sending a message to existed external email-address", ()=> {
        cy.wait(3000)
        main.openEmails()
        emails.openCreatingNewEmailModal()
        .enterEmailAddress(existedExternalAddress)
        .enterEmailSubject(randomSubject)
        .enterEmailMessage(randomMessage)
        .sendNewEmailModal()
        .openEmailChat(existedExternalAddress)
        .findMessageInEmailChat(randomSubject, randomMessage)
        .openEmailMessageContextMenu (randomMessage)
        .chooseContextMenuItem("Delete") 
        .deleteEmailMessage()
        .checkEmailChatWasDeleted(existedExternalAddress)
    })


});  