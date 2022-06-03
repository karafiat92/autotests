/// <reference types="cypress"/>

import testData from '../../../support/testData';


// локаторы и операции по прохождению регистрации
// на странице https://dev-web.tezro.com/signup

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
    }
}

const signUp = {
    // локаторы
    signUpButton: "#signupButton",
    saveQRButton: "#SeedPhraseQRCodeDowloadPNG",
    saveTextButton: "#SeedPhraseQRCodeDowloadTXT",
    checkboxSavedSeed: "#signUpChecksaved",
    signupNextButton: "#signUpFirstSubmit",
    firstNameInput: "#firstNameField",
    lastNameInput: "#lastNameField",
    usernameInput: "#usernameField",
    nextButton: "#signUpSecondSubmit",
    checkboxIOathSign: "#signUpCheckIOathSign",
    pinInput: ["#pin_0", "#pin_1", "#pin_2", "#pin_3"],
    seedPhraseParagraph: ".StyledSeedPhraseModal_s1m6gcfy",
    // стартовое состояние данных о юзере
    // сюда положим значения после регистрации 
    userUsername: "",

    // операции
    openSignupPage() {
        cy.viewport(1800, 950)
            .visit(testData.urls.startUrl);
        cy.url()
            .should("eq", testData.urls.startUrl);
        cy.get(this.signUpButton)
            .click();
        cy.url()
            .should("eq", testData.urls.signUpUrl);
        return this
    },
    saveSeedPhrase() {
        cy.get(this.saveQRButton)
            .should('be.visible')
            .trigger('mouseover')
            .click();
        // сохранение кода текстом
        cy.get(this.saveTextButton)
            .should('be.visible')
            .trigger('mouseover')
            .click();
        // активация чек-бокса
        cy.get(this.checkboxSavedSeed)
            .should('not.be.checked')
            .check({ force: true })
            .should('be.checked');
        // переход на следующую страницу
        cy.get(this.signupNextButton)
            .should('be.visible')
            .trigger('mouseover')
            .click()
            .wait(1000)
        return this
    },
    fillingUserData(user) {
        typeTextData(
            this.firstNameInput, 
            user.firstname
            )
        typeTextData(
            this.lastNameInput, 
            user.lastname
            )
        typeTextData(
            this.usernameInput, 
            user.username
            )
        this.userUsername = user.username
        cy.log(this.userUsername)
            // проверка кнопки регистрации: недоступна
            .get(this.nextButton)
            .should("be.visible")
            .should("have.attr", "disabled");
        return this
    },
    activateCheckbox() {
        // проверка чек-бокса: не активирован, активирован
        cy
            .get(this.checkboxIOathSign)
            .should("not.be.checked")
            .check({ force: true })
            .wait(500)
            .should("be.checked");
        // проверка кнопки регистрации: доступна, срабатывает
        cy
            .get(this.nextButton)
            .should("be.visible")
            .should("be.enabled")
            .click()
            .wait(2000);
            return this
    },
    enterPincode(user) {
        this.pinInput.forEach(pin => {
            cy.get(pin).type(user.pin)
        })
        return this
    }
}
export default signUp