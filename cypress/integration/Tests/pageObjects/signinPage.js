/// <reference types="cypress"/>

import testData from '../../../support/testData';

// локаторы и операции по прохождению авторизации
// на странице https://dev-web.tezro.com/login

const signIn = {

    // локаторы
    signInButton: "#loginButton",
    seedPhraseInput: "#seedPhraseField",
    loginButton: "#loginFirstSubmit",
    // uploadSeedPhrase: "#loginUploadPhrase", на будущее
    pinInput: ["#pin_0", "#pin_1", "#pin_2", "#pin_3"],
    startPage: "https://dev-web.tezro.com/",

    // операции 
    openSigninPage() {
        cy.viewport(1800, 950)
            .visit(testData.urls.startUrl);
        cy.url()
            .should("eq", testData.urls.startUrl);
        cy.get(this.signInButton)
            .click();
        cy.url()
            .should("eq", testData.urls.signInUrl);
    },
    typeSeedPhrase(userLoginDataNumber) {
        cy.get(this.seedPhraseInput)
            .should("contain.value", "")
            .type(testData.userLoginData[userLoginDataNumber].seedPhrase)
            .should('contain.value', testData.userLoginData[userLoginDataNumber].seedPhrase)
        cy.get(this.loginButton).click().wait(2000)
    },
    enterPincode(userLoginDataNumber) {
        this.pinInput.forEach(pin => {
            cy.get(pin).type(testData.userLoginData[userLoginDataNumber].pin)
        })
    }
}
export default signIn