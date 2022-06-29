///<reference types="cypress"/>
import testData from "../../../support/testData";
import emails from "./emailsPage";
import wallet from "./walletPage";
import gift from "./giftPage";

const main = {
  // locators
  // SIDEBAR
  walletsButton: "#walletsButton",
  settingsButton: "#settingsButton",
  emailButton: "",
  giftButton: "",

  // actions
  // Открытие кошельков
  openWallets() {
    cy.wait(2000)
      .get(this.walletsButton)
      // .contains("Wallet")
      .should("be.visible")
      .click();
    cy.get(wallet.pageTitleSelector)
      .should("exist")
      .and("contain.text", wallet.pageTitleText);
    return this;
  },
  // Открытие почты
  openEmails() {
    cy.wait(2000).get("p").contains("Emails").should("be.visible").click();
    cy.get(emails.closeEmailChatsBackgroundTextSelector)
      .should("exist")
      .and("contain.text", emails.closeEmailChatsBackgroundText);
    return this;
  },
  openSettings() {
    cy.wait(2000)
      .get(this.settingsButton)
      .trigger("mouseover")
      .should("be.visible")
      .click()
      .wait(500)
      .url()
      .should("equal", testData.urls.settingsUrl);
    return this;
  },
  openGifts() {
    cy.wait(3000)
    .get("p")
    .contains("Gift cards")
    .should("be.visible").click();
    cy.get(gift.dialogWindow)
      .should("exist")
      .and("contain.text", gift.giftModalTitleText);
    return this;
  },
};
export default main;
