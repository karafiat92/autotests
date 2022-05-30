import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../data/url';

//https://dev.web.tezro.com/main/settings

const mainPageUser = {
    settingsButton: Selector('#settingsButton'),
    editProfileButton: Selector('#editProfileButton'),
    saveProfileButton: Selector('#saveProfileButton'),
    logOutButton: Selector('#logOutButton'),
    fiatButton: Selector('#fiatButton > div'),
    privacyButton: Selector('#privacyButton'),
    seedPhraseButton: Selector('#seedPhraseButton'),
    kycButton: Selector('#kycButton'),
    name: Selector('#myFullName'),


    async settings() {
        const getPageURL1 = ClientFunction(() => window.location.href);
        await t
            .hover(this.settingsButton)
            .expect(this.settingsButton.visible).ok({ timeout: 5000 })
            .click(this.settingsButton)
            .wait(3000)
            .expect(getPageURL1()).eql(urls.settingsUrl);
    },

    async editProfile() {
        const getPageURL2 = ClientFunction(() => window.location.href);
        await t
            .hover(this.editProfileButton)
            .expect(this.editProfileButton.visible).ok({ timeout: 5000 })
            .click(this.editProfileButton)
            .wait(3000)
            .expect(getPageURL2()).eql(urls.editProfileUrl);
    },

    async seedPhrase() {
        await t
            .hover(this.seedPhraseButton)
            .expect(this.seedPhraseButton.visible).ok({ timeout: 5000 })
            .click(this.seedPhraseButton)
            .wait(3000);
    },

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
    },
    async checkName(firstname, lastname) {
        const nameFormat = firstname + " " + lastname
        await t
            .expect(this.name.textContent).eql(nameFormat);
    },
    async logOut() {
        const getPageURL3 = ClientFunction(() => window.location.href);
        await t
            .hover(this.logOutButton)
            .expect(this.logOutButton.visible).ok({ timeout: 5000 })
            .click(this.logOutButton)
            .wait(10000)
            .expect(getPageURL3()).eql(urls.startUrl);
    },


}
export default mainPageUser


