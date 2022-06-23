///<reference types="cypress"/>

import BigNumber from "bignumber.js";
import testData from "../../../support/testData";

const chat = {
  // locators
  // CHATS
  startChatBackgroundText: "span[class='StyledText_sm7kffo']",
  chatsList: "#dialogItem",
  messageInput: "#messageFieldValue",
  contextMenuWindow: ".StyledContextMenuBG_s460k0",
  contextMenuItem: ".react-contexify__item__content",
  messagesInTheChat: "div[class='StyledMessage_snke963']",
  messageBlock: "div[class='StyledMessageBlock_sfd8xei']",
  searchInput: "#searchInput",
  searchResult: "#dialogs-infinityScrollWrapper",
  replyCloseButton: 'div[class="ReplyCloseBtn_rkjerc6"]',
  dialogForShareModal: "#dialogs-for-share-infinityScrollWrapper",
  listOfDialogs: 'div[class="StyledChatDialogMini_s1cy661g"]',
  dialogCheckbox: 'button[class="StyledButtonCheckbox_s1jjp8t8 StyleButton_s1oa7yi9"]',
  userDialogInList: ".StyledChatDialogMini_s1cy661g",
  checkMarkStile: `div[style="--c1wv8s2o-0:scale(1);"]`,
  savedMessages: "Saved Messages",
  deleteModalWindow: ".StyledDeleteMessagesModal_s1gll4ug",
  modalDeleteMessageBtn: "#modalDeleteMessageBtn",
  writtenMessage: ".StyledMessage_snke963",
  cebabMenuButton: ".StyledCurrentChatMenu_s1dxgzff",
  dialogWindow: "div[role='dialog']",
  menuWindow: "div[role='menu']",
  menuItem: "div[role='menuitem']",
  closedChatBackgroundText: "Choose who you would like to write to",
  deleteModalText: "Delete this chat?",
  // TRANSACTIONS
  currencyButton: "#currencyButton",
  walletsListModal: ".ReactModal__Content",
  currencyListInModal: ".StyledCurrency_s1646xb6",
  transactionAmountInput: "input[name='amountField']",
  escrowTxFormBtn: "#escrowTxFormBtn",
  sendTxFormBtn: "#sendTxFormBtn",
  transactionBuble: 'p[class="StyledFullDate_s4n5bsi StyleText_svkxk8i"]',
  unlockEscrowButton: "#submitInfoModalBtn",
  escrowPincodeText: "Sending money under ESCROW you agree",
  pinInput: ["#pin_0", "#pin_1", "#pin_2", "#pin_3"],
  closeChooseCurrencyModalBtn: "#closeChooseCurrencyModalBtn",
  // GROUPS
  paragraphText: ["Members", "0 members"],
  openCreateGroupButton: ".MenuButtonClassStyle_m9q5hkl.StyleButton_s1oa7yi9",
  createGroupButton: 'button[class="StyledAddToGroupBtn_s1o5v6gu StyleButton_s1oa7yi9"]',
  searchField: "#searchField",
  resultSearchList: ".infinite-scroll-component.StyledInfinityList_s1ozr89r",
  createGroupData: 'div[class="StyledSelectedBlock_s15i499r"]',
  groupDataModal: 'form[class="StyledNewGroupModal_s468f18"]',
  groupNameInput: "#newGroupName",


  // actions
  // CHATS
  chatClosedCheck() {
    cy.wait(2000)
      .get(this.startChatBackgroundText)
      .should("have.text", this.closedChatBackgroundText)
      .should("be.visible");
    return this;
  },
  openFirstChat() {
    cy.get(this.chatsList)
      .first("button")
      .should("be.visible")
      // .should("be.enabled")
      .click({ force: true });
    cy.get(this.startChatBackgroundText)
    .should("not.exist");
    return this;
  },
  openChatWithUser(name) {
    if (name == "Support" || name === "Exchange") {
      cy.wait(1000)
      .get("button")
      .contains(name)
      // .should("be.enabled")
      .click({ force: true });
    cy.get(this.startChatBackgroundText)
    .should("not.exist");
    } else {
      cy.wait(1000)
      .get(this.chatsList)
      .contains(name)
      .find("button")
      .should("be.visible")
      .should("be.enabled")
      .click({ force: true });
    cy.get(this.startChatBackgroundText)
    .should("not.exist");
    }
    return this;
  },
  findUser(user) {
    cy.wait(2000)
      .get(this.searchInput)
      .should("be.enabled")
      .focus()
      .wait(2000)
      .type(user)
      .wait(500);
    cy.get(this.searchResult)
      .should("contain.text", user)
      .then(($chat) => {
        cy.document($chat);
        cy.get($chat)
        .find("button").click();
      });
    return this;
  },
  typingAMessage(text) {
    cy.get(this.messageInput)
      .should("be.visible")
      .and("be.enabled")
      .wait(500)
      .type(text)
      .should("contain.value", text)
      .type("{enter}");
    return this;
  },
  sendMessage(text) {
    this.typingAMessage(text);
    cy.get(this.messageInput)
    .type("{enter}");
    cy.get(this.messagesInTheChat)
      .contains(text)
      .should("exist")
      .and("have.text", text);
    return this;
  },
  getMessageItChat(text) {
    return cy.get(this.messagesInTheChat)
    .contains(text);
  },
  // TRANSACTIONS
  openWalletsList() {
    cy.get(this.currencyButton)
      .should("exist")
      .should("be.enabled")
      .click()
      .wait(2000);
    cy.get(this.walletsListModal)
    .should("be.visible");
    return this;
  },
  chooseWallet(currency) {
    cy.get(this.currencyListInModal)
      .find("p[class='StyleText_svkxk8i']")
      .contains(currency)
      .as(`${currency}wallet`)
      .should("exist")
      .siblings("p")
      .invoke("text")
      // Сохраняем значение баланса
      .as("startBalance")
      .then(parseFloat);
    cy.get("@" + `${currency}wallet`)
      .parents("div.StyledCurrency_s1646xb6")
      .find("button")
      .as(`${currency}button`)
      .click();
    return this;
  },
  closeWalletsList(){
    cy.get(this.closeChooseCurrencyModalBtn)
    .should('be.visible')
    .and('be.enabled')
    .click()
    cy.get(this.dialogWindow)
    .should("not.exist")
    return this
  },
  compareBalanceInWalletList(currency, transactionAmount) {
    cy.get(this.currencyListInModal)
      .find("p[class='StyleText_svkxk8i']")
      .contains(currency)
      .should("exist")
      .siblings("p")
      .invoke("text")
      .wait(3000)
      .as("endBalance")
      .then((end) => {
        const endBalance = new BigNumber(end);
        cy.log("new balance: " + endBalance.toNumber());
        let transactionResult = new BigNumber(endBalance).plus(
          transactionAmount
        );
        cy.get("@startBalance")
          .then(parseFloat)
          .then((start) => {
            const startBalance = new BigNumber(start);
            cy.log("old balance: " + startBalance.toNumber());
            cy.wrap(startBalance.toNumber());
          })
          .should("equal", transactionResult.toNumber());
      });
    return this;
  },
  enterTransactionAmount(amount) {
    // Вводим сумму
    cy.get(this.transactionAmountInput)
      .clear()
      .type(amount)
      .should("have.value", amount)
      .type("{enter}");
    // Вводим пинкод
    return this;
  },
  enterEscrowMinAmount(currency, amount) {
    cy.get(this.transactionAmountInput)
      .invoke("val")
      .as(`${currency}min`)
      .then((amount)=>{
          let amountInInput = new BigNumber(amount).toNumber()
        cy.wrap(amountInInput)
      })
      .should("equal", amount);
    // Прожимаем кнопку эскроу
    cy.get(this.escrowTxFormBtn).click();
    cy.get(this.sendTxFormBtn).click();
    cy.get(".PinCodeWrapper_pnkfvhj")
      .should("contain.text", this.escrowPincodeText)
      .find(".StyledCheckWrapper_sufxuur")
      .should("have.attr", "style")
      .and("equal", "--sufxuur-0:scale(1);");
    return this;
  },
  enterPincode(userLoginDataNumber) {
    cy.get(this.dialogWindow)
    .should("exist");
    this.pinInput.forEach((pin) => {
      cy.get(pin)
      .type(testData.userLoginData[userLoginDataNumber].pin);
    });
    return this;
  },
  openEscrowModalWindow() {
    cy.get(this.transactionBuble)
      .last()
      .then(($elem) => {
        cy.get($elem)
          .parents('div[class="messageTxItem StyledWrapper_s1u2hop9"]')
          .as("escrowTransaction");
        cy.wrap($elem);
      })
      .should("contain.text", "179: 23: 5")
      .siblings(".StyledEscrowTxInnerContent_smwsvb3")
      .find("button")
      .click();
    return this;
  },
  unlockEscrow() {
    cy.get(this.dialogWindow)
      .should("be.visible")
      .find(this.unlockEscrowButton)
      .should("be.enabled")
      .click()
      .wait(3000);
    cy.get("@escrowTransaction")
    .should("not.contain.text", "179: 23: ");
    return this;
  },
  // CONTEXT MENU
  openMessageContextMenu(messageText) {
    this.getMessageItChat(messageText)
    .rightclick({ force: true });
    cy.get(this.menuWindow)
    .should("be.visible");
    return this;
  },
  chooseContextMenuItem(menuItem) {
    cy.get(this.contextMenuItem)
    .contains(menuItem).click({ force: true });
    return this;
  },
  closeReplyForm() {
    cy.get(this.replyCloseButton)
      .children('button[class="StyleButton_s1oa7yi9"]')
      .click();
    return this;
  },
  makeChoiceInDialogsForShare(user) {
    cy.get(this.dialogForShareModal)
    .should("exist").and("be.visible");
    cy.get(this.listOfDialogs)
      // отправка юзеру, с которым переписка, почему-то не срабатывает
      // нужно будет посмотреть с Никитой
      /*.then(($dialogs) => {
           cy.get('@name')
           .then(($name) => {
            cy.get($dialogs)
            .contains($name)
            .parents(".StyledChatDialogMini_s1cy661g")
            // .find('button')
            .find(this.dialogCheckbox)
            .click()
           })
        })*/
      .contains(user)
      .parents(this.userDialogInList)
      .find(this.dialogCheckbox)
      .click();
    //галочка проставилась в принципе, а не в конкретном поле, над конкретным ещё подумтаь)
    cy.get(this.checkMarkStile)
    .should("exist");
    cy.get("button")
    .contains("Send").click()
    .wait(2000);
    return this;
  },
  getInterlocutorName() {
    cy.get(".StyledTopChatContent_s1qeop8c")
      .find('p[class="StyledChatHeaderFullName_s1uh91uj StyleText_svkxk8i"]')
      .invoke("text")
      .as("name");
    return this;
  },
  findForwardMessage(message) {
    cy.get(this.messageBlock)
      .contains("Forward message")
      .should("exist")
      .parents(".StyledMessageBlock_sfd8xei")
      .contains("very long")
      .should("contain.text", message);
    return this;
  },
  editMessageText(messageForEditing, editText) {
    cy.get(this.messageInput)
      .click()
      .should("contain.value", messageForEditing)
      .type(`${editText}{enter}`, { force: true });
    return this;
  },
  findEditMessage(editedMessage) {
    cy.get(this.writtenMessage)
      .contains(editedMessage)
      .siblings()
      .should("have.text", "Edited");
    return this;
  },
  deleteMessage(messageForTyping) {
    cy.get(this.deleteModalWindow).should("exist");
    cy.get(this.modalDeleteMessageBtn)
      .should("exist")
      .and("be.enabled")
      .click()
      .wait(500);
    cy.get(this.writtenMessage)
    .contains(messageForTyping)
    .should("not.exist");
    return this;
  },
  closeDeleteModal() {
    cy.get("button")
    .contains("Cancel").click();
    return this;
  },
  clearHistory() {
    cy.get(this.cebabMenuButton).click();
    cy.get(this.menuWindow)
      .should("be.visible")
      .find(this.menuItem)
      .contains("Clear history")
      .click();
    cy.get(this.dialogWindow)
      .should("be.visible")
      .find("button")
      .contains("Clear")
      .should("be.enabled")
      .click();
    cy.get(this.dialogWindow)
    .should("not.exist");
    return this;
  },
  // GROUPS
  openCreateGroupWindow() {
    cy.get(this.openCreateGroupButton)
    .should("be.enabled").click();
    //Проверяем, что открылся (текст про членов и их количество (0))
    cy.get(this.createGroupData)
      .children("p")
      .then(($elem) => {
        let i = 0;
        this.paragraphText.forEach((element) => {
          cy.wrap($elem[i])
          .should("have.text", element);
          ++i;
        });
      });
    cy.get(this.createGroupButton)
    .should("be.disabled");
    return this;
  },
  addMembersBeforeGroupCreated(name, amount) {
    cy.get(this.searchField)
    .should("be.enabled")
    .focus()
    .wait(1500)
    .type(`${name}{enter}`)
    .wait(1500);
    cy.get(this.resultSearchList)
      .children("div")
      .then(($chat) => {
        cy.wait(1000);
        for (var i = 0; i < amount; i++) {
          cy.wait(100).log(`${i}`);
          cy.wrap($chat[i])
          .children("button").click();
        }
      });
    //Проверяем, что изменилось количество членов на membersAmount
    cy.get(this.createGroupData)
      .children("p")
      .last()
      .then(($elem) => {
        cy.wrap($elem)
        .should("have.text", `${amount} members`);
      });
    return this;
  },
  openGroupDataFilling() {
    cy.get(this.createGroupButton)
    .should("be.enabled").click();
    return this;
  },
  fillGroupData(name) {
    //Открылась модалка заполнения данных группы
    cy.get(this.groupDataModal)
      .should("exist")
      .then(($elem) => {
        cy.wrap($elem)
        .find("textarea").should("be.enabled");
      });
    //Проверяем, что без имени не создаётся группа
    cy.get("button")
    .contains("Ok").click();
    cy.get(this.groupNameInput)
      .then(($elem) => {
        cy.wrap($elem)
        .siblings().last()
        .should("have.text", "Required field");
        cy.wrap($elem);
      })
      .type(name)
      .should("have.value", name);
    return this;
  },
  openCreatedGroup(name) {
    cy.get("button").contains("Ok").click().wait(3000);
    //  Oткрываем
    cy.get(this.chatsList)
      .find('p[class="StyledAuthor_sixaul3 StyleText_svkxk8i"]')
      .then(($parag) => {
        cy.wrap($parag[0])
        .should("have.text", name);
        cy.wrap($parag[0]);
      })
      .parentsUntil(this.chatsList)
      .last()
      .click();
    return this;
  },
  checkGroupData(name, amount) {
    // Проверяем все данные в открытой группе
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // тащим значения из заголовка с именем юзера
    // и сравниваем с создателем группы
    // и не забываем дышать
    cy.get('p[class="StyleText_svkxk8i"]')
      .first()
      .invoke("text")
      .as("aliasWithText");
    cy.get("@aliasWithText").then((text) => {
      cy.get(".StyledMessageBlock_sfd8xei")
        .last()
        .invoke("text")
        .should("eq", `${text} created the group «${name}»`);
    });

    cy.get(".StyledMessageBlock_sfd8xei")
      .last()
      .invoke("text")
      .should("eq", `Vvvvvv Vvvvvv created the group «${name}»`);
    cy.get(".StyledChatHeader_s179c1mb")
      .last()
      .should("have.text", `${name}${amount + 1} members`);
    return this;
  },
  openChatContextMenu(groupName){
    cy.get(this.chatsList)
    .contains(groupName)
    .rightclick()
    .wait(500)
    cy.get(this.menuWindow)
    .should("exist")
    .and("be.visible")
    .find(this.menuItem)
    .contains("Delete")
    return this
  },
  deleteChat(chatName){
    cy.get(this.dialogWindow)
    .should("exist")
    .and("be.visible")
    .and("contain.text", this.deleteModalText)
    .find("button")
    .contains("Delete")
    .should("be.visible")
    .and("be.enabled")
    .click()
    cy.get(this.chatsList)
    .contains(chatName)
    .should("not.exist")
    return this
  },
};
export default chat;
