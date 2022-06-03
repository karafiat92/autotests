/// <reference types="cypress"/>

import testData from '../../../support/testData';

function checkFields(selectorName, selectorData) {
    cy.get(selectorName)
        .should("be.visible")
        .should("contain.value", selectorData);
}

const settings = {
    // локаторы
    //main Page Locators
    settingsButton: "#settingsButton", 
    editProfileButton: '#editProfileButton',
    saveProfileButton: '#saveProfileButton',
    logOutButton: '#logOutButton',
    fiatButton: '#fiatButton > div',
    privacyButton: '#privacyButton',
    seedPhraseButton: '#seedPhraseButton',
    seedPhraseParagraph: ".StyledSeedPhraseModal_s1m6gcfy",
    seedCloseButton: "#modalSeedPhraseCloseButton",
    pinInput: ["#pin_0", "#pin_1", "#pin_2", "#pin_3"],
    kycButton: '#kycButton',
    name: '#myFullName',
    //edit Profile Locators
    firstnameInput: "#first_name",
    lastnameInput: "#last_name",
    usernameInput: "#username",
    saveButton: "#saveProfileButton",
    backButton: "#settingsBackBtn",

    // операции
    openSettings() {
        cy
            .get(this.settingsButton)
            .trigger('mouseover')
            .should('be.visible')
            .click()
            .wait(500)
            .url()
            .should('equal', testData.urls.settingsUrl)
        return this
    },
    openEditProfile() {
        cy
            .get(this.editProfileButton)
            .trigger('mouseover')
            .should('be.visible')
            .and('be.enabled')
            .click()
            .wait(500)
            .url()
            .should('equal', testData.urls.editProfileUrl)
        return this
    },
    checkingUserData(user) {
        checkFields(
            this.firstnameInput,
            user.firstname
        );
        checkFields(
            this.lastnameInput,
            user.lastname
        );
        checkFields(
            this.usernameInput,
            user.username
        );
        return this
    },
    saveProfileData() {
        cy.url()
            .should("eq", testData.urls.editProfileUrl)
        cy.get(this.saveButton)
            .click()
            .wait(2000)
        cy.url()
            .should('eq', testData.urls.settingsUrl)
        return this
    },
    openSeedPhrase() {
        cy
            .get(this.seedPhraseButton)
            .trigger('mouseover')
            .should('be.visible')
            .click()
            .wait(500)
            .url()
            .should('equal', testData.urls.settingsUrl)
        return this
    },
    enterPincode(user) {
        this.pinInput.forEach(pin => {
            cy.get(pin).type(user.pin)
        })
        return this
    },
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
        return this
    },
    closeSeedWindow(){
        cy.get(this.seedCloseButton)
        .should('be.visible')
        .and('be.enabled')
        .click()
        cy.get(this.seedCloseButton)
        .should('not.exist')
        return this
    },
    logout() {
        cy
            .get(this.logOutButton)
            .trigger('mouseover')
            .should('be.visible')
            .click()
            .wait(1500)
            .url()
            .should('equal', testData.urls.startUrl)
    }
}
export default settings