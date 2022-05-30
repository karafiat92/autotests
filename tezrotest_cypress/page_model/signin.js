import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../data/url';
import signUp2Step from './signup2step';

//https://dev.web.tezro.com/login

const signIn = {
    async signInStepUser(seedPhrase) {
        signUp2Step.typeTextData(this.seedPhraseInput, seedPhrase);
        await t
            .hover(this.sendButton)
            .expect(this.sendButton.visible)
            .ok({ timeout: 3000 })
            .click(this.sendButton)
            .wait(3000);
    },
    async signInStepUserWithQR(QRcode, seedPhrase) {
        await t
            .setFilesToUpload(this.uploadSeedPhrase, QRcode)
            .expect(this.seedPhraseInput.value)
            .eql(seedPhrase);
    },
    async signInStepUserNotQR(QRcode) {
        await t.setFilesToUpload(this.uploadSeedPhrase, QRcode);
    },
    async signInStepUserClickSend() {
        await t
            .hover(this.sendButton)
            .expect(this.sendButton.visible)
            .ok({ timeout: 3000 })
            .click(this.sendButton)
            .wait(3000);
    },
    async errorTextSeedPhraseInvalid() {
        await t
            .hover(this.seedPhraseInput)
            .wait(2000)
            .expect(this.errorText1.visible)
            .ok('errors "Invalid seed-phase" should be 1');
    },
    async errorTextSeedPhraseEmpty() {
        await t
            .hover(this.seedPhraseInput)
            .wait(2000)
            .expect(this.errorText2.visible)
            .ok('errors "Seed-phase cannot be empty" should be 1');
    },
    async errorQRInvalidModal() {
        await t
            .expect(this.errorModal1.visible)
            .ok('errors "Invalid QR code" should be 1')
            .expect(this.errorButton.visible)
            .ok({ timeout: 3000 })
            .click(this.errorButton)
            .wait(3000);
    },
    async errorNotImageModal() {
        await t
            .expect(this.errorModal2.visible)
            .ok('errors "Invalid file" should be 1')
            .expect(this.errorButton.visible)
            .ok({ timeout: 3000 })
            .click(this.errorButton)
            .wait(3000);
    },
    async signInEnterPinUser(pin) {
        await t
            .typeText(this.pin1Input, pin)
            .expect(this.pin1Input.value)
            .eql(pin)
            .typeText(this.pin2Input, pin)
            .expect(this.pin2Input.value)
            .eql(pin)
            .typeText(this.pin3Input, pin)
            .expect(this.pin3Input.value)
            .eql(pin)
            .typeText(this.pin4Input, pin)
            //.expect(this.pin4Input.value).eql(pin)
            .wait(5000);
    },
};
export default signIn