///<reference types="cypress"/>
import chat from '../Tests/pageObjects/chatPage'
import signIn from '../Tests/pageObjects/signinPage'
import testData from '../../support/testData';
let messageToSupport = testData.supportQuestions;
let messageFromSupport = testData.supportAnswers;
describe("Tezro Support testing", () => {
    beforeEach(() => {
        let userLoginDataNumber = 0
        signIn.openSigninPage()
        signIn.typeSeedPhrase(userLoginDataNumber)
        signIn.enterPincode(userLoginDataNumber)
        signIn.enterPincode(userLoginDataNumber)
    });

    it("Send a message to the Support to get an answer", () => {
        chat.chatClosedCheck()
            .openChatWithUser("Support")
            .sendMessage(messageToSupport[0])
        cy.wait(10000)
        chat.getMessageItChat(messageFromSupport[0]).should("exist")
        chat.openContextMenu(messageFromSupport[0], "Delete")
            .deleteMessage(messageFromSupport[0])
            .openContextMenu(messageToSupport[0], "Delete")
            .deleteMessage(messageToSupport[0])

    });
});