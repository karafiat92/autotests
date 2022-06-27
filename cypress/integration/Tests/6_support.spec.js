///<reference types="cypress"/>
import chat from "../Tests/pageObjects/chatPage";
import signIn from "../Tests/pageObjects/signinPage";
import testData from "../../support/testData";
let messageToSupport = testData.supportQuestions;
let messageFromSupport = testData.supportAnswers;
describe("Tezro Support testing", () => {
  beforeEach(() => {
    let userLoginDataNumber = 0;
    signIn.openSigninPage();
    signIn.typeSeedPhrase(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
  });

  it.only("Send a specific message to the Support to get a specific answer", () => {
    // let i = 0;
    // chat.chatClosedCheck().openChatWithUser("Support");
    // messageToSupport.forEach((message) => {
    //   chat.sendMessage(message);
    //   cy.wait(10000).log("Itteration: " + i);
    //   chat.getMessageItChat(messageFromSupport[i]).should("exist");
    //   chat
    //     .openMessageContextMenu(messageFromSupport[i])
    //     .chooseContextMenuItem("Delete")
    //     .deleteMessage(messageFromSupport[i])
    //     .openMessageContextMenu(message)
    //     .chooseContextMenuItem("Delete")
    //     .deleteMessage(message);
    //   ++i;
    // });

    chat.chatClosedCheck().openChatWithUser("Support");
    for (let i = 0; i < messageToSupport.length - 1; ++i) {
      chat.sendMessage(messageToSupport[i]);
      cy.wait(1000).log("Itteration: " + i);
      chat.getMessageItChat(messageFromSupport[i]).should("exist");
      chat
        .openMessageContextMenu(messageFromSupport[i])
        .chooseContextMenuItem("Delete")
        .deleteMessage(messageFromSupport[i])
        .openMessageContextMenu(messageToSupport[i])
        .chooseContextMenuItem("Delete")
        .deleteMessage(messageToSupport[i]);
    }
  });

  it("Send any message to the Support to get an advice to connect with an operator", () => {
    chat
      .chatClosedCheck()
      .openChatWithUser("Support")
      .sendMessage(messageToSupport[59]);
    cy.wait(10000);
    chat.getMessageItChat(messageFromSupport[59]).should("exist");
    chat
      .openMessageContextMenu(messageFromSupport[59])
      .chooseContextMenuItem("Delete")
      .deleteMessage(messageFromSupport[59])
      .openMessageContextMenu(messageToSupport[59])
      .chooseContextMenuItem("Delete")
      .deleteMessage(messageToSupport[59]);
  });
});
