import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../data/url';
import contactData from '../data/contacts';
import searchData from '../data/search';
import signUp2Step from './signup2step';

// раздел Contacts, url нет
const contacts = {
    contactsButton: Selector('#contactsButton'),
    addContactButton: Selector('#addContactButton'),
    nameInput: Selector('#firstName'),
    surnameInput: Selector('#lastName'),
    phoneInput: Selector('#phone'),
    contactItem: Selector('#contactItem'),
    createButton: Selector('#createButton'),
    countryButton: Selector('#countryButton'),
    searchCountryInput: Selector('#countrySearch'),
    chooseCountryButton: Selector('.countryItem'),
    modalCountry: Selector('#modalCountryList'),
    searchContactInput: Selector('#searchField'),
    phoneFormat: "",
    errorText1: Selector('.errorText').withText('Required field'),
    errorText2: Selector('.errorText').withText('Invalid value'),
    closeAddModalButton: Selector('#closeAddModalButton'),

    async toContacts() {
        await t
            .hover(this.contactsButton)
            .expect(this.contactsButton.visible).ok({ timeout: 3000 })
            .click(this.contactsButton)
            .wait(5000);

    },
    async contactsUrl() {
        const getPageURL1 = ClientFunction(() => window.location.href);
        await t
            .expect(getPageURL1()).eql(urls.contactsUrl);

    },

    async addContact(name, surname, country, phone) {

        await t
            .hover(this.addContactButton)
            .expect(this.addContactButton.visible).ok({ timeout: 3000 })
            .click(this.addContactButton);
        signUp2Step.typeTextData(this.nameInput, name);
        signUp2Step.typeTextData(this.surnameInput, surname);
        await t
            .hover(this.countryButton)
            .expect(this.countryButton.visible).ok({ timeout: 3000 })
            .click(this.countryButton)
            .wait(2000)
            .scroll(this.modalCountry, 'bottom')
            .wait(2000)
            .typeText(this.searchCountryInput, country, { replace: true })
            .expect(this.searchCountryInput.value).eql(country)
            .click(this.chooseCountryButton.withText(country))
            .wait(3000);
        signUp2Step.getPhoneFormat(this.phoneInput, phone, country);
        await t.wait(3000);
        const phnFormat = signUp2Step.phoneFormat;
        signUp2Step.typeTextDataFormat(this.phoneInput, phone, phnFormat);
        await t.wait(3000);

    },
    async createContact() {
        await t
            .hover(this.createButton)
            .expect(this.createButton.visible).ok({ timeout: 3000 })
            .click(this.createButton)
            .wait(3000);
    },
    async checkContact(name, surname) {
        const item = this.contactItem.withText(name + " " + surname).exists;
        await t
            .expect(item).ok('the contact must be displayed in the contact list')
            .click(this.contactItem.withText(name + " " + surname))
            .wait(3000);

    },
    async searchContact(contact) {
        await t
            .typeText(this.searchContactInput, contact, { replace: true })
            .wait(3000)
            .expect(this.searchContactInput.value).eql(contact)
            .wait(3000);
    },
    async contactItemExists(contact) {
        const contactItemSearch = this.contactItem.withText(contact).exists;
        await t
            .expect(contactItemSearch).ok('contact must be found')
            .hover(this.contactItem.withText(contact))
            .click(this.contactItem.withText(contact))
            .wait(5000);
    },
    async contactItemNotExists(contact) {
        const contactItemSearch = this.contactItem.withText(contact).exists;
        await t
            .expect(contactItemSearch).notOk('contact must be not found')
            .wait(5000);
    },
    async errorEmptyPhone() {
        const error = this.errorText1.count;
        await t
            .click(this.phoneInput)
            .expect(error).eql(1, 'errors "Required field" should be 1')
            .expect(this.createButton.hasAttribute('disabled')).ok();
    },
    async errorInvalidPhone() {
        const error = this.errorText2.count;
        await t
            .click(this.phoneInput)
            .expect(error).eql(1, 'errors "Invalid value" should be 1')
            .expect(this.createButton.hasAttribute('disabled')).ok();
    },
    async errorEmptyName() {
        const error = this.errorText1.count;
        await t
            .click(this.nameInput)
            .expect(error).eql(1, 'errors "Required field" should be 1')
            .expect(this.createButton.hasAttribute('disabled')).ok();
    },
    async closeAddContactModal() {
        await t
            .hover(this.closeAddModalButton)
            .expect(this.closeAddModalButton.visible).ok({ timeout: 3000 })
            .click(this.closeAddModalButton)
            .wait(3000);
    },
}
export default contacts