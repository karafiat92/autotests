/*
2 шаг регистрации - заполнение данных пользователя
typeTextData - функция введение значения
signUp2StepUser - функция введение данных и переключения между кнопками
*/

/// <reference types="cypress"/>

import locators from '../../../support/elementsLocators';

//https://dev.web.tezro.com/signup форма для заполнения юзера
// переменная для доступа к локаторам на странице
let signup2stepLocators = locators?.signUpLocators.signUp2Step;

// объявление переменных для последующей проверки соответствия данных
let userProfileData = {
  userFirstname: "",
  userLastname: "",
  userUsername: ""
}
let signUp2Step;

// функция введения данных в поля
function typeTextData(selectorName, textData) {
  if (textData) {
    cy
      .get(selectorName)
      .should("be.visible")
      .should("be.enabled")
      .focus()
      .should("be.focused")
      .should("contain.value", "")
      .type(textData)
      .wait(500)
      .should("contain.value", textData);
    /*await t
              .typeText(selectorName, textData, { replace: true })
              .expect(selectorName.value)
              .eql(textData);*/
  }
}

signUp2Step = {
  // введение текста в выбранный селектор
  // заполнение полей для сознания нового юзера
  // занесение данных нового пользователя в объект для проверки
  async signUp2StepUser({ firstname, lastname, username }) {
    typeTextData(`${signup2stepLocators.firstNameInput}`, firstname)
    userProfileData.userFirstname = firstname
    cy.log(userProfileData.userFirstname)
    typeTextData(`${signup2stepLocators.lastNameInput}`, lastname)
    userProfileData.userLastname = lastname
    cy.log(userProfileData.userLastname)
    typeTextData(`${signup2stepLocators.usernameInput}`, username)
    userProfileData.userUsername = username
    cy.log(userProfileData.userUsername)

    // проверка кнопки регистрации: недоступна
    cy
      .get(`${signup2stepLocators.nextButton}`)
      .should("be.visible")
      .should("have.attr", "disabled");
    // проверка чек-бокса: не активирован, активирован
    cy
      .get(`${signup2stepLocators.checkboxIOathSign}`)
      .should("not.be.checked")
      .check({ force: true })
      .wait(500)
      .should("be.checked");
    // проверка кнопки регистрации: доступна, срабатывает
    cy
      .get(`${signup2stepLocators.nextButton}`)
      .should("be.visible")
      .should("be.enabled")
      .click()
      .wait(1000);

    /*await t
      .hover(this.nextButton)
      .expect(this.nextButton.visible)
      .ok()
      .click(this.nextButton)
      .wait(5000);*/
  },
  /*
    async errorTextUsernameMin() {
        const error = this.errorText1.count;
        await t
            .expect(error)
            .eql(1, 'errors "Minimum length is 5 symbols" should be 1');
    },
    async errorTextUsernameInvalid1() {
        const error = this.errorText3.count;
        await t.expect(error).eql(1, 'errors "Invalid username" should be 1');
    },
    async errorTextUsernameInvalid2() {
        const error = this.errorText7.count;
        await t
            .expect(error)
            .eql(1, 'errors "At least one letter is required" should be 1');
    },
    async errorTextUsernameOccupied() {
        const error = this.errorText4.count;
        await t
            .expect(error)
            .eql(1, 'errors "Username is already taken" should be 1');
    },
    async errorTextNameInvalid() {
        const error = this.errorText5.count;
        await t
            .expect(error)
            .eql(1, 'errors "Only latin characters allowed" should be 1');
    },
    async errorTextPhoneInvalid() {
        const error = this.errorText6.count;
        await t.expect(error).eql(1, 'errors "Invalid value" should be 1');
    },
    async errorTextMaxLetters() {
        const error = this.errorText8.count;
        await t
            .expect(error)
            .eql(1, 'errors "Maximum length is 32 symbols" should be 1');
    },
    async errorTextSpecialSymbol() {
        const error = this.errorText9.count;
        await t
            .expect(error)
            .eql(1, 'errors "Special symbols are not allowed" should be 1');
    },
    async errorTextFirstLetter() {
        const error = this.errorText10.count;
        await t
            .expect(error)
            .eql(1, 'errors "First character must be latin" should be 1');
    },
    async errorTextFieldEmpty() {
        const errorCount = Selector(this.errorText2).count;
        await t.expect(errorCount).eql(1, 'errors "Required field" should be 1');
    },
    async errorTextFieldEmptyAll() {
        const errorCount = Selector(this.errorText2).count;
        await t.expect(errorCount).eql(4, 'errors "Required field" should be 4');
    },*/
};
export default signUp2Step = {
  userProfileData,
  signUp2Step,
  typeTextData
};
