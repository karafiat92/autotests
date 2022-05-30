import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../data/url';
import contactData from '../data/contacts';
import messagesData from '../data/messages.js';
import messages from './messages';
import signUp2Step from './signup2step';

//https://dev.web.tezro.com/main/wallet

const wallets = {
    walletsButton: Selector('#walletsButton'),
    chooseWalletButton: Selector('.walletCryptoItem'),
    transaItemAmount: Selector('.transactionAmount'),
    transaItemName: Selector('.transactionUserName'),
    totalBalance: Selector('#transactionHistoryWalletBalance'),
    sendButton: Selector('#transactionHistorySendBtn'),
    getButton: Selector('#transactionHistoryGetBtn'),
    addressInput: Selector('#address'),
    amountInput: Selector('#amount'),
    nextButton: Selector('#sendTransactionModalNextBtn'),
    confirmButton: Selector('#sendTransactionInfoModalSendBtn'),
    addressInfo: Selector('#sendTransactionInfoModalWalletAddress'),
    successModal: Selector('#titleInfoModal').withText('Success'),
    okButton: Selector('#closeInfoModalBtn'),
    qrCrypto: Selector('#qrReaderInput'),
    balanceUserSent: 0,
    balanceCurrentUserSent: 0,
    chooseCryproModalButton: Selector('div.ReactModal__Content > div > div > div'),
    balanceUserReceive: 0,
    closeModalSendButton: Selector('#sendTransactionModalCloseBtn'),
    closeModalGetButton: Selector('#getTransactionModalCloseBtn'),
    getAddressInput: Selector('#walletAddress'),
    getAddressMemoInput: Selector('#walletMemo'),
    downloadQRButton: Selector('#getTransactionModalDownloadQrBtn'),
    shareModalButton: Selector('div.ReactModal__Content > div > div > button[type="button"]').nth(0),//старый селектор
    contactItem: Selector('div.shared_choose_contact_modal__contact_list_item_content > div'), //старый селектор
    shareButton: Selector('div.shared_choose_contact_modal__buttons > button.template_button--primary_hover'), //старый селектор
    shareButtonDisable: Selector('div.shared_choose_contact_modal__buttons > button.template_button--default').nth(1), //старый селектор
    getFiatButton: Selector('#transactionHistoryGetBtn'),
    noteFiatInput: Selector('#paypalNote'),
    sumFiatInput: Selector('#paypalCurrency'),
    emailFiatnput: Selector('#email'),
    sendRequestButton: Selector('#payMeModalSendBtn'),
    copyLinkButton: Selector('#payMeModalCopyLinkBtn'),
    chooseWalletFiatButton: Selector('.walletFiatItem'),
    urlPaste: "",
    amountLabel: Selector('#payMeModalCurrencyAndAmount'),
    nameLabel: Selector('#payMeModalRequestFrom'),
    changeWalletModal: Selector('#textInfoModal').withText("Address you entered doesn't belong to chosen currency"),
    changeWalletModalButton: Selector('#submitInfoModalBtn'),
    errorText: Selector('.errorText').withText('Address not valid'),
    errorText1: Selector('.errorText').withText('Minimum value is 1'),
    errorText2: Selector('.errorText').withText('Minimum value is 0.82'),
    errorText3: Selector('.errorText').withText('Minimum value is 6.54'),
    errorText4: Selector('.errorText').withText('Invalid email'),
    errorText5: Selector('.errorText').withText('Required field'),
    errorText6: Selector('.errorText').withText('Minimum amount for transfer 0.00000001'),
    errorText7: Selector('.errorText').withText('The amount entered exceeds the wallet balance'),
    closeModalRequestButton: Selector('#payMeModalCloseBtn'),
    modalQwnQr: Selector('#textInfoModal').withText("This address belongs to you and can't be used to send a transaction"),
    closeModalQwnQr: Selector('#closeInfoModalBtn'),
    chooseFiat: Selector('.chooseCurrency'),
    modalFiatCurrency: Selector('#payMeModalChooseCurrencyBtn'),

    async toWallets() {
        const getPageURL1 = ClientFunction(() => window.location.href);
        await t
            .hover(this.walletsButton)
            .expect(this.walletsButton.visible).ok({ timeout: 3000 })
            .click(this.walletsButton)
            .wait(5000)
            .expect(getPageURL1()).eql(urls.walletUrl);

    },
    async chooseWallet(wallet) {
        const getPageURL1 = ClientFunction(() => window.location.href);
        const numWallet = await this.chooseWalletButton.nth(wallet);
        await t.wait(2000);
        await t
            .hover(numWallet)
            .expect(numWallet.visible).ok({ timeout: 3000 })
            .click(numWallet)
            .wait(3000);
        //.expect(getPageURL1()).eql(urls.chooseWalletUrl)
    },
    async checkTransaChatUserSent(amountCrypto, name) {
        const balance = String(messages.balanceCurrent);

        await t
            .expect(this.transaItemAmount.textContent).eql(amountCrypto)
            .expect(this.transaItemName.textContent).eql(name)
            .expect(this.totalBalance.textContent).eql(balance)
            .wait(5000);
    },
    async checkTransaChatUserReceive(amountCrypto, name, n) {
        let balance = Number(this.balanceUserReceive) + Number(amountCrypto);
        balance = balance.toFixed(n)

        await t
            .expect(this.transaItemAmount.textContent).eql(amountCrypto)
            .expect(this.transaItemName.textContent).eql(name)
            .expect(this.totalBalance.textContent).eql(balance)
            .wait(5000);
    },
    async checkTransaChatUserReceiveEscrow() {
        await t
            .expect(this.totalBalance.textContent).eql(this.balanceUserReceive)
            .wait(3000);
    },

    async setCryptoAddress(amountCrypto, addressCrypto) {

        signUp2Step.typeTextData(this.amountInput, amountCrypto);
        signUp2Step.typeTextData(this.addressInput, addressCrypto);
        await t.wait(5000);

    },
    async sendCryptoAddress(addressCrypto) {
        await t

            .hover(this.nextButton)
            .expect(this.nextButton.visible).ok({ timeout: 3000 })
            .click(this.nextButton)
            .wait(3000)
            .expect(this.addressInfo.textContent).eql(addressCrypto)
            .hover(this.confirmButton)
            .expect(this.confirmButton.visible).ok({ timeout: 3000 })
            .click(this.confirmButton)
            .wait(5000);

    },

    async successSend() {
        const modal = this.successModal.exists;
        await t
            .expect(modal).ok()
            .hover(this.okButton)
            .expect(this.okButton.visible).ok({ timeout: 3000 })
            .click(this.okButton)
            .wait(5000);
        messages.messageCounter = messages.messageCounter + 1;

    },
    async errorInvalidAddress() {
        const error = this.errorText.count;
        await t
            .expect(error).eql(1, 'errors "Address not valid" should be 1')
            .expect(this.nextButton.hasAttribute('disabled')).ok();
    },
    async errorEmptyAddress() {
        const error = this.errorText5.count;
        await t
            .hover(this.addressInput)
            .expect(error).eql(1, 'errors "Required field" should be 1')
            .expect(this.nextButton.hasAttribute('disabled')).ok();
    },
    async replaceAmount() {
        await t
            .selectText(this.amountInput)
            .pressKey('delete')
            .wait(2000);

    },
    async errorEmptyAmount() {
        const error = this.errorText5.count;
        await t
            .hover(this.amountInput)
            .expect(error).eql(1, 'errors "Required field" should be 1')
            .expect(this.nextButton.hasAttribute('disabled')).ok();
    },
    async errorZeroAmount() {
        const error = this.errorText6.count;
        await t
            .expect(error).eql(1, 'errors "Minimum amount for transfer 0.00000001" should be 1')
            .expect(this.nextButton.hasAttribute('disabled')).ok();
    },
    async errorAmountMoreBalance() {
        const error = this.errorText7.count;
        await t
            .expect(error).eql(1, 'errors "The amount entered exceeds the wallet balance" should be 1')
            .expect(this.nextButton.hasAttribute('disabled')).ok();
    },
    async closeModal() {
        await t
            .hover(this.closeModalSendButton)
            .expect(this.closeModalSendButton.visible).ok({ timeout: 3000 })
            .click(this.closeModalSendButton)
            .wait(3000)
    },
    async changedWalletModal() {
        await t
            .expect(this.changeWalletModal.visible).ok({ timeout: 3000 })
            .hover(this.changeWalletModalButton)
            .expect(this.changeWalletModalButton.visible).ok({ timeout: 3000 })
            .click(this.changeWalletModalButton)
            .wait(3000);

    },
    async closeModalGet() {
        await t
            .hover(this.closeModalGetButton)
            .expect(this.closeModalGetButton.visible).ok({ timeout: 3000 })
            .click(this.closeModalGetButton)
            .wait(3000)
    },
    async sendCrypto() {
        const balanceBefore = await this.totalBalance.textContent;
        this.balanceUserSent = Number(balanceBefore);

        await t
            .hover(this.sendButton)
            .expect(this.sendButton.visible).ok({ timeout: 3000 })
            .click(this.sendButton)
            .wait(3000);
    },

    async uploadQRcode(qRcode) {
        await t
            .setFilesToUpload(this.qrCrypto, qRcode)
            .wait(3000);
    },
    async sendCryptoQR(amountCrypto) {
        const chooseWallet = this.chooseCryproModalButton.nth(0).child('button'); // eth
        await t
            // .hover(chooseWallet)
            // .expect(chooseWallet.visible).ok({ timeout: 3000 })
            // .click(chooseWallet)
            // .wait(2000)
            .typeText(this.amountInput, amountCrypto, { replace: true })
            .expect(this.amountInput.value).eql(amountCrypto)
            .hover(this.nextButton)
            .expect(this.nextButton.visible).ok({ timeout: 3000 })
            .click(this.nextButton)
            .wait(3000);
    },
    async confirmSendCryptoQR(addressCrypto) {
        await t
            .expect(this.addressInfo.textContent).eql(addressCrypto)
            .hover(this.confirmButton)
            .expect(this.confirmButton.visible).ok({ timeout: 3000 })
            .click(this.confirmButton)
            .wait(5000);

    },
    async checkTransaWallet(amountCrypto, name, n) {
        let balanceAfter = this.balanceUserSent - Number(amountCrypto);
        balanceAfter = balanceAfter.toFixed(n)
        this.balanceCurrentUserSent = balanceAfter;

        await t
            .expect(this.transaItemAmount.textContent).eql(amountCrypto)
            .expect(this.transaItemName.textContent).eql(name)
            .expect(this.totalBalance.textContent).eql(String(this.balanceCurrentUserSent))
            .wait(5000);
    },
    async getBalanceUser2() {
        this.balanceUserReceive = await this.totalBalance.textContent;

    },
    async getBalanceUser() {
        const balanceBefore = await this.totalBalance.textContent;
        this.balanceUserSent = Number(balanceBefore);

    },


    async getCryptoAddress(addressCrypto, addressMemoCrypto) {
        await t
            .hover(this.getButton)
            .expect(this.getButton.visible).ok({ timeout: 3000 })
            .click(this.getButton)
            .wait(2000)
            .expect(this.getAddressInput.value).eql(addressCrypto);
        if (addressMemoCrypto) {
            await t.expect(this.getAddressMemoInput.value).eql(addressMemoCrypto);
        }
    },
    async downloadQR() {
        await t
            .hover(this.downloadQRButton)
            .expect(this.downloadQRButton.visible).ok({ timeout: 3000 })
            .click(this.downloadQRButton)
            .wait(3000);
    },
    async shareCryptoAddress(contact) {
        const contactItemReceive = await this.contactItem.withText(contact);
        await t
            .hover(this.shareModalButton)
            .expect(this.shareModalButton.visible).ok({ timeout: 3000 })
            .click(this.shareModalButton)
            .wait(3000)
            .expect(this.shareButtonDisable.hasAttribute('disabled')).ok()
            .hover(contactItemReceive)
            .expect(contactItemReceive.visible).ok({ timeout: 3000 })
            .click(contactItemReceive)
            .hover(this.shareButton)
            .expect(this.shareButton.visible).ok({ timeout: 3000 })
            .click(this.shareButton)
            .wait(3000);

    },
    async requestMoney(fiat, note, amountFiat, email) {
        const fiatCurrency = this.chooseFiat.nth(fiat);
        await t
            .hover(this.getFiatButton)
            .expect(this.getFiatButton.visible).ok({ timeout: 3000 })
            .click(this.getFiatButton)
            .wait(3000)
            .hover(this.modalFiatCurrency)
            .expect(this.modalFiatCurrency.visible).ok({ timeout: 5000 })
            .click(this.modalFiatCurrency)
            .wait(3000)
            .hover(fiatCurrency)
            .expect(fiatCurrency.visible).ok({ timeout: 5000 })
            .click(fiatCurrency)
            .wait(3000);
        signUp2Step.typeTextData(this.noteFiatInput, note);
        signUp2Step.typeTextData(this.sumFiatInput, amountFiat);
        signUp2Step.typeTextData(this.emailFiatnput, email);
    },
    async sendPaymentRequest() {
        await t
            .hover(this.sendRequestButton)
            .expect(this.sendRequestButton.visible).ok({ timeout: 3000 })
            .click(this.sendRequestButton)
            .wait(2000);
    },
    async copyLink() {
        await t
            .hover(this.copyLinkButton)
            .expect(this.copyLinkButton.visible).ok({ timeout: 3000 })
            .setNativeDialogHandler(() => true)
            .click(this.copyLinkButton)
            .wait(3000);
    },
    async chooseWalletFiat(wallet) {
        const numWalletFiat = await this.chooseWalletFiatButton.nth(wallet).child('div');
        await t.wait(2000);
        await t
            .hover(numWalletFiat)
            .expect(numWalletFiat.visible).ok({ timeout: 3000 })
            .click(numWalletFiat)
            .wait(3000);

    },
    async closeModalRequest() {
        await t
            .hover(this.closeModalRequestButton)
            .expect(this.closeModalRequestButton.visible).ok({ timeout: 3000 })
            .click(this.closeModalRequestButton)
            .wait(3000);

    },
    async errorAmountFiatLessMin(wallet) {
        if (wallet == "1") {
            const error = wallets.errorText1.count;
            await t.expect(error).eql(1, 'errors "Minimum value is 1" should be 1');
        } else if (wallet == "2") {
            const error = wallets.errorText2.count;
            await t.expect(error).eql(1, 'errors "Minimum value is 0.82" should be 1');
        } else if (wallet == "3") {
            const error = wallets.errorText3.count;
            await t.expect(error).eql(1, 'errors "Minimum value is 6.54" should be 1');
        }

    },
    async errorInvalidEmail() {
        const error = wallets.errorText4.count;
        await t.expect(error).eql(1, 'errors "Invalid email" should be 1');
    },
    async errorEmptyInput() {
        const error = wallets.errorText5.count;
        await t.expect(error).eql(1, 'errors "Required field" should be 1');
    },
    async replaceSumFiat() {
        await t
            .selectText(this.sumFiatInput)
            .pressKey('delete')
            .wait(2000);

    },
    async checkCardPayment(amountFiat, name, wallet) {
        const nameSent = "Request from: " + name;
        await t.expect(this.nameLabel.textContent).eql(nameSent);

        if (wallet == "0") {
            const amountWithWallet = "USDT " + amountFiat
            await t.expect(this.amountLabel.textContent).eql(amountWithWallet);
        } else if (wallet == "1") {
            const amountWithWallet = "USD " + amountFiat
            await t.expect(this.amountLabel.textContent).eql(amountWithWallet);
        } else if (wallet == "2") {
            const amountWithWallet = "EUR " + amountFiat
            await t.expect(this.amountLabel.textContent).eql(amountWithWallet);
        } else if (wallet == "3") {
            const amountWithWallet = "CNY " + amountFiat
            await t.expect(this.amountLabel.textContent).eql(amountWithWallet);
        }
    },
    async closeModalErrorOwnQr() {
        const textError = this.modalQwnQr.exists;
        await t
            .expect(textError).ok()
            .hover(this.closeModalQwnQr)
            .expect(this.closeModalQwnQr.visible).ok({ timeout: 3000 })
            .click(this.closeModalQwnQr)
            .wait(3000);

    },

}
export default wallets
