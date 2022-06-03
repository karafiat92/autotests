///<reference types="cypress"/>

import testData from '../../../support/testData';

const chat = {
    // locators
    startChatBackgroundText: "span[class='StyledText_sm7kffo']",
    chatsList: "#dialogItem",
    messageInput: "#messageFieldValue",
    contextMenuWindow: ".StyledContextMenuBG_s460k0",
    contextMenuItem: ".react-contexify__item__content",
    messagesInTheChat: "div[class='StyledMessage_snke963']",
    searchInput: "#searchInput",
    searchResult: "#dialogs-infinityScrollWrapper",
    replyCloseButton: 'div[class="ReplyCloseBtn_rkjerc6"]',

    // actions
    chatClosedCheck() {
        cy.wait(2000)
            .get(this.startChatBackgroundText)
            .should("have.text", "Choose who you would like to write to")
            .should("be.visible");
        return this;
    },
    // OPEN CHATS
    openFirstChat() {
        cy.get(this.chatsList)
            .first("button")
            .should("be.visible")
            .should("be.enabled")
            .click({ force: true });
        cy.get(this.startChatBackgroundText)
            .should("not.exist");
        return this;
    },
    findUser(user) {
        cy.wait(2000)
            .get(this.searchInput)
            .should("be.enabled")
            .focus()
            .wait(2000)
            .type(testData.userGlobalSearch.lastname)
            .wait(500);
        cy.get(searchResult)
            .should("contain.text", testData.userGlobalSearch.lastname)
            .then(($chat) => {
                cy.document($chat);
                cy.get($chat)
                    .find("button")
                    .click();
            })
        return this
    },
    typingAMessage(text) {
        cy.get(this.messageInput)
            .should("be.visible")
            .and("be.enabled")
            .type(text)
            .should("contain.value", text)
            .type("{enter}")
        return this
    },
    sendMessage(text) {
        this.typingAMessage(text)
        cy.get(this.messageInput).type("{enter}");
        cy.get(this.messagesInTheChat)
            .contains(text)
            .should("exist")
            .and("have.text", text);
        return this;
    },
    getMessageItChat(text) {
        return (
            cy.get(this.messagesInTheChat)
                .contains(text)
        );
    },
    // CONTEXT MENU
    openContextMenu(messageText, menuItem) {
        // this.getMessageItChat(messageText)
        //     .rightclick({force: true});
        // cy.get("div[role='menu']").should("be.visible");

        this.getMessageItChat(messageText)
            .rightclick({ force: true });
        cy.get(".StyledContextMenuBG_s460k0").should("be.visible");
        cy.get(".react-contexify__item__content")
            .contains(menuItem)
            .click({ force: true });
        // }
    },
    chooseContextMenuItem(menuItem) {
        cy.get(this.contextMenuItem)
            .contains(menuItem)
            .click({ force: true });
        return this
    },
    closeReplyForm() {
        cy.get(this.replyCloseButton)
            .children('button[class="StyleButton_s1oa7yi9"]')
            .click();
        return this
    }
}
export default chat