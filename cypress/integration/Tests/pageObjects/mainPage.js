///<reference types="cypress"/>
import testData from "../../../support/testData";

const main = {

// locators
// SIDEBAR
walletsButton: "#walletsButton",

    openWallets(){
    cy.get(this.walletsButton)
    // .contains("Wallet")
    .should("be.visible")
    .click()
    return this
    },

};
export default main;