///<reference types="cypress"/>

import BigNumber from "bignumber.js";
import testData from "../../../support/testData";

const chat = {
  // locators
  // CHATS
  // Селекторы по ролям
  dialogWindow: "div[role='dialog']",
  menuWindow: "div[role='menu']",
  menuItem: "div[role='menuitem']",
  // Список чатов
  startChatBackgroundText: "span[class='StyledText_sm7kffo']",
  closedChatBackgroundText: "Choose who you would like to write to",
  chatsList: "#dialogItem",
  searchInput: "#searchInput",
  searchResult: "#dialogs-infinityScrollWrapper",
  savedMessages: "Saved Messages",
  deleteModalText: "Delete this chat?",
  // Открытый чат с юзером
  cebabMenuButton: ".StyledCurrentChatMenu_s1dxgzff",
  messageInput: "#messageFieldValue",
  messageBlock: "div[class='StyledMessageBlock_sfd8xei']",
  writtenMessage: ".StyledMessage_snke963",
  // mediaQR
  mediaQRmessage: ".StyledMessageBlockWrapper_s1nhs1wf",
  mediaQRButtons: ".StyledButton_s18e05gh",
  // Контекстное меню
  contextMenuWindow: ".StyledContextMenuBG_s460k0",
  contextMenuItem: ".react-contexify__item__content",
  dialogForShareModal: "#dialogs-for-share-infinityScrollWrapper",
  deleteModalWindow: ".StyledDeleteMessagesModal_s1gll4ug",
  modalDeleteMessageBtn: "#modalDeleteMessageBtn",
  shareModalButtons: ".ChatShareBtn_c1r1uewz",
  // Форма создания ответа/редактирования у поля сообщения
  replyCloseButton: 'div[class="ReplyCloseBtn_rkjerc6"]',
  // Список контактов для расшаривания
  listOfDialogs: ".StyledChatDialogMini_s1cy661g",
  dialogCheckbox:
    'button[class="StyledButtonCheckbox_s1jjp8t8 StyleButton_s1oa7yi9"]',
  checkMarkStile: `div[style="--c1wv8s2o-0:scale(1);"]`,
  searchFieldInShare: "#searchValue",
  // TRANSACTIONS
  // Чат с юзером
  currencyButton: "#currencyButton",
  transactionAmountInput: "input[name='amountField']",
  transactionBuble: ".StyledFullDate_s4n5bsi",
  unlockEscrowButton: "#submitInfoModalBtn",
  escrowTxFormBtn: "#escrowTxFormBtn",
  sendTxFormBtn: "#sendTxFormBtn",
  // Модалка выбора валют
  walletsListModal: ".ReactModal__Content",
  currencyItem: ".StyledCurrency_s1646xb6",
  closeChooseCurrencyModalBtn: "#closeChooseCurrencyModalBtn",
  chooseCurrencyButton: ".chooseCurrency",
  chooseCurrencyTitle: "Choose currency",
  // Модалка введения пинкода для эскроу
  escrowPincodeText: "Sending money under ESCROW you agree",
  pinInput: ["#pin_0", "#pin_1", "#pin_2", "#pin_3"],
  pinModalTitleText: "PIN Code",
  // GROUPS
  // Стартовый экран создания группы
  openCreateGroupButton: ".MenuButtonClassStyle_m9q5hkl",
  createGroupButton: ".StyledAddToGroupBtn_s1o5v6gu",
  paragraphText: ["Members", "0 members"],
  searchField: "#searchField",
  resultSearchList: ".infinite-scroll-component.StyledInfinityList_s1ozr89r",
  // Созданная группа
  createGroupData: 'div[class="StyledSelectedBlock_s15i499r"]',
  groupDataModal: 'form[class="StyledNewGroupModal_s468f18"]',
  groupNameInput: "#newGroupName",

  // actions
  // CHATS
  // Проверка, что при закрытых чатах виден текст на фоне (= чаты закрыты)
  chatClosedCheck() {
    cy.wait(2000)
      .get(this.startChatBackgroundText)
      .should("have.text", this.closedChatBackgroundText)
      .should("be.visible");
    return this;
  },
  // Открытие первого чата в списке
  openFirstChat() {
    cy.get(this.chatsList)
      .first("button")
      .should("be.visible")
      // .should("be.enabled")
      .click({ force: true });
    cy.get(this.startChatBackgroundText).should("not.exist");
    return this;
  },
  // Открытие чата с конкретным юзером
  openChatWithUser(name) {
    if (name == "Support" || name === "Exchange") {
      cy.wait(2000)
        .get("button")
        .contains(name)
        // .should("be.enabled")
        .click({ force: true });
      cy.get(this.startChatBackgroundText).should("not.exist");
    } else {
      cy.wait(1000)
        .get(this.chatsList)
        .contains(name)
        .parents("button")
        .should("be.visible")
        .should("be.enabled")
        .click({ force: true });
      cy.get(this.startChatBackgroundText).should("not.exist");
    }
    return this;
  },
  // Поиск юзера
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
        cy.get($chat).find("button").click();
      });
    return this;
  },
  // Функция введения текста с проверкой, что текст ввёлся
  typingAMessage(text) {
    cy.get(this.messageInput)
      .should("be.visible")
      .and("be.enabled")
      .wait(500)
      .type(text)
      .should("contain.value", text);
    return this;
  },
  // Отправка сообщения с проверкой, что сообщение отправилось
  sendMessage(text) {
    this.typingAMessage(text);
    cy.get(this.messageInput).wait(200).type("{enter}");
    cy.get(this.writtenMessage)
      .contains(text)
      .should("exist")
      .and("have.text", text);
    return this;
  },
  // Получить сообщение в чате (возвращает селектор с текстом)
  getMessageItChat(text) {
    return cy.get(this.writtenMessage).contains(text);
  },
  // TRANSACTIONS
  // Открытие списка кошельков
  openWalletsList() {
    cy.get(this.currencyButton)
      .should("exist")
      .should("be.enabled")
      .click()
      .wait(2000);
    cy.get(this.walletsListModal).should("be.visible");
    return this;
  },
  // Выбор кошелька
  chooseWallet(currency) {
    cy.wait(500)
    .get(this.currencyItem)
    .contains(currency)
    .parents(this.currencyItem)
    .as("chosenCurrencyButton")
    .find(this.currencyBalance)
    .invoke("text")
    .as("startBalance");
  cy.get("@chosenCurrencyButton")
    .find(this.chooseCurrencyButton)
    .should("be.enabled")
    .click();
  cy.get(this.dialogWindow)
    .contains(this.chooseCurrencyTitle)
    .should("not.exist");
    return this;
  },
  // Закрытие списка кошельков
  closeWalletsList() {
    cy.get(this.closeChooseCurrencyModalBtn)
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get(this.dialogWindow).should("not.exist");
    return this;
  },
  // Сравнить баланс после отправки транзакции
  compareBalanceInWalletList(currency, transactionAmount) {
    cy.get(this.currencyItem)
      .find("p[class='StyleText_svkxk8i']")
      .contains(currency)
      .should("exist")
      .siblings("p")
      .wait(3000)
      .invoke("text")
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
  // Введение суммы в поле суммы(сообщения)
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
  // Введение минималки для отправки с помощью эскроу
  enterEscrowMinAmount(currency, amount) {
    cy.get(this.transactionAmountInput)
      .invoke("val")
      .as(`${currency}min`)
      .then((amount) => {
        let amountInInput = new BigNumber(amount).toNumber();
        cy.wrap(amountInInput);
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
  // Введение пинкода
  enterPincode(userLoginDataNumber) {
    cy.get(this.dialogWindow).contains(this.pinModalTitleText).should("exist");
    this.pinInput.forEach((pin) => {
      cy.get(pin).type(testData.userLoginData[userLoginDataNumber].pin);
    });
    return this;
  },
  //Открытие экрана разблокировки эскроу
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
  // Разблокировка эскроу
  unlockEscrow() {
    cy.get(this.dialogWindow)
      .should("be.visible")
      .find(this.unlockEscrowButton)
      .should("be.enabled")
      .click()
      .wait(3000);
    cy.get("@escrowTransaction").should("not.contain.text", "179: 23: ");
    return this;
  },
  // CONTEXT MENU
  // Открытие контекстного меню для заданного сообщения
  openMessageContextMenu(messageText) {
    this.getMessageItChat(messageText).rightclick({ force: true });
    cy.get(this.menuWindow).should("be.visible");
    return this;
  },
  // Выбор пункта в контекстном меню
  chooseContextMenuItem(menuItem) {
    cy.get(this.contextMenuItem).contains(menuItem).click({ force: true });
    return this;
  },
  // Закрытие формы создания ответа на сообщение
  closeReplyForm() {
    cy.get(this.replyCloseButton)
      .children('button[class="StyleButton_s1oa7yi9"]')
      .click();
    return this;
  },
  // Выбор пользователя для расшаривания сообщения
  makeChoiceInDialogsForShare(user) {
    cy.get(this.dialogForShareModal).should("exist").and("be.visible");
    cy.get(this.listOfDialogs)
      .contains(user)
      .parents(this.listOfDialogs)
      .find(this.dialogCheckbox)
      .click();
    //галочка проставилась в принципе, а не в конкретном поле, над конкретным ещё подумтаь)
    cy.get(this.checkMarkStile).should("exist");
    cy.get(this.shareModalButtons).last().click().wait(2000);
    return this;
  },
  findUserInShareModal(user){
    cy.get(this.searchFieldInShare)
    .should("be.empty")
    .type(user)
    .should("have.value", user)
    return this;
  },
  // Получить имя собеседника
  getInterlocutorName() {
    cy.get(".StyledTopChatContent_s1qeop8c")
      .find('p[class="StyledChatHeaderFullName_s1uh91uj StyleText_svkxk8i"]')
      .invoke("text")
      .as("name");
    return this;
  },
  // Найти пересланное сообщение
  findForwardMessage(message) {
    cy.get(this.messageBlock)
      .contains("Forward message")
      .should("exist")
      .parents(".StyledMessageBlock_sfd8xei")
      .contains("very long")
      .should("contain.text", message);
    return this;
  },
  // Отредактировать сообщение
  editMessageText(messageForEditing, editText) {
    cy.get(this.messageInput)
      .click()
      .should("contain.value", messageForEditing)
      .type(`${editText}{enter}`, { force: true });
    return this;
  },
  // Найти отредактированное сообщение
  findEditMessage(editedMessage) {
    cy.get(this.writtenMessage)
      .contains(editedMessage)
      .siblings()
      .should("have.text", "Edited");
    return this;
  },
  // Удалить сообщение
  deleteMessage(messageForTyping) {
    cy.get(this.deleteModalWindow).should("exist");
    cy.get(this.modalDeleteMessageBtn)
      .should("exist")
      .and("be.enabled")
      .click()
      .wait(500);
    cy.get(this.writtenMessage).contains(messageForTyping).should("not.exist");
    return this;
  },
  // Закрытие модалки подтверждения удаления
  closeDeleteModal() {
    cy.get("button").contains("Cancel").click();
    return this;
  },
  // Очищение истории переписки
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
    cy.get(this.dialogWindow).should("not.exist");
    return this;
  },
  // GROUPS
  // Открытие экрана создания новой группы
  openCreateGroupWindow() {
    cy.get(this.openCreateGroupButton).should("be.enabled").click();
    //Проверяем, что открылся (текст про членов и их количество (0))
    cy.get(this.createGroupData)
      .children("p")
      .then(($elem) => {
        let i = 0;
        this.paragraphText.forEach((element) => {
          cy.wrap($elem[i]).should("have.text", element);
          ++i;
        });
      });
    cy.get(this.createGroupButton).should("be.disabled");
    return this;
  },
  // Добавление в новую группу членов на этапе создания группы
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
          cy.wrap($chat[i]).children("button").click();
        }
      });
    //Проверяем, что изменилось количество членов на membersAmount
    cy.get(this.createGroupData)
      .children("p")
      .last()
      .then(($elem) => {
        cy.wrap($elem).should("have.text", `${amount} members`);
      });
    return this;
  },
  // Открытие модалки для заполнения данных группы
  openGroupDataFilling() {
    cy.get(this.createGroupButton).should("be.enabled").click();
    return this;
  },
  // Заполнение данных группы (название)
  fillGroupData(name) {
    //Открылась модалка заполнения данных группы
    cy.get(this.groupDataModal)
      .should("exist")
      .then(($elem) => {
        cy.wrap($elem).find("textarea").should("be.enabled");
      });
    //Проверяем, что без имени не создаётся группа
    cy.get("button").contains("Ok").click();
    cy.get(this.groupNameInput)
      .then(($elem) => {
        cy.wrap($elem).siblings().last().should("have.text", "Required field");
        cy.wrap($elem);
      })
      .type(name)
      .should("have.value", name);
    return this;
  },
  // Открытие созданной группы
  openCreatedGroup(name) {
    cy.get("button").contains("Ok").click().wait(3000);
    //  Oткрываем
    cy.get(this.chatsList)
      .find('p[class="StyledAuthor_sixaul3 StyleText_svkxk8i"]')
      .then(($parag) => {
        cy.wrap($parag[0]).should("have.text", name);
        cy.wrap($parag[0]);
      })
      .parentsUntil(this.chatsList)
      .last()
      .click();
    return this;
  },
  // Сверяем данные группы (создатель, количество членов)
  checkGroupData(name, amount) {
    // Проверяем все данные в открытой группе
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
  // Открывает контекстное меню чата
  openChatContextMenu(groupName) {
    cy.get(this.chatsList).contains(groupName).rightclick().wait(500);
    cy.get(this.menuWindow)
      .should("exist")
      .and("be.visible")
      .find(this.menuItem)
      .contains("Delete");
    return this;
  },
  // Удаляем чат
  deleteChat(chatName) {
    cy.get(this.dialogWindow)
      .should("exist")
      .and("be.visible")
      .and("contain.text", this.deleteModalText)
      .find("button")
      .contains("Delete")
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get(this.chatsList).contains(chatName).should("not.exist");
    return this;
  },
  // когда гифты будут запущены, попробую работу с аргументами
  // без параметра content
  checkMediaQrInChat(type, content) {
    cy.wait(1000)
    .get(this.mediaQRmessage)
    .last()
    .as("mediaQR");
    switch (type) {
      case "Gift":
        cy.get("@mediaQR").then(($card) => {
          for (var i = 1; i < arguments.length; i++) {
            cy.wrap($card).should("contain.text", arguments[i]);
          }
        });
        break;
      default:
        cy.log("Uncorrect mediaQR type");
    }
    return this;
  },
};
export default chat;
