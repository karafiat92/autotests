/// <reference types="cypress"/>

import testData from "../../../support/testData";

function checkFields(selectorName, selectorData) {
  cy.get(selectorName)
    .should("be.visible")
    .should("contain.value", selectorData);
}

const settings = {
  // locators
  //main Page Locators
  settingsButton: "#settingsButton",
  // Кнопки в настройках
  editProfileButton: "#editProfileButton",
  fiatButton: "#fiatButton > div",
  privacyButton: "#privacyButton",
  seedPhraseButton: "#seedPhraseButton",
  seedPhraseParagraph: ".StyledSeedPhraseModal_s1m6gcfy",
  seedCloseButton: "#modalSeedPhraseCloseButton",
  pinInput: ["#pin_0", "#pin_1", "#pin_2", "#pin_3"],
  kycButton: "#kycButton",
  name: "#myFullName",
  // Редактирование профиля
  saveProfileButton: "#saveProfileButton",
  logOutButton: "#logOutButton",
  //edit Profile Locators
  firstnameInput: "#first_name",
  lastnameInput: "#last_name",
  usernameInput: "#username",
  saveButton: "#saveProfileButton",
  backButton: "#settingsBackBtn",

  // actions
  // Открытие редактирования профиля
  openEditProfile() {
    cy.get(this.editProfileButton)
      .trigger("mouseover")
      .should("be.visible")
      .and("be.enabled")
      .click()
      .wait(500)
      .url()
      .should("equal", testData.urls.editProfileUrl);
    return this;
  },
  // Проверка данных пользователя при регистрации
  checkingUserData(user) {
    checkFields(this.firstnameInput, user.firstname);
    checkFields(this.lastnameInput, user.lastname);
    checkFields(this.usernameInput, user.username);
    return this;
  },
  // Сохрание данных пользователя
  saveProfileData() {
    cy.url().should("eq", testData.urls.editProfileUrl);
    cy.get(this.saveButton).click().wait(2000);
    cy.url().should("eq", testData.urls.settingsUrl);
    return this;
  },
  // Открытие экрана сид-фразы
  openSeedPhrase() {
    cy.get(this.seedPhraseButton)
      .trigger("mouseover")
      .should("be.visible")
      .click()
      .wait(500)
      .url()
      .should("equal", testData.urls.settingsUrl);
    return this;
  },
  // Введение пинкода
  enterPincode(user) {
    this.pinInput.forEach((pin) => {
      cy.get(pin).type(user.pin);
    });
    return this;
  },
  // Сравнение сид-фразы при регистрации (текстовый файл) и на странице
  compareSeedPhrase() {
    cy.get(this.seedPhraseParagraph)
      .find(">p")
      .not("#modalSeedPhrase")
      .then(($elem) => {
        cy.readFile("cypress/downloads/seedPhrase.txt").should(
          "eq",
          $elem.text()
        );
      });
    return this;
  },
  // Закрытие модалки сид-фразы
  closeSeedWindow() {
    cy.get(this.seedCloseButton).should("be.visible").and("be.enabled").click();
    cy.get(this.seedCloseButton).should("not.exist");
    return this;
  },
  // Выход из профиля
  logout() {
    cy.get(this.logOutButton)
      .trigger("mouseover")
      .should("be.visible")
      .click()
      .wait(1500)
      .url()
      .should("equal", testData.urls.startUrl);
  },
};
export default settings;
