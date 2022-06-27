///<reference types="cypress"/>

import testData from "../../../support/testData";

const emails = {
    // locators
    titleSelector: ".TitleClassStyle_t7w12yn",
    titleText: "Emails",
    newEmailModalButton: "#addContactButton",
    prevPageButton: ".ButtonClassStyle_b1v2s6zh",
    searchInput: "#searchField",
    contactItem: "#contactItem",
    interlocutorFullNameTitle: ".StyledChatHeaderFullName_s1uh91uj",
    sendFileButton: "#messagesFileSent",
    newEmailModalTitle: "New e-mail",
    messageInput: "#messageFieldValue",
    emailSubjectP: "E.mailSubjectClassStyle_evyx8bl",
    messageTextContent: ".MessageDataStyle_m1wc3e7k",
    messageMediaMessage: ".StyledEmailMediaMessageWrapper_s1unhh3z",
    emailMessagesList: ".StyledEmailMessages_sbqqqh6",
    messagesSentButton: "#messagesSentButton",
    dialogWindow: "div[role='dialog']",
    closeEmailModalButton: ".CloseButtonClassStyle_cyfsvpj",
    sendEmailModalButton: "SubmitButtonClassStyle_s1yfe2mr",
    openContactListButton: ".ShareButtonClassStyle_sbin7v2",
    addressModalInput: "#address",
    subjectModalInput: "#subject",
    messageModalInput: "#body",
    searchInputInContactModal: "#searchValue",
    cancelContactModalButton: ".ChatShareBtnCancel_c16kmqbt",
    selectContactModalButton: ".ChatShareBtnShare_c1ossl8p",
    contactListItem: ".StyledChatDialogMini_s1cy661g",
    contactCheckbox: "StyledButtonCheckbox_s1jjp8t8",

    // actions
    openCreatingNewEmailModal(){
        cy.wait(1000)
            .get(this.titleSelector)
            .should("contain.text", this.titleText)
        cy.get(this.newEmailModalButton)
        .should("be.enabled")
        .and("be.visible")
        .click()
        cy.get(this.dialogWindow)
        .should("exist")
        .and("contain.text", this.newEmailModalTitle)
        return this
    },
}
export default emails;