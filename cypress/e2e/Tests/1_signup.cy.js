/// <reference types="cypress"/>

import testData from '../../support/testData';
import settings from '../Tests/pageObjects/settingsPage';
import signUp from '../Tests/pageObjects/signupPage';
import main from '../Tests/pageObjects/mainPage';

testData.serverName = "dev"

//все тесты по регистрация
describe("Tezro sign up", () => {
  it("1. tezro sign up: success for 2 users", () => {
    testData.userSignUpData.forEach((user) => {
      // регистрация
      cy.allure().step("Открытие приложения")
      signUp.openSignupPage()
      cy.allure().step("Сохранение сид-фразы")
      signUp.saveSeedPhrase()
        .fillingUserData(user)
        .activateCheckbox()
        .enterPincode(user)
        .enterPincode(user)
      main.openSettings()
        //проверка сидфразы
        settings.openSeedPhrase()
        .enterPincode(user)
        .compareSeedPhrase()
        .closeSeedWindow()
      // проверка данных
      // и выход
      settings.openEditProfile()
        .checkingUserData(user)
        .logout()
    })
  });
});
