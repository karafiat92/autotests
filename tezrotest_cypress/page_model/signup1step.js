import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../cypressTeztoTests/data/url';

// https://dev.web.tezro.com/signup

const signUp1Step = {
    async signUp1StepUser() {
        await t
            .hover(this.saveQRButton)
            .expect(this.saveQRButton.visible)
            .ok({ timeout: 3000 })
            .click(this.saveQRButton)
            .hover(this.saveTextButton)
            .expect(this.saveTextButton.visible)
            .ok({ timeout: 3000 })
            .click(this.saveTextButton)
            .hover(this.checkboxSavedSeed)
            .expect(this.checkboxSavedSeed.visible)
            .ok({ timeout: 3000 })
            .click(this.checkboxSavedSeed)
            .hover(this.signupNextButton)
            .expect(this.signupNextButton.visible)
            .ok({ timeout: 3000 })
            .click(this.signupNextButton)
            .wait(3000);
    },
    async signUp1StepUserFailled() {
        await t
            .hover(this.saveQRButton)
            .expect(this.saveQRButton.visible)
            .ok({ timeout: 3000 })
            .click(this.saveQRButton)
            .expect(this.signupNextButton.hasAttribute("disabled"))
            .ok()
            .wait(3000);
    },
};
export default signUp1Step