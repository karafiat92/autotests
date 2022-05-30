import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../data/url';
import signUp2Step from './signup2step';
//https://dev.web.tezro.com/main/edit-profile + раздел с сидфразой

const settings = {
    modalSeedPhrase: Selector('#modalSeedPhrase'),
    copySeedPhraseButton: Selector('#copySeedPhraseButton'),
    saveQRSeedButton: Selector('#saveQRSeedButton'),
    modalSeedPhraseCloseButton: Selector('#modalSeedPhraseCloseButton'),
    firstNameInput: Selector('#first_name'),
    lastNameInput: Selector('#last_name'),
    avatarInput: Selector('input[type="file"]'),
    oldAvatar: "",
    newAvatar: "",
    defaultAvatar: "data:image/png;base64,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",
    currentAvatar: Selector('#avatarImage'),//в настройках 
    currentAvatarInSettings: Selector('#avatarInSettings'), // при изменении??
    saveChangeButton: Selector('#saveProfileButton'),
    errorText1: Selector('.errorText').withText('Maximum length is 32 symbols'),
    errorText2: Selector('.errorText').withText('Required field'),
    errorText3: Selector('.errorText').withText('Only latin characters allowed'),
    errorText4: Selector('.errorText').withText('Special symbols are not allowed'),
    errorText5: Selector('.errorText').withText('First character must be latin'),


    async saveSeedPhrase() {
        const modal = this.modalSeedPhrase.exists;
        await t
            .expect(modal).ok()
            .hover(this.copySeedPhraseButton)
            .expect(this.copySeedPhraseButton.visible).ok({ timeout: 5000 })
            .click(this.copySeedPhraseButton)
            .hover(this.saveQRSeedButton)
            .expect(this.saveQRSeedButton.visible).ok({ timeout: 5000 })
            .click(this.saveQRSeedButton)
            .hover(this.modalSeedPhraseCloseButton)
            .expect(this.modalSeedPhraseCloseButton.visible).ok({ timeout: 5000 })
            .click(this.modalSeedPhraseCloseButton)
            .wait(3000);
    },

    async changeName(firstname, lastname) {

        signUp2Step.typeTextData(this.firstNameInput, firstname);
        await t.hover(this.saveChangeButton);
        signUp2Step.typeTextData(this.lastNameInput, lastname);
        if (!firstname) {
            await t
                .selectText(this.firstNameInput)
                .pressKey('delete')
                .wait(2000);
        }
        else if (!lastname) {
            await t
                .selectText(this.lastNameInput)
                .pressKey('delete')
                .wait(2000);
        }
        await t
            .hover(this.saveChangeButton)
            .expect(this.saveChangeButton.visible).ok({ timeout: 5000 })
            .click(this.saveChangeButton)
            .wait(3000);
    },

    async hoverFirstname() {
        await t.hover(this.firstNameInput);
    },
    async hoverLastname() {
        await t.hover(this.lastNameInput);
    },
    async errorTextMaxLetters() {
        const error = this.errorText1.count;
        await t.expect(error).eql(1, 'errors "Maximum length is 32 symbols" should be 1');
    },
    async errorTextEmptyField() {
        const error = this.errorText2.count;
        await t.expect(error).eql(1, 'errors "Required field" should be 1');
    },
    async errorTextNameInvalid() {
        const error = this.errorText3.count;
        await t.expect(error).eql(1, 'errors "Only latin characters allowed" should be 1');
    },
    async errorTextSpecialSymbol() {
        const error = this.errorText4.count;
        await t.expect(error).eql(1, 'errors "Special symbols are not allowed" should be 1');
    },
    async errorTextFirstSymbolNotLatin() {
        const error = this.errorText5.count;
        await t.expect(error).eql(1, 'errors "First character must be latin" should be 1');
    },

}
export default settings


