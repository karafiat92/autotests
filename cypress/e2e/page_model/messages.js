import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../data/url';
import cryptoData from '../data/crypto';
import messagesData from '../data/messages.js';
import wallets from './wallets';
import signUp2Step from './signup2step';

// раздел Messages, url нет
const messages = {
    messagesButton: Selector('#messagesButton'),
    userButton1: Selector('#dialogItem').withText(messagesData[0].user),
    userButton2: Selector('#dialogItem').withText(messagesData[1].user),
    messagesInput: Selector('#messageFieldValue'),
    messagesSentButton: Selector('#messagesSentButton'),
    messagesItem: Selector('.messageTextItem'),
    messagesTxItem: Selector('.messageTxItem').nth(0),
    messagesItemMeta: Selector('div#root').child('div > div').nth(1).child('div > div').nth(1).child('div').nth(1).child('div >div >div'),  // тут пока рамс, не могу прокинуть класс, что странно
    messagesFileSent: Selector('#messagesFileSent'),
    messagesItemPhoto: Selector('.messageImageItem'),
    messagesItemFile: Selector('.messageFileItem'),
    messagesItemAudio: Selector('.messageFileItem'),
    messagesItemVideo: Selector('.messageVideoItem'),
    newMessagesCount: Selector('.unreadCount'),
    messageCounter: 0,
    messageCryptoCounter: 0,
    contextMenuButtonSelect: Selector('#messageSelect'),
    buttonDelete: Selector('#deleteSelectedMessageBtn'),
    checkboxDeleteAny: Selector('#deleteForEveryoneCheckBox'),
    okButton: Selector('#modalDeleteMessageBtn'),
    checkboxItem1: Selector('.selectCheckbox').nth(0),
    checkboxItem2: Selector('.selectCheckbox').nth(1),
    checkboxItem3: Selector('.selectCheckbox').nth(2),
    checkboxItem4: Selector('.selectCheckbox').nth(3),
    cryptoButton: Selector('#currencyButton'),
    cryptoChooseButton: Selector('.chooseCurrency'),
    chooseCurrencyModalCurrencyBalance: Selector('.chooseCurrencyModalCurrencyBalance'),
    cryptoInput: Selector('#amountCurrencyInput'),
    cryptoSend: Selector('#sendTxFormBtn'),
    balance: 0,
    balanceCurrent: 0,
    closeButtonCryptoGialog: Selector('#closeChooseCurrencyModalBtn'),
    closeButton: Selector('#closeSendTxFormBtn'),
    changeCryptoButton: Selector('#currencyButton'),
    errorText1: Selector('#amountCurrencyError').withText("You don’t have enough balance"),
    errorText2: Selector('#amountCurrencyError').withText("Minimum amount for transfer 0.00000001"),
    errorText3: Selector('#amountCurrencyError').withText("Required field"),
    closeModalButton: Selector('button.chat_transaction_form__btn').nth(1),
    escrowButton: Selector('#escrowTxFormBtn'),
    escrowCheckbox: Selector('div.agreement_modal__checkbox_wrapper > button.sharedCheckboxButton'),
    escrowAgreeButton: Selector('div.agreement_modal > button.agreement_modal__agree_btn'),
    escrowLockIcon: Selector('.escrowMessageLockIcon'),
    escrowUnLockButton: Selector('#escrowMessageUnlockUnlockBtn'),
    escrowDisputeButton: Selector('#escrowMessageUnlockDisputeBtn'),
    escrowUnLockIcon: Selector('.escrowMessageUnlockIcon'),
    escrowRequestButton: Selector('#escrowUnlockMoneyModalRequestBtn'),
    escrowAddFile: Selector('.escrowAddFileInput').nth(0),
    commentInput: Selector('#comment'),
    commentEscrow: Selector('.escrowMessageUnlockRequestModal'),
    escrowModal: Selector('#textInfoModal').withText('Unlock request has been sent'),
    escrowModalButon: Selector('#closeInfoModalBtn'),
    confirmUnlockButton: Selector('#submitInfoModalBtn'),
    escrowFile: Selector('.escrowFile').nth(0),


    async chooseItem(selectorName) {
        await t
            .hover(selectorName)
            .rightClick(selectorName)
            .wait(3000);

    },
    async toMessages() {
        await t
            .hover(this.messagesButton)
            .expect(this.messagesButton.visible).ok({ timeout: 3000 })
            .click(this.messagesButton)
            .wait(5000);

    },
    async toMessageChat1() {
        await t
            .hover(this.userButton1)
            .expect(this.userButton1.visible).ok({ timeout: 3000 })
            .click(this.userButton1)
            .wait(5000);

    },
    async toMessageChat2() {
        await t
            .hover(this.userButton2)
            .expect(this.userButton2.visible).ok({ timeout: 3000 })
            .click(this.userButton2)
            .wait(5000);

    },
    async writeMessages(message) {
        await t
            .typeText(this.messagesInput, message, { replace: true })
            .expect(this.messagesInput.value).eql(message)
            .hover(this.messagesSentButton)
            .expect(this.messagesSentButton.visible).ok({ timeout: 3000 })
            .click(this.messagesSentButton)
            // .pressKey('enter')
            .wait(3000);
        this.messageCounter = this.messageCounter + 1;

    },
    async resetСounterMessage() {
        this.messageCounter = 0;

    },
    async resetСounterCrytoMessage() {
        this.messageCryptoCounter = 0;

    },
    async sentFileMessage() {
        const fileCount = Selector(this.messagesItemFile).count;
        const photoCount = Selector(this.messagesItemPhoto).count;
        // const videoCount = Selector(this.messagesItemVideo).count;
        await t
            .setFilesToUpload(this.messagesFileSent, ['../uploads/1.png'])
            .wait(10000)
            .setFilesToUpload(this.messagesFileSent, ['../uploads/sound.mp3'])
            .wait(10000)
            .setFilesToUpload(this.messagesFileSent, ['../uploads/document.pdf'])
            .wait(10000)
            .setFilesToUpload(this.messagesFileSent, ['../uploads/divx.avi'])
            .wait(10000)
            .expect(fileCount).eql(3)
            .expect(photoCount).eql(1)
            // .expect(audioCount).eql(1)
            //.expect(videoCount).eql(1)
            .wait(3000);
        this.messageCounter = this.messageCounter + 4;
    },
    async newPage() {
        await t
            .openWindow('https://dev.web.tezro.com/')
            .maximizeWindow();

        const url = await t.eval(() => document.documentURI);
        await t.expect(url).eql('https://dev.web.tezro.com/');
    },
    async closePage() {
        await t.closeWindow();

    },
    async switchPage() {
        await t.switchToPreviousWindow();

    },
    async messagesCount() {

        await t
            .hover(this.newMessagesCount)
            .expect(this.newMessagesCount.visible).ok({ timeout: 3000 })
            .expect(this.newMessagesCount.textContent).eql(this.messageCounter.toString());
    },
    async checkMessage(message) {
        const messagesSentItem = this.messagesItem.withText(message).exists;
        await t
            .expect(messagesSentItem).ok();
    },
    async unreadMessage(message) {
        const unReadMessagesSentItem = this.messagesItemMeta.withText(message).sibling('div').child('div').child('svg').child('use').withAttribute('xlink:href', 'svg#icUnread');
        const unReadMessagesSentItemExists = unReadMessagesSentItem.exists;
        await t
            .hover(unReadMessagesSentItem)
            .expect(unReadMessagesSentItemExists).ok();
    },
    async readMessage(message) {
        const ReadMessagesSentItem = this.messagesItemMeta.withText(message).sibling('div').child('div').child('svg').child('use').withAttribute('xlink:href', '/static/media/chatSprite.70a0c56a.svg#icRead');
        const ReadMessagesSentItemExists = ReadMessagesSentItem.exists;
        await t
            .hover(ReadMessagesSentItem)
            .expect(ReadMessagesSentItemExists).ok();
    },
    async deleteMessage(message) {
        const messagesSentItem = this.messagesItem.withText(message);

        await t
            .hover(messagesSentItem)
            .rightClick(messagesSentItem)
            .wait(3000)
            .hover(this.contextMenuButtonSelect)
            .expect(this.contextMenuButtonSelect.visible).ok({ timeout: 3000 })
            .click(this.contextMenuButtonSelect)
            .hover(this.buttonDelete)
            .expect(this.buttonDelete.visible).ok({ timeout: 3000 })
            .click(this.buttonDelete)
            .wait(3000)
            // .hover(this.checkboxDeleteAny)
            // .expect(this.checkboxDeleteAny.visible).ok({ timeout: 3000 })
            // .click(this.checkboxDeleteAny)
            .hover(this.okButton)
            .expect(this.okButton.visible).ok({ timeout: 3000 })
            .click(this.okButton)
            .wait(3000);
    },
    async checkFilesMessage() {
        const messagesFileSentItem = this.messagesItemFile.nth(0).exists;
        const messagesItemAudioItem = this.messagesItemFile.nth(1).exists;
        const messagesItemVideoItem = this.messagesItemFile.nth(2).exists;
        // const messagesItemVideoItem = this.messagesItemVideo.exists;
        const messagesItemPhotoItem = this.messagesItemPhoto.exists;
        await t
            .wait(4000)
            .expect(messagesFileSentItem).ok()
            .expect(messagesItemAudioItem).ok()
            .expect(messagesItemVideoItem).ok()
            .expect(messagesItemPhotoItem).ok();
    },
    async deleteFileMessage() {
        const messagesItemPhotoItem = this.messagesItemPhoto;
        await t
            .hover(messagesItemPhotoItem)
            .rightClick(messagesItemPhotoItem)
            .wait(3000)
            .hover(this.contextMenuButtonSelect)
            .expect(this.contextMenuButtonSelect.visible).ok({ timeout: 3000 })
            .click(this.contextMenuButtonSelect)
            .click(this.checkboxItem1)
            .click(this.checkboxItem2)
            .click(this.checkboxItem3)
            .wait(3000)
            .hover(this.buttonDelete)
            .expect(this.buttonDelete.visible).ok({ timeout: 3000 })
            .click(this.buttonDelete)
            .wait(3000)
            // .hover(this.checkboxDeleteAny)
            //.expect(this.checkboxDeleteAny.visible).ok({ timeout: 3000 })
            //.click(this.checkboxDeleteAny)
            .hover(this.okButton)
            .expect(this.okButton.visible).ok({ timeout: 3000 })
            .click(this.okButton)
            .wait(3000);
    },
    async chooseCrypto() {
        await t
            .hover(this.cryptoButton)
            .expect(this.cryptoButton.visible).ok({ timeout: 3000 })
            .click(this.cryptoButton)
            .wait(3000);
    },
    async sentCrypto(amountCrypto, wallet) {
        const currentBalanceWallet = await this.chooseCurrencyModalCurrencyBalance.nth(wallet);
        const balanceBefore = await currentBalanceWallet.textContent;
        this.balance = Number(balanceBefore);

        const numWallet = await this.cryptoChooseButton.nth(wallet);
        await t.wait(2000);
        await t
            .hover(numWallet)
            .expect(numWallet.visible).ok({ timeout: 3000 })
            .click(numWallet)
            .wait(3000)
            .typeText(this.cryptoInput, amountCrypto, { replace: true })
            .expect(this.cryptoInput.value).eql(amountCrypto)
            .wait(3000);
    },
    async checkCrypto(amountCrypto) {
        const cryptoSendItem = this.messagesTxItem.withText(amountCrypto).exists;
        await t
            .expect(cryptoSendItem).ok();
    },

    async checkBalanceCrypto(amountCrypto, wallet, n) {
        const currentBalanceWallet1 = await this.chooseCurrencyModalCurrencyBalance.nth(wallet);
        let balanceAfter = this.balance - Number(amountCrypto);
        balanceAfter = balanceAfter.toFixed(n);
        this.balanceCurrent = balanceAfter;

        await t
            .hover(this.cryptoButton)
            .expect(this.cryptoButton.visible).ok({ timeout: 3000 })
            .click(this.cryptoButton)
            .wait(3000)
            .expect(currentBalanceWallet1.textContent).eql(String(this.balanceCurrent))
            .wait(3000)
            .hover(this.closeButtonCryptoGialog)
            .expect(this.closeButtonCryptoGialog.visible).ok({ timeout: 3000 })
            .click(this.closeButtonCryptoGialog)
            .wait(3000);
    },
    async changeCrypto() {
        await t
            .hover(this.changeCryptoButton)
            .expect(this.changeCryptoButton.visible).ok({ timeout: 3000 })
            .click(this.changeCryptoButton)
            .wait(3000);
    },
    async errorEmptyWallet() {
        const error = this.errorText1.count;
        await t
            .expect(error).eql(1, 'errors "You don’t have enough balance" should be 1');
    },
    async errorSentZero() {
        const error = this.errorText2.count;
        await t
            .expect(error).eql(1, 'errors "Minimum amount for transfer 0.00000001" should be 1');
    },
    async closeModalCrypto() {
        await t
            .hover(this.closeButton)
            .expect(this.closeButton.visible).ok({ timeout: 3000 })
            .click(this.closeButton)
            .expect(this.messagesInput.visible).ok({ timeout: 3000 })
            .expect(this.messagesSentButton.visible).ok({ timeout: 3000 })
            .wait(3000);

    },
    async sendModalCrypto() {
        await t
            .hover(this.cryptoSend)
            .expect(this.cryptoSend.visible).ok({ timeout: 3000 })
            .click(this.cryptoSend)
            .wait(3000);
        this.messageCounter = this.messageCounter + 1;

    },
    async escrowSend() {
        await t
            .hover(this.escrowButton)
            .expect(this.escrowButton.visible).ok({ timeout: 3000 })
            .click(this.escrowButton)
            .wait(3000);
    },
    async escrowModalSend() {
        await t
            .hover(this.escrowCheckbox)
            .expect(this.escrowCheckbox.visible).ok({ timeout: 3000 })
            .click(this.escrowCheckbox)
            .wait(2000)
            .hover(this.escrowAgreeButton)
            .expect(this.escrowAgreeButton.visible).ok({ timeout: 3000 })
            .click(this.escrowAgreeButton)
            .wait(3000);
    },
    async escrowItemInChat() {

        await t
            .expect(this.escrowLockIcon.visible).ok({ timeout: 3000 })
            .wait(2000);
    },
    async escrowUnLockWithFiles(amountCrypto, comment) {
        const cryptoSendItemEscrow = this.messagesTxItem.withText(amountCrypto);
        const cryptotemEscrowUnlock = this.messagesTxItem.withText(amountCrypto).find('button');
        await t
            .hover(cryptoSendItemEscrow)
            .expect(cryptoSendItemEscrow.visible).ok({ timeout: 3000 })
            .hover(cryptotemEscrowUnlock)
            .expect(cryptotemEscrowUnlock.visible).ok({ timeout: 3000 })
            .click(cryptotemEscrowUnlock)
            .wait(7000)
            .hover(this.escrowFile)
            .expect(this.escrowFile.visible).ok({ timeout: 3000 })
            .expect(this.commentEscrow.textContent).eql(comment)
            .hover(this.escrowUnLockButton)
            .expect(this.escrowUnLockButton.visible).ok({ timeout: 3000 })
            .click(this.escrowUnLockButton)
            .click(this.confirmUnlockButton)
            .wait(7000)
            .expect(this.escrowUnLockIcon.visible).ok({ timeout: 3000 })
            .wait(3000);
    },
    async escrowRequest(amountCrypto, comment) {
        const cryptoSendItemEscrow = this.messagesTxItem.withText(amountCrypto);
        const cryptotemEscrowRequest = this.messagesTxItem.withText(amountCrypto).find('button');
        await t
            .hover(cryptoSendItemEscrow)
            .expect(cryptoSendItemEscrow.visible).ok({ timeout: 3000 })
            .hover(cryptotemEscrowRequest)
            .expect(cryptotemEscrowRequest.visible).ok({ timeout: 3000 })
            .click(cryptotemEscrowRequest)
            .wait(2000)
            .setFilesToUpload(this.escrowAddFile, ['../uploads/1.png'])
            .wait(3000);
        signUp2Step.typeTextData(this.commentInput, comment);
        await t
            .hover(this.escrowRequestButton)
            .expect(this.escrowRequestButton.visible).ok({ timeout: 3000 })
            .click(this.escrowRequestButton)
            .wait(2000);

    },
    async successRequest() {
        await t
            .hover(this.escrowModal)
            .expect(this.escrowModal.visible).ok({ timeout: 3000 })
            .hover(this.escrowModalButon)
            .expect(this.escrowModalButon.visible).ok({ timeout: 3000 })
            .click(this.escrowModalButon)
            .wait(2000);
    },

    async escrowDispute(amountCrypto) {
        const cryptoSendItemEscrow = this.messagesTxItem.withText(amountCrypto);
        await t
            .hover(cryptoSendItemEscrow)
            .expect(cryptoSendItemEscrow.visible).ok({ timeout: 3000 })
            .click(cryptoSendItemEscrow)
            .wait(2000)
            .hover(this.escrowDisputeButton)
            .expect(this.escrowDisputeButton.visible).ok({ timeout: 3000 })
            .click(this.escrowDisputeButton)
            .wait(2000);
    },
    async checkPhotoMessage() {
        const messagesItemPhotoItem = this.messagesItemPhoto.exists;
        await t
            .expect(messagesItemPhotoItem).ok();
    },

}
export default messages
