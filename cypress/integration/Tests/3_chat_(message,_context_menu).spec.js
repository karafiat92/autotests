///<reference types="cypress"/>
import testData from '../../support/testData';
import chat from '../Tests/pageObjects/chatPage'
import signIn from '../Tests/pageObjects/signinPage'

let messageForTyping = `very long message${Math.round(Math.random()*10000)}`
let editText = "editt"
let forwardRecipient = "Mr Spell"
let firstMessageForChatExistence = "Hi"

describe("User's chat and message's context menu", () => {
  beforeEach(() => {
    let userLoginDataNumber = 0
    signIn.openSigninPage()
    signIn.typeSeedPhrase(userLoginDataNumber)
    signIn.enterPincode(userLoginDataNumber)
    signIn.enterPincode(userLoginDataNumber)
  });
  it("1. Write message in chat", () => {
    chat.chatClosedCheck()
        .openFirstChat()
        .sendMessage(messageForTyping)
        .getMessageItChat(messageForTyping).should('exist')
        chat.clearHistory()
        .sendMessage(firstMessageForChatExistence)
    });
    it("2. Message's context menu: EDIT", () => {
      chat.chatClosedCheck()
      .openFirstChat()
      .sendMessage(messageForTyping)
      .openContextMenu(messageForTyping, "Edit")
      .editMessageText(messageForTyping, editText)
      .findEditMessage(messageForTyping + editText)
      chat.clearHistory()
      .sendMessage(messageForTyping)
    });
    it("3. Message's context menu: FORWARD", () => {
      chat.chatClosedCheck()
      .openFirstChat()
      .getInterlocutorName()
      .openContextMenu(messageForTyping, "Forward")
      .makeChoiceInDialogsForShare(forwardRecipient)
      .openFirstChat()
      .findForwardMessage(messageForTyping)
      chat.clearHistory()
      .sendMessage(messageForTyping)
    });
    it("4. Message's context menu: REPLY", () => {
      chat.chatClosedCheck()
      .openFirstChat()
      .openContextMenu(messageForTyping, "Reply")
      .typingAMessage("newMessage")
      .getMessageItChat("newMessage")
      chat.clearHistory()
      .sendMessage(messageForTyping)
    });
    it("5. Message's context menu: DELETE", () => {
      chat.chatClosedCheck()
      .openFirstChat()
      // при удалении единственного сообщения страница падает
      // баг на вебе при открытия чата с пустой перепиской
      // поэтому перед удалением отправляем ещё одно, чтобы переписка не была пустой
      .sendMessage(firstMessageForChatExistence)
      .openContextMenu(messageForTyping, "Delete")
      .deleteMessage(messageForTyping)
  });
});//describe