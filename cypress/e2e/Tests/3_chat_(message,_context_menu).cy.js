///<reference types="cypress"/>
import chat from '../Tests/pageObjects/chatPage'
import signIn from '../Tests/pageObjects/signinPage'

let messageForTyping = `very long message${Math.round(Math.random()*10000)}`
let editText = "editt"
let forwardRecipient = "Mr Spell"
let firstMessageForChatExistence = "Hi"

beforeEach(() => {
  let userLoginDataNumber = 0
  signIn.openSigninPage()
  signIn.typeSeedPhrase(userLoginDataNumber)
  signIn.enterPincode(userLoginDataNumber)
  signIn.enterPincode(userLoginDataNumber)
});
describe("User's chat and message's context menu", () => {
  it("1. Write message in chat", () => {
    chat.chatClosedCheck()
        .openFirstChat()
        .sendMessage(messageForTyping)
        .getMessageItChat(messageForTyping).should('exist')
        chat.clearHistory()
        .sendMessage(firstMessageForChatExistence)
    });
    xit("2. Message's context menu: EDIT", () => {
      chat.chatClosedCheck()
      .openFirstChat()
      .sendMessage(messageForTyping)
      .openMessageContextMenu(messageForTyping)
      .chooseContextMenuItem("Edit") 
      .editMessageText(messageForTyping, editText)
      .findEditMessage(messageForTyping + editText)
      chat.clearHistory()
      .sendMessage(messageForTyping)
    });
    xit("3. Message's context menu: FORWARD", () => {
      chat.chatClosedCheck()
      .openFirstChat()
      .getInterlocutorName()
      .openMessageContextMenu(messageForTyping)
      .chooseContextMenuItem("Forward") 
      .makeChoiceInDialogsForShare(forwardRecipient)
      .openFirstChat()
      .findForwardMessage(messageForTyping)
      chat.clearHistory()
      .sendMessage(messageForTyping)
    });
    xit("4. Message's context menu: REPLY", () => {
      chat.chatClosedCheck()
      .openFirstChat()
      .openMessageContextMenu(messageForTyping)
      .chooseContextMenuItem("Reply") 
      .sendMessage("newMessage")
      .getMessageItChat("newMessage")
      chat.clearHistory()
      .sendMessage(messageForTyping)
    });
    xit("5. Message's context menu: DELETE", () => {
      chat.chatClosedCheck()
      .openFirstChat()
      // при удалении единственного сообщения страница падает
      // баг на вебе при открытия чата с пустой перепиской
      // поэтому перед удалением отправляем ещё одно, чтобы переписка не была пустой
      .sendMessage(firstMessageForChatExistence)
      .openMessageContextMenu(messageForTyping)
      .chooseContextMenuItem("Delete") 
      .deleteMessage(messageForTyping)
  });
});//describe