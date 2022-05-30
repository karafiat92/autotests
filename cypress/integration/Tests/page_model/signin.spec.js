/*
Класс signIn, включающий в себя функции авторизации:
signInStepUser - введение сид-фразы и нажатие кнопки log in
signInStepUserWithQR - загрузка кода
signInStepUserNotQR - загрузка файла, не являющегося кодом
signInStepUserClickSend - проверки сида и переход к пинкоду
errorTextSeedPhraseInvalid
errorTextSeedPhraseEmpty
errorQRInvalidModal
errorNotImageModal 
signInEnterPinUser - введение пинкода
*/
/*
/// <reference types="cypress"/>

import locators from '../../../support/elementsLocators';
import signUp2Step from './signup2step';

//https://dev.web.tezro.com/login

let signinLocators = locators?.signInLocators.signIn

const signIn = {

    async signInStepUser(seedPhrase) {
        cy.get(`${signinLocators.loginButton}`)
        .trigger('mouseover')
        .should('be.disabled')
        signUp2Step.typeTextData(`${signinLocators.seedPhraseInput}`, seedPhrase);
         cy.get(`${signinLocators.loginButton}`)
         .trigger('mouseover')
         .wait(1000)
         .should('be.visible')
         .should('not.be.disabled')
         .click
         .wait(1000)*/
/*          .hover(this.sendButton)
            .expect(this.sendButton.visible)
            .ok({ timeout: 3000 })
            .click(this.sendButton)
            .wait(3000);*/
    /*},
    async signInStepUserWithQR(QRcode, seedPhrase) {
         t
            .setFilesToUpload(`${signinLocators.uploadSeedPhrase}`, QRcode)
            .expect(this.seedPhraseInput.value)
            .eql(seedPhrase);
    },
    async signInStepUserClickSend() {
         cy.
            .hover(this.sendButton)
            .expect(this.sendButton.visible)
            .ok({ timeout: 3000 })
            .click(this.sendButton)
            .wait(3000);
    },
    async signInStepUserNotQR(QRcode) {
        await t.setFilesToUpload(this.uploadSeedPhrase, QRcode);
    },

    async errorTextSeedPhraseInvalid() {
        await t
            .hover(this.seedPhraseInput)
            .wait(2000)
            .expect(this.errorText1.visible)
            .ok('errors "Invalid seed-phase" should be 1');
    },
    async errorTextSeedPhraseEmpty() {
        await t
            .hover(this.seedPhraseInput)
            .wait(2000)
            .expect(this.errorText2.visible)
            .ok('errors "Seed-phase cannot be empty" should be 1');
    },
    async errorQRInvalidModal() {
        await t
            .expect(this.errorModal1.visible)
            .ok('errors "Invalid QR code" should be 1')
            .expect(this.errorButton.visible)
            .ok({ timeout: 3000 })
            .click(this.errorButton)
            .wait(3000);
    },
    async errorNotImageModal() {
        await t
            .expect(this.errorModal2.visible)
            .ok('errors "Invalid file" should be 1')
            .expect(this.errorButton.visible)
            .ok({ timeout: 3000 })
            .click(this.errorButton)
            .wait(3000);
    },
    async signInEnterPinUser(pin) {
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
            .wait(5000);
    },
};
export default signIn*/