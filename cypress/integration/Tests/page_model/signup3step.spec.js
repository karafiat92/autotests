/*
3 шаг регистрации - введение пинкода
signUp3StepEnterPinUser - введение пинкода в 4 шага
signUp3StepUrl - получение актуальной страницы
errorPinFailed 
*/

/// <reference types="cypress"/>

import tezroData from '../../../support/tezro_data';
import locators from '../../../support/elementsLocators';

//https://dev.web.tezro.com/signup создание пина
let signup3stepLocators = locators?.signUpLocators.signUp3Step;

async function typePinData(selectorName, pinData) {
  if (pinData) {
     cy
      .focused()
      .should("be.visible")
      .should("be.enabled") 
      .should("contain.value", "")
      .type(pinData);
      //.should("contain.value", pinData) падает
      // потому что не отображают последний ввод пинкода
    /*await t
              .typeText(selectorName, textData, { replace: true })
              .expect(selectorName.value)
              .eql(textData);*/
  }
}

const signUp3Step = {
  //функция введения пинкода в инпут, который активирован

  typePinData: function(selectorName, pinData) {
    if (pinData) {
      cy
       .focused()
       .should("be.visible")
       .should("be.enabled") 
       .should("contain.value", "")
       .type(pinData);
       //.should("contain.value", pinData) падает
       // потому что не отображают последний ввод пинкода
     /*await t
               .typeText(selectorName, textData, { replace: true })
               .expect(selectorName.value)
               .eql(textData);*/
              }
            },

// введение пинкода
  async signUp3StepEnterPinUser(pin) {
    typePinData(`${signup3stepLocators.pin1Input}`, pin)
    typePinData(`${signup3stepLocators.pin2Input}`, pin)
    typePinData(`${signup3stepLocators.pin3Input}`, pin)
    typePinData(`${signup3stepLocators.pin4Input}`, pin)

    /*const getPageURL1 = ClientFunction(() => window.location.href);
    await t
      .typeText(this.pin1Input, pin)
      .expect(this.pin1Input.value)
      .eql(pin)
      .typeText(this.pin2Input, pin)
      .expect(this.pin2Input.value)
      .eql(pin)
      .typeText(this.pin3Input, pin)
      .expect(this.pin3Input.value)
      .eql(pin)
      .typeText(this.pin4Input, pin)
      //.expect(this.pin4Input.value).eql(pin)
      .wait(10000);*/
  },
  // проверка адреса страницы
  async signUp3StepUrl() {
     cy
    .wait(2000)
    .url()
    .should('equal', tezroData.urls.startUrl)
    //cy.get('#walletsButton')
    //.click()
    //const getPageURL1 = ClientFunction(() => window.location.href);
    //await t.expect(getPageURL1()).eql(urls.startUrl);
  },
  /*async errorPinFailed() {
    await t
      .hover(this.errorText)
      .expect(this.errorText.visible)
      .ok('errors "Invalid PIN code" should be 1', { timeout: 3000 });
  },*/
};
export default signUp3Step

