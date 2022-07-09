/*
1 шаг регистрации - экран с сид-фразой
signUp1StepUser - сохранение сида и переход на следующий шаг
signUp1StepUserFailled - проверка неактивности кнопки без чекбокса
*/

/// <reference types="cypress"/>

import locators from '../../../support/elementsLocators';

// https://dev.web.tezro.com/signup

// переменная для доступа к локаторам на странице
let signup1stepLocators = locators?.signUpLocators.signUp1Step;

const signUp1Step = {
    //сохранение сида и успешный переход на страницу введения данных профиля
     signUp1StepUser() {
        // сохранение кода изображением
        cy
        .get(`${signup1stepLocators.saveQRButton}`)
        .should('be.visible')
        .trigger('mouseover')
        .click();
        // сохранение кода текстом
       cy.get(`${signup1stepLocators.saveTextButton}`)
        .should('be.visible')
        .trigger('mouseover')
        .click();
        // активация чек-бокса
         cy.get(`${signup1stepLocators.checkboxSavedSeed}`)
        .should('not.be.checked')
        .check({force: true})
        .should('be.checked');
        // переход на следующую страницу
         cy.get(`${signup1stepLocators.signupNextButton}`)
        .should('be.visible')
        .trigger('mouseover')
        .click()
        .wait(1000)
        /*
        await t
            .hover(this.saveQRButton)
            .expect(this.saveQRButton.visible)
            .ok({ timeout: 3000 })
            .click(this.saveQRButton)
            .hover(this.saveTextButton)
            .expect(this.saveTextButton.visible)
            .ok({ timeout: 3000 })
            .click(this.saveTextButton)
            .hover(this.checkboxSavedSeed)
            .expect(this.checkboxSavedSeed.visible)
            .ok({ timeout: 3000 })
            .click(this.checkboxSavedSeed)
            .hover(this.signupNextButton)
            .expect(this.signupNextButton.visible)
            .ok({ timeout: 3000 })
            .click(this.signupNextButton)
            .wait(3000);*/
    },
    //сохранение изображения сида и проверка неактивности кнопки Next
     signUp1StepUserFailled() {
        //сохранение изображения с кодом
         cy.get(`${signup1stepLocators.saveQRButton}`)
        .trigger('mouseover')
        .should("be.visible")
        .wait(2000)
        .click();
        // проверка, что кнопка Next не активирована
         cy.get(`${signup1stepLocators.signupNextButton}`)
        .should('have.attr', 'disabled')
        .wait(2000)
        /*await t
            .hover(this.saveQRButton)
            .expect(this.saveQRButton.visible)
            .ok({ timeout: 3000 })
            .click(this.saveQRButton)
            .expect(this.signupNextButton.hasAttribute("disabled"))
            .ok()
            .wait(3000);*/
    },
};
export default signUp1Step