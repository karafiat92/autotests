import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../cypressTeztoTests/data/url';

//https://dev.web.tezro.com/signup создание пина

const signUp3Step = {
  async signUp3StepEnterPinUser(pin) {
    const getPageURL1 = ClientFunction(() => window.location.href);
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
      .wait(10000);
  },
  async signUp3StepUrl() {
    const getPageURL1 = ClientFunction(() => window.location.href);
    //await t.expect(getPageURL1()).eql(urls.startUrl);
  },
  async errorPinFailed() {
    await t
      .hover(this.errorText)
      .expect(this.errorText.visible)
      .ok('errors "Invalid PIN code" should be 1', { timeout: 3000 });
  },
};
export default signUp3Step

