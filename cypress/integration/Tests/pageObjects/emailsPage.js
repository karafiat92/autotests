///<reference types="cypress"/>

import testData from "../../../support/testData";

const emails = {
  // locators
  // Заголовок
  titleSelector: ".TitleClassStyle_t7w12yn",
  titleText: "Emails",
  // Текст на стартовом экране открытых имейлов
  closeEmailChatsBackgroundTextSelector: ".StyledText_sm7kffo",
  closeEmailChatsBackgroundText: "Choose who you would like to write to",
  // Кнопки хедера
  newEmailModalButton: "#addContactButton",
  prevPageButton: ".ButtonClassStyle_b1v2s6zh",
  globalSearchInput: "#searchField",
  // Открытая почтовая переписка
  interlocutorFullNameTitle: ".StyledChatHeaderFullName_s1uh91uj",
  sendFileButton: "#messagesFileSent",
  emailMessagesList: ".StyledEmailMessages_sbqqqh6",
  messagesSentButton: "#messagesSentButton",
  messageInput: "#messageFieldValue",
  emailSubjectP: ".EmailSubjectClassStyle_evyx8bl",
  emailTextContent: ".EmailTextClassStyle_e19i1j5t",
  emailBuble: ".EmailMessageWrapperStyle_e1uxm0wl",
  // Контекстное меню сообщений
  contextMenuItem: ".react-contexify__item__content",
  deleteModalText: "Delete selected message?",
  menuWindow: "div[role='menu']",
  deleteModalButtons: ".StyledButton_s18ax6mf ",
  // Модалка отправки нового почтового сообщения
  dialogWindow: "div[role='dialog']",
  newEmailModalTitle: "New e-mail",
  closeEmailModalButton: ".CloseButtonClassStyle_cyfsvpj",
  sendEmailModalButton: ".SubmitButtonClassStyle_s1yfe2mr",
  addressModalInput: "#address",
  subjectModalInput: "#subject",
  messageModalInput: "#body",
  // Список конткатов
  openContactListButton: ".ShareButtonClassStyle_sbin7v2",
  searchInputInContactModal: "#searchValue",
  cancelContactModalButton: ".ChatShareBtnCancel_c16kmqbt",
  selectContactModalButton: ".ChatShareBtnShare_c1ossl8p",
  contactListItem: ".StyledChatDialogMini_s1cy661g",
  contactCheckbox: ".StyledButtonCheckbox_s1jjp8t8",
  // Список почтовых переписок
  emailChatsItem: "#contactItem",
  emailChatsList: "#dialogs-infinityScrollWrapper",

  // actions
  // Открытие модалки создания нового почтового сообщения
  openCreatingNewEmailModal() {
    cy.wait(1000)
      .get(this.titleSelector)
      .should("contain.text", this.titleText);
    cy.get(this.newEmailModalButton)
      .should("be.enabled")
      .and("be.visible")
      .click();
    cy.get(this.dialogWindow)
      .should("exist")
      .and("contain.text", this.newEmailModalTitle);
    return this;
  },
  // Введение имейл-адреса в модалке
  enterEmailAddress(address) {
    cy.wait(200)
      .get(this.addressModalInput)
      .should("contain.text", "")
      .and("be.enabled")
      .type(address)
      .should("contain.value", address);
    return this;
  },
  // Введение темы в модалке
  enterEmailSubject(subject) {
    cy.wait(200)
      .get(this.subjectModalInput)
      .should("contain.text", "")
      .and("be.enabled")
      .type(subject)
      .should("contain.value", subject);
    return this;
  },
  // Введение сообщения в модалке
  enterEmailMessage(message) {
    cy.wait(200)
      .get(this.messageModalInput)
      .should("contain.text", "")
      .and("be.enabled")
      .type(message)
      .should("contain.value", message);
    return this;
  },
  // Отправка нового сообщения через модалку
  sendNewEmailModal() {
    cy.wait(200)
      .get(this.sendEmailModalButton)
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get(this.dialogWindow).should("not.exist");
    return this;
  },
  // Открытие почтовой переписки из списка переписок
  openEmailChat(chatName) {
    cy
      .wait(10000)
      .get(this.emailChatsList)
      .contains(chatName)
      .should("exist")
      .and("be.visible").click();
    cy.get(this.closeEmailChatsBackgroundTextSelector)
    .should("not.exist");
    cy.get(this.interlocutorFullNameTitle)
    .should("have.text", chatName)
    return this;
  },
  // Поиск отправленного сообщения в истории переписки
  findMessageInEmailChat(subject, message) {
    cy.wait(1000)
    .get(this.emailSubjectP)
    .first()
    .should("exist")
    .and("have.text", subject)
    cy.get(this.emailTextContent)
    .first()
    .should("exist")
    .and("have.text", message)
    return this;
  },
  // Открытие контекстного меню для заданного сообщения
  openEmailMessageContextMenu(message) {
    cy.get(this.emailBuble)
    .contains(message)
    .rightclick({ force: true });
    cy.wait(500)
    .get(this.menuWindow).should("be.visible");
    return this;
  },
  chooseContextMenuItem(menuItem) {
    cy.get(this.contextMenuItem)
    .contains(menuItem).click({ force: true });
    return this;
  },
  deleteEmailMessage (){
    cy.get(this.dialogWindow)
    .should("exist")
    .and("contain.text", this.deleteModalText)
    cy.get(this.deleteModalButtons)
    .contains("Delete")
    .should("be.visible")
    .and("be.enabled")
    .click()
    cy.get(this.dialogWindow)
    .should("not.exist")
    cy.get
    return this;
  },
  checkEmailChatWasDeleted(address){
    cy
    .wait(200)
    .get(this.emailChatsList)
    .contains(address)
    .should("not.exist")
    return this;
  },
  checkEmailMessageWasDeleted(subject, message){
    cy.wait(500)
    .get(this.emailSubjectP)
    .contains(subject)
    .should("not.exist")
    cy.get(this.emailTextContent)
    .contains(message)
    .should("not.exist")
    return this;
  },
};
export default emails;
