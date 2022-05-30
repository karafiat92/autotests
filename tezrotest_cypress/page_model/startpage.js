import { Selector, t } from 'testcafe';
import { ClientFunction } from 'testcafe';
import urls from '../cypressTeztoTests/data/url';

//https://dev.web.tezro.com/

const startPage = {
  async signUpUser() {
    const getPageURL1 = ClientFunction(() => window.location.href);
    await t
      .maximizeWindow()
      .hover(this.sugnUpButton)
      .expect(this.sugnUpButton.visible)
      .ok({ timeout: 5000 })
      .click(this.sugnUpButton)
      .wait(2000)
      .expect(getPageURL1())
      .eql(urls.signUpUrl);
  },
  async signInUser() {
    const getPageURL1 = ClientFunction(() => window.location.href);
    await t
      .maximizeWindow()
      .hover(this.sugnInButton)
      .expect(this.sugnInButton.visible)
      .ok({ timeout: 5000 })
      .click(this.sugnInButton)
      .wait(2000)
      .expect(getPageURL1())
      .eql(urls.signInUrl);
  },
};
export default startPage