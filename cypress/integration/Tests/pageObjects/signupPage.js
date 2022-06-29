/// <reference types="cypress"/>

import testData from "../../../support/testData";

// Функция введения в селектор данных
function typeTextData(selectorName, textData) {
  if (textData) {
    cy.get(selectorName)
      .should("be.visible")
      .should("be.enabled")
      .focus()
      .should("be.focused")
      .should("contain.value", "")
      .type(textData)
      .wait(500)
      .should("contain.value", textData);
  }
}
const signUp = {
    
  // locators
  // Стартовая страница
  signUpButton: "#loginButton",
  // Страница регистрации
  saveQRButton: "#SeedPhraseQRCodeDowloadPNG",
  saveTextButton: "#SeedPhraseQRCodeDowloadTXT",
  checkboxSavedSeed: "#signUpChecksaved",
  signupNextButton: "#signUpFirstSubmit",
  // Страница заполнения данных пользователя
  firstNameInput: "#firstNameField",
  lastNameInput: "#lastNameField",
  usernameInput: "#usernameField",
  nextButton: "#signUpSecondSubmit",
  checkboxIOathSign: "#signUpCheckIOathSign",
  // Страница введения пинкода
  pinInput: ["#pin_0", "#pin_1", "#pin_2", "#pin_3"],
  seedPhraseParagraph: ".StyledSeedPhraseModal_s1m6gcfy",

  // actions
  // Открытие страницы регистрации
  openSignupPage() {
    cy.viewport(1800, 950).visit(testData.urls.startUrl);
    cy.url().should("eq", testData.urls.startUrl);
    cy.get("button").contains("Sign up dev").click();
    cy.url().should("eq", testData.urls.signUpUrl);
    return this;
  },
  // Сохранение сид-фразы (текст, QR, чек-бокс, переход на другой экран)
  saveSeedPhrase() {
    cy.get(this.saveQRButton).should("be.visible").trigger("mouseover").click();
    // сохранение кода текстом
    cy.get(this.saveTextButton)
      .should("be.visible")
      .trigger("mouseover")
      .click();
    // активация чек-бокса
    cy.get(this.checkboxSavedSeed)
      .should("not.be.checked")
      .check({ force: true })
      .should("be.checked");
    // переход на следующую страницу
    cy.get(this.signupNextButton)
      .should("be.visible")
      .trigger("mouseover")
      .click()
      .wait(1000);
    return this;
  },
  // Заполнение данных пользователя (из testData)
  fillingUserData(user) {
    typeTextData(this.firstNameInput, user.firstname);
    typeTextData(this.lastNameInput, user.lastname);
    typeTextData(this.usernameInput, user.username);
    this.userUsername = user.username;
    cy.log(this.userUsername)
      // проверка кнопки регистрации: недоступна
      .get(this.nextButton)
      .should("be.visible")
      .should("have.attr", "disabled");
    return this;
  },
  // Активация чек-бокса и переход к введению пинкода
  activateCheckbox() {
    // проверка чек-бокса: не активирован, активирован
    cy.get(this.checkboxIOathSign)
      .should("not.be.checked")
      .check({ force: true })
      .wait(500)
      .should("be.checked");
    // проверка кнопки регистрации: доступна, срабатывает
    cy.get(this.nextButton)
      .should("be.visible")
      .should("be.enabled")
      .click()
      .wait(2000);
    return this;
  },
  // Введение пинкода
  enterPincode(user) {
    this.pinInput.forEach((pin) => {
      cy.get(pin).type(user.pin);
    });
    return this;
  },
};
export default signUp;
