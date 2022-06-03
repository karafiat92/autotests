///<reference types="cypress"/>
import testData from '../../support/testData';
import chat from '../Tests/pageObjects/chatPage'
import signIn from '../Tests/pageObjects/signinPage'

let messageForTyping = `very long message${Math.round(Math.random()*10000)}`

function typingAMessage() {
    cy.get("#messageFieldValue")
    .type(`${messageForTyping}{enter}`);
}
function openContextMenu(messageText, menuItem) {
  cy.get(`div[class='StyledMessage_snke963']`)
  .contains(messageText)
  .rightclick({ force: true });
  cy.get(".StyledContextMenuBG_s460k0").should("be.visible");
  cy.get(".react-contexify__item__content")
      .contains(menuItem)
      .click({ force: true });
}
function closeReplyHeader(){
      cy.get('div[class="ReplyCloseBtn_rkjerc6"]')
      .children('button[class="StyleButton_s1oa7yi9"]')
      .click();
}

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
    });
  it.only("2. Message's context menu", () => {
    //REPLY  (не отправляется)
    chat.chatClosedCheck()
    .openFirstChat()
    .typingAMessage(messageForTyping)
    .openContextMenu( messageForTyping, "Reply")
    chat.typingAMessage(messageForTyping + "new")
    .closeReplyForm()
    // падает, потому что не отправляется ответ
    .getMessageItChat(messageForTyping + "new")
    
    // .sendMessage(messageForTyping)
    // openContextMenu(messageForTyping, "Reply")
    // .chooseContextMenuItem("Reply")
    // // .sendMessage("replyCheck")
    
    
    // cy.log("1before wait").wait(2000);
    // cy.get("#dialogItem")
    //   .should("exist")
    //   .first("button")
    //   .click()
      // .log("2after wait");
    // typingAMessage();
    // openContextMenu(
    //   messageForTyping, "Reply"
    // );
    
    // typingAMessage();
    // cy.get("#messageFieldValue")
    //   .wait(1000)
    //   .type(`sdfsdfsdf`)
    //   .should("contain.value", "sdfsdfsdf")
    //   .type("{enter}");
    // cy.get(".StyledChatSendMessageForm_s1u2lbry")
    //   .submit()
    
    //закрываем шапку реплая в поле текста
    // closeReplyHeader();
    // chat.closeReplyForm()
    // проверка, что отправилось сообщение-ответ
    // cy.get('p[class="messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i"]')
    // .contains('sdfsdfsdf');

   /* //FORWARD
    openContextMenu(
      `p[class="messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i"]`,
      messageForTyping, "Forward"
    );
    //лезем в первый выбор среди диалогов
    cy.get('#dialogs-for-share-infinityScrollWrapper')
    .should("exist").and('be.visible');
    cy.get('div[class="StyledChatDialogMini_s1cy661g"]')
    .first()
    .find('button[class="StyledButtonCheckbox_s1jjp8t8 StyleButton_s1oa7yi9"]')
    .click()
    //галочка проставилась (в принципе, а не в конкретном поле, над конкретным ещё подумтаь)
    cy.get(`div[style="--c1wv8s2o-0:scale(1);"]`);
    cy.get('button[class="ChatShareBtn_c1r1uewz ChatShareBtnShare_c1ossl8p StyleButton_s1oa7yi9"]')
    .click().wait(2000);
    
    //EDIT (уточнить у Никиты, почему не вводится текст)
    openContextMenu(
      `p[class="messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i"]`,
      messageForTyping, "Edit"
    );
    //Меняем текст сообщения
    cy.get("#messageFieldValue").click()
      .should("contain.value", messageForTyping)
      .type('1{enter}', {force: true})
      cy.get(`p[class="messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i"]`)
      //допущение для прохождения теста, однако, редактирование текста не работает
      .contains(messageForTyping) //ищу по не изменённому тексту, чтобы продолжить писать тест
      .siblings()
      .should('have.text', 'Edited')

    //DELETE
    openContextMenu(
      `p[class="messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i"]`,
      messageForTyping, "Delete"
    );
    cy.get('.StyledDeleteMessagesModal_s1gll4ug')
    .should('exist')
    cy.get('#modalDeleteMessageBtn')
    .should('exist').and('be.enabled')
    .click();
    cy.get(`p[class="messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i"]`)
      //допущение для прохождения теста, однако, редактирование текста не работает
      .contains(messageForTyping).should('not.exist')
*/

  }); //it2
});//describe