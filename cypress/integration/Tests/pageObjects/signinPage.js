/// <reference types="cypress"/>

import testData from "../../../support/testData";

const signIn = {
  // locators
  // Стартовая страница
  signInButton: "#loginButton",
  // Экран введения сидфразы
  seedPhraseInput: "#seedPhraseField",
  loginButton: "#loginFirstSubmit",
  // uploadSeedPhrase: "#loginUploadPhrase", на будущее
  // Введение пинкода
  pinInput: ["#pin_0", "#pin_1", "#pin_2", "#pin_3"],
  // Стартовая страница авторизированного юзера
  startPage: "https://dev-web.tezro.com/",

  // actions
  // Открытие экрана авторизации
  openSigninPage() {
    cy.viewport(1800, 950).visit(testData.urls.startUrl);
    cy.url().should("eq", testData.urls.startUrl);
    cy.get("button").contains("Log in dev").click();
    cy.url().should("eq", testData.urls.signInUrl);
  },
  // Введение сид-фразы и переход к введению пинкода
  typeSeedPhrase(userLoginDataNumber) {
    cy.get(this.seedPhraseInput)
      .should("contain.value", "")
      .wait(500)
      .type(testData.userLoginData[userLoginDataNumber].seedPhrase)
      .wait(500)
      .should(
        "contain.value",
        testData.userLoginData[userLoginDataNumber].seedPhrase
      );
    cy.get(this.loginButton).click().wait(2000);
  },
  // Введение пинкода
  enterPincode(userLoginDataNumber) {
    this.pinInput.forEach((pin) => {
      cy.get(pin).type(testData.userLoginData[userLoginDataNumber].pin);
    });
  },
};
export default signIn;
