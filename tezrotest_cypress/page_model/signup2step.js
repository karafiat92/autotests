import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import user from '../cypressTeztoTests/data/user';
import urls from '../cypressTeztoTests/data/url';

//https://dev.web.tezro.com/signup форма для заполнения юзера

const signUp2Step = {
       async typeTextData(selectorName, textData) {
        if (textData) {
            await t
                .typeText(selectorName, textData, { replace: true })
                .expect(selectorName.value)
                .eql(textData);
        }
    },
    async typeTextDataFormat(selectorName, textData, textDataFormat) {
        if (textData) {
            await t
                .typeText(selectorName, textData, { replace: true })
                .hover(selectorName)
                .expect(selectorName.value)
                .eql(textDataFormat);
        }
    },
    async getPhoneFormat(selectorName, textData, country) {
        if (country == "") {
            if (textData) {
                await t.click(selectorName);
                const phoneCurrent = await selectorName.value;
                const code = phoneCurrent.slice(0, 4);
                this.phoneFormat =
                    code +
                    " " +
                    textData.slice(0, 2) +
                    " " +
                    textData.slice(2, 5) +
                    " " +
                    textData.slice(5);
            }
        } else if (country == "American Samoa") {
            if (textData) {
                await t.click(selectorName);
                const dataphone = await selectorName.value;
                const code = dataphone.slice(0, 2);
                this.phoneFormat =
                    code +
                    " " +
                    textData.slice(0, 3) +
                    " " +
                    textData.slice(3, 6) +
                    " " +
                    textData.slice(6);
            }
        } else if (country == "Russia") {
            if (textData) {
                await t.click(selectorName);
                const dataphone = await selectorName.value;
                const code = dataphone.slice(0, 2);
                this.phoneFormat =
                    code +
                    " " +
                    textData.slice(0, 3) +
                    " " +
                    textData.slice(3, 6) +
                    " " +
                    textData.slice(6, 8) +
                    " " +
                    textData.slice(8);
            }
        }
    },
    async signUp2StepUser({ firstname, lastname, country, phone, username }) {
        this.typeTextData(this.firstNameInput, firstname);
        this.typeTextData(this.lastNameInput, lastname);

        await t
            .hover(this.countryButton)
            .expect(this.countryButton.visible)
            .ok({ timeout: 3000 })
            .click(this.countryButton)
            .wait(2000)
            .scroll(this.modalCountry, "bottom")
            .wait(2000)
            .typeText(this.searchCountryInput, country)
            .expect(this.searchCountryInput.value)
            .eql(country)
            .click(this.chooseCountryButton.withText(country))
            .wait(3000);

        this.getPhoneFormat(this.phoneNumberInput, phone, country);
        await t.wait(3000);
        const phnFormat = this.phoneFormat;
        this.typeTextDataFormat(this.phoneNumberInput, phone, phnFormat);
        await t.wait(3000);
        this.typeTextData(this.usernameInput, username);

        await t
            .hover(this.nextButton)
            .expect(this.nextButton.visible)
            .ok()
            .click(this.nextButton)
            .wait(5000);
    },
    async errorTextUsernameMin() {
        const error = this.errorText1.count;
        await t
            .expect(error)
            .eql(1, 'errors "Minimum length is 5 symbols" should be 1');
    },
    async errorTextUsernameInvalid1() {
        const error = this.errorText3.count;
        await t.expect(error).eql(1, 'errors "Invalid username" should be 1');
    },
    async errorTextUsernameInvalid2() {
        const error = this.errorText7.count;
        await t
            .expect(error)
            .eql(1, 'errors "At least one letter is required" should be 1');
    },
    async errorTextUsernameOccupied() {
        const error = this.errorText4.count;
        await t
            .expect(error)
            .eql(1, 'errors "Username is already taken" should be 1');
    },
    async errorTextNameInvalid() {
        const error = this.errorText5.count;
        await t
            .expect(error)
            .eql(1, 'errors "Only latin characters allowed" should be 1');
    },
    async errorTextPhoneInvalid() {
        const error = this.errorText6.count;
        await t.expect(error).eql(1, 'errors "Invalid value" should be 1');
    },
    async errorTextMaxLetters() {
        const error = this.errorText8.count;
        await t
            .expect(error)
            .eql(1, 'errors "Maximum length is 32 symbols" should be 1');
    },
    async errorTextSpecialSymbol() {
        const error = this.errorText9.count;
        await t
            .expect(error)
            .eql(1, 'errors "Special symbols are not allowed" should be 1');
    },
    async errorTextFirstLetter() {
        const error = this.errorText10.count;
        await t
            .expect(error)
            .eql(1, 'errors "First character must be latin" should be 1');
    },
    async errorTextFieldEmpty() {
        const errorCount = Selector(this.errorText2).count;
        await t.expect(errorCount).eql(1, 'errors "Required field" should be 1');
    },
    async errorTextFieldEmptyAll() {
        const errorCount = Selector(this.errorText2).count;
        await t.expect(errorCount).eql(4, 'errors "Required field" should be 4');
    },
};
export default signUp2Step