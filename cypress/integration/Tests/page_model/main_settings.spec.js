/*
Главная страница с переходами на другие модули
settings - открытие настроек
editProfile - открытие редактирования профиля
seedPhrase - открытие экрана просмотра сид-фразы
fiatCurrency - переход на экран кредитных карт
privacySecurity - переход на экран безопасности
kyc - переход к прохождению верификации 
checkName - проверка соответствия имени, указанному при регистрации
logOut - выход из профиля
*/

/// <reference types="cypress"/>
import tezroData from '../tezro_data' 
import locators from '../elementsLocators';
let mainPageLocators = locators?.mainPageLocators;
let mainPageUser

//https://dev.web.tezro.com/main/settings

// функции перехода на разные экраны с главной страницы
 mainPageUser = {
//переход на экран настроек
    async settings() {
        cy
        .get(`${mainPageLocators.settingsButton}`)
        .trigger('mouseover')
        .should('be.visible')
        .click()
        .wait(500)
        .url()
        .should('equal', tezroData.urls.settingsUrl)
        /*
        const getPageURL1 = ClientFunction(() => window.location.href);
         t
            .hover(this.settingsButton)
            .expect(this.settingsButton.visible).ok({ timeout: 5000 })
            .click(this.settingsButton)
            .wait(3000)
            .expect(getPageURL1()).eql(urls.settingsUrl);
            */
    },
// открытие экрана редактирования профиля
    async editProfile() {
        cy
        .get(`${mainPageLocators.editProfileButton}`)
        .trigger('mouseover')
        .should('be.visible')
        .click()
        .wait(500)
        .url()
        .should('equal', tezroData.urls.editProfileUrl)
        /*
        const getPageURL2 = ClientFunction(() => window.location.href);
         t
            .hover(this.editProfileButton)
            .expect(this.editProfileButton.visible).ok({ timeout: 5000 })
            .click(this.editProfileButton)
            .wait(3000)
            .expect(getPageURL2()).eql(urls.editProfileUrl);
            */
    },/*
    async checkSelectorData(selectorName, selectorData) {
        cy
        .get(selectorName)
        .should('be.visible')
        .should('equal', selectorData)
        
            //.expect(this.name.textContent).eql(nameFormat);
    },*/

    async seedPhrase() {
        cy
        .get(`${mainPageLocators.seedPhraseButton}`)
        .trigger('mouseover')
        .should('be.visible')
        .click()
        .wait(500)
        .url()
        .should('equal', tezroData.urls.settingsUrl)
        /*await t
            .hover(this.seedPhraseButton)
            .expect(this.seedPhraseButton.visible).ok({ timeout: 5000 })
            .click(this.seedPhraseButton)
            .wait(3000);*/
    },
/*
    async fiatCurrency() {
        await t
            .hover(this.fiatButton)
            .expect(this.fiatButton.visible).ok({ timeout: 5000 })
            .click(this.fiatButton)
            .wait(3000);
    },
    async privacySecurity() {
        await t
            .hover(this.privacyButton)
            .expect(this.privacyButton.visible).ok({ timeout: 5000 })
            .click(this.privacyButton)
            .wait(3000);
    },
    async kyc() {
        await t
            .hover(this.kycButton)
            .expect(this.kycButton.visible).ok({ timeout: 5000 })
            .click(this.kycButton)
            .wait(3000);
    },*/
    // переход к выходу из профиля
    async logOut() {
        cy
        .get(`${mainPageLocators.logOutButton}`)
        .trigger('mouseover')
        .should('be.visible')
        .click()
        .wait(5000)
        //.url()
        //.should('equal', tezroData.urls.startUrl)
        /*
        const getPageURL3 = ClientFunction(() => window.location.href);
         t
            .hover(this.logOutButton)
            .expect(this.logOutButton.visible).ok({ timeout: 5000 })
            .click(this.logOutButton)
            .wait(10000)
            .expect(getPageURL3()).eql(urls.startUrl);
            */
    },


}
export default mainPageUser


