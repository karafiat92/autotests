/// <reference types="cypress"/>

import testData from "../../../support/testData";

const signIn = {
  // locators
  // Стартовая страница
  signInButton: "#loginButton",
  // Экран введения сидфразы
  seedPhraseInput: "[name='seedPhrase']",
  loginButton: "#loginFirstSubmit",
  // Введение пинкода
  pinInput: ".pinCodeInput_p7ui4lv",
  pinInputsDiv: ".inputsWrapperClass_i1iz67ks",
  // Стартовая страница авторизированного юзера
  startPage: "https://dev-web.tezro.com/",

  // actions
  // Открытие экрана авторизации
  openSigninPage() {
    cy.visit(testData.urls.startUrl);
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
    cy.get("button").contains("Sign In").click().wait(2000);
  },
  // Введение пинкода
  enterPincode(userLoginDataNumber) {
    cy.get(this.pinInputsDiv).as("listOfPinInputs")
    .children()
    .each(($child) => {
      cy.get($child).type(testData.userLoginData[userLoginDataNumber].pin)
    });
  },
};
export default signIn;
