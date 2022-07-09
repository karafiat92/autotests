/*
Стартовая страница с функциями проверки перехода на экраны
signUpUser - регистрации и 
signInUser - авторизации
*/

/// <reference types="cypress"/>


import tezroData from '../../../support/tezro_data';
import locators from '../../../support/elementsLocators';

//https://dev.web.tezro.com/
// переменная для доступа к локаторам на странице
let startPageLocators = locators?.signUpLocators.startPage;

const startPage = {
  // переход на страницу регистрации юзера
   signUpUser() {
     
    cy.viewport('macbook-16') // 1536/960
    .get(`${startPageLocators.signUpButton}`)  
    .should('be.visible') //expect(this.sugnUpButton.visible)
    .trigger('mouseover')//.hover(this.sugnUpButton)
      //.ok({ timeout: 5000 })
    .click()  //.click(this.sugnUpButton)
    .wait(2000)  //.wait(2000)
    .url() //.expect(getPageURL1())
    .should("eql", tezroData.urls.signUpUrl);  //.eql(urls.signUpUrl);
  },
  // переход на страницу авторизации юзера
   signInUser() {
     cy
    .viewport('macbook-16')  //.maximizeWindow()
    .get(`${startPageLocators.signInButton}`)
    .should('be.visible')  //.expect(this.sugnInButton.visible)
    .trigger('mouseover') //.hover(this.sugnInButton)
    .wait(2000)   //.ok({ timeout: 5000 })
    .click(this.signInButton); //.click(this.sugnInButton)
    cy.wait(2000)  //.wait(2000)
    .url()   //.expect(getPageURL1())
    .should('eql', tezroData.urls.signInUrl);  //.eql(tezroData.urls.signInUrl);
  },
};
export default startPage