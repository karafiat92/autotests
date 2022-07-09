import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../data/url';
import user from '../data/user';
import wallets from './wallets';
import signUp2Step from './signup2step';
import fiat from '../data/fiat';

// https://dev.web.tezro.com/main/fiat-currency
const fiatCurrency = {
    addCardButton: Selector('#addCardButton'),
    cardNumberIFrame: Selector('iframe').nth(0),
    expDateIFrame: Selector('iframe').nth(1),
    cvvIFrame: Selector('iframe').nth(2),
    holderNameInput: Selector('#holder'),
    cardNumberInput: Selector('input[name="cardnumber"]'),
    expDateInput: Selector('input[name="exp-date"]'),
    cvvInput: Selector('input[name="cvc"]'),
    saveAddNewButton: Selector('#saveAddNewCard'),
    rechargeButton: Selector('#rechargeBtn'),
    checkboxCardButton: Selector('#checkboxCardButton'),
    cardItem: Selector('.cardItem'),
    allCard: 0,
    summaInput: Selector('#summa'),
    modalFiatCurrency: Selector('#modalFiatCurrency'),
    chooseFiat: Selector('.chooseCurrency'),
    successModal: Selector('#titleInfoModal').withText('Success'),
    cancelModalButton: Selector('#closeInfoModalBtn'),
    historyButton: Selector('#openChargeHistory'),
    chargeItem: Selector('.chargeHistoryItem'),
    backButton: Selector('#rechargeBackBtn'),
    //backButton: Selector('#settingsBackBtn'),
    errorText1: Selector('.errorText').withText('Required field'),
    errorText2: Selector('.errorText'),
    errorText3: Selector('.errorText').withText('Enter first name AND last name'),
    errorText4: Selector('div#tooltip').withText('Your card number is incomplete'),
    errorText5: Selector('div#tooltip').withText('Your card number is invalid'),
    errorText6: Selector('div#tooltip').withText("Your card's expiration date is incomplete"),
    errorText7: Selector('div#tooltip').withText("Your card's expiration date is in the past"),
    errorText8: Selector('div#tooltip').withText("Your card's security code is incomplete"),
    errorText9: Selector('div#tooltip').withText('Required field'),

    async addCard() {
        await t
            .hover(this.addCardButton)
            .expect(this.addCardButton.visible).ok({ timeout: 5000 })
            .click(this.addCardButton)
            .wait(7000);
    },

    async dataCard(cardHolder, cardNumber, expDate, cvv) {
        let cardNumberFormat = "";
        let expDataFormat = "";
        if (cardNumber) {
            cardNumberFormat = cardNumber.slice(0, 4) + ' ' + cardNumber.slice(4, 8) + ' ' + cardNumber.slice(8, 12) + ' ' + cardNumber.slice(12);
        }
        if (expDate) {
            expDataFormat = expDate.slice(0, 2) + ' / ' + expDate.slice(2);
        }
        signUp2Step.typeTextData(this.holderNameInput, cardHolder);
        await t.switchToIframe(this.cardNumberIFrame);
        signUp2Step.typeTextDataFormat(this.cardNumberInput, cardNumber, cardNumberFormat);
        await t.switchToMainWindow();
        await t.switchToIframe(this.expDateIFrame);
        signUp2Step.typeTextDataFormat(this.expDateInput, expDate, expDataFormat);
        await t.switchToMainWindow();
        await t.switchToIframe(this.cvvIFrame);
        signUp2Step.typeTextData(this.cvvInput, cvv);
        await t.switchToMainWindow();
    },
    async setCheckboxCard() {
        await t
            .hover(this.checkboxCardButton)
            .expect(this.checkboxCardButton.visible).ok({ timeout: 5000 })
            .click(this.checkboxCardButton)
            .wait(3000);
    },
    async back() {
        await t
            .hover(this.backButton)
            .expect(this.backButton.visible).ok({ timeout: 5000 })
            .click(this.backButton)
            .wait(5000);
    },
    async saveAddNew() {
        await t
            .hover(this.saveAddNewButton)
            .expect(this.saveAddNewButton.visible).ok({ timeout: 5000 })
            .click(this.saveAddNewButton)
            .wait(10000);
    },
    async rechargeCard() {
        await t
            .hover(this.rechargeButton)
            .expect(this.rechargeButton.visible).ok({ timeout: 5000 })
            .click(this.rechargeButton)
            .wait(10000);
    },
    async countCard() {
        this.allCard = await this.cardItem.count;

    },
    async checkCard(cardNumber) {
        let currentCardItem = await this.cardItem.nth(0).child('div').child('div').child('p').nth(1);
        let currentTypeItem = await this.cardItem.nth(0).child('div').nth(1).child('img');
        const lastNumber = cardNumber.slice(12);
        await t
            .hover(currentCardItem)
            .expect(currentCardItem.textContent).eql(lastNumber);
        if (cardNumber == fiat[0].cardNumber) {
            const typeItem = await currentTypeItem.withAttribute('src', fiat[0].typeCard).exists;
            await t.expect(typeItem).ok({ timeout: 5000 });
        }
        else if (cardNumber == fiat[5].cardNumber) {
            const typeItem = await currentTypeItem.withAttribute('src', fiat[5].typeCard).exists;
            await t.expect(typeItem).ok({ timeout: 5000 });
        }
    },
    async submitNotActive() {
        await t
            .expect(this.submitButton.hasAttribute('disabled')).ok();

    },
    async recharge(CardWith3ds, summa, fiat) {
        const fiatCurrency = this.chooseFiat.nth(fiat);
        let card = "";
        if (CardWith3ds == 0) {
            card = await this.cardItem.find('p').withText("4242");
        }
        else if (CardWith3ds = 1) {
            card = await this.cardItem.find('p').withText("3220");
        }

        await t
            .hover(card)
            .expect(card.visible).ok({ timeout: 5000 })
            .click(card)
            .wait(3000)
            .hover(this.modalFiatCurrency)
            .expect(this.modalFiatCurrency.visible).ok({ timeout: 5000 })
            .click(this.modalFiatCurrency)
            .wait(3000)
            .hover(fiatCurrency)
            .expect(fiatCurrency.visible).ok({ timeout: 5000 })
            .click(fiatCurrency)
            .wait(3000);

        signUp2Step.typeTextData(this.summaInput, summa);
        await t.wait(5000);
    },
    async successRecharge() {
        await t
            .expect(this.successModal.visible).ok({ timeout: 5000 })
            .hover(this.cancelModalButton)
            .expect(this.cancelModalButton.visible).ok({ timeout: 5000 })
            .click(this.cancelModalButton)
            .wait(5000);

    },
    async checkTransaFiatWallet(amountFiat, name, n) {
        let balance = Number(wallets.balanceUserReceive) + Number(amountFiat);
        balance = balance.toFixed(n)

        const itemAmount = await wallets.transaItemAmount.textContent;
        const itemBalance = await wallets.totalBalance.textContent;
        await t
            .expect(Number(itemAmount)).gte(Number(amountFiat))
            .expect(wallets.transaItemName.textContent).eql(name)
            .expect(Number(itemBalance)).gte(Number(balance))
            .wait(5000);
    },
    async history(summa, fiat) {
        await t
            .expect(this.historyButton.visible).ok({ timeout: 5000 })
            .hover(this.historyButton)
            .expect(this.historyButton.visible).ok({ timeout: 5000 })
            .click(this.historyButton)
            .wait(5000);
        let currentChargeItem = await this.chargeItem.nth(0).child('div').child('p').nth(0).textContent;
        let paymentInfo = currentChargeItem.split(' ');
        let summaHistory = paymentInfo[0];
        let currencyHistory = paymentInfo[1];
        const currentStatusChargeItem = await this.chargeItem.nth(0).child('div').child('p').nth(1);
        await t
            .expect(currentStatusChargeItem.textContent).eql('Payment succeeded')
            .expect(Number(summaHistory)).gte(Number(summa));

        if (fiat == 0) {
            await t.expect(currencyHistory).eql("USD")
        }
        else if (fiat == 1) {
            await t.expect(currencyHistory).eql("EUR")
        }
        else if (fiat == 2) {
            await t.expect(currencyHistory).eql("CNY")
        }

    },

    async invalidAmount(fiat) {
        let errorAmount = "";
        if (fiat == 0) {
            errorAmount = await this.errorText2.withText('Minimum amount for transfer $1')
        }
        else if (fiat == 1) {
            errorAmount = await this.errorText2.withText('Minimum amount for transfer $0.87')
        }
        else if (fiat == 2) {
            errorAmount = await this.errorText2.withText('Minimum amount for transfer $6.45')
        }
        const errorCount = Selector(errorAmount).count;
        await t
            .expect(errorCount).eql(1, 'errors "Minimum amount for transfer" should be 1')
            .expect(this.rechargeButton.hasAttribute('disabled')).ok()
    },
    async EmptyField1() {
        const errorCount = Selector(this.errorText1).count;
        await t
            .expect(errorCount).eql(1, 'errors "Required field" should be 1')
        //  .expect(this.submitButton.hasAttribute('disabled')).ok()
    },
    async EmptyField2() {
        const errorCount = Selector(this.errorText9).count;
        await t
            .expect(errorCount).eql(1, 'errors "Required field" should be 1')
        //   .expect(this.submitButton.hasAttribute('disabled')).ok()
    },
    async invalidName() {
        const errorCount = Selector(this.errorText3).count;
        await t
            .expect(errorCount).eql(1, 'errors "Enter first name AND last name" should be 1')
        // .expect(this.submitButton.hasAttribute('disabled')).ok()
    },
    async invalidCard() {

        const errorCount = Selector(this.errorText5).count;
        await t
            .expect(errorCount).eql(1, 'errors "Your card number is invalid" should be 1')
        // .expect(this.submitButton.hasAttribute('disabled')).ok()
    },
    async notCompletedCard() {
        const errorCount = Selector(this.errorText4).count;
        await t
            .expect(errorCount).eql(1, 'errors "Your card number is incomplete" should be 1')
        //.expect(this.submitButton.hasAttribute('disabled')).ok()
    },
    async invalidData() {
        const errorCount = Selector(this.errorText7).count;
        await t
            .expect(errorCount).eql(1, 'errors "Your cards expiration date is in the past" should be 1')
        //.expect(this.submitButton.hasAttribute('disabled')).ok()
    },
    async notCompletedData() {
        const errorCount = Selector(this.errorText6).count;
        await t
            .expect(errorCount).eql(1, 'errors "Your cards expiration date is incomplete" should be 1')
        //.expect(this.submitButton.hasAttribute('disabled')).ok()
    },
    async notCompletedCvv() {
        const errorCount = Selector(this.errorText8).count;
        await t
            .expect(errorCount).eql(1, 'errors "Your cards security code is incomplete" should be 1')
        // .expect(this.submitButton.hasAttribute('disabled')).ok()
    },

}
export default fiatCurrency


