
///<reference types="cypress"/>

import tezroData from '../../support/tezro_data';
import tezroFunctions from "./page_model/signUpSignInLogOut.spec";
import checkUserData from './page_model/checkUserData.spec'
import signUp2Step from './page_model/signup2step.spec'
import mainPageUser from './page_model/main_settings.spec'
import locators from '../../support/elementsLocators'

let signinLoc = locators?.signInLocators.signIn

describe("Authorisation in Web Tezro", () => {

  it("1. tezro sign in: success", () => {
    /* на будущее для переписывания в тесты вида Лены
    cy.visit(tezroData.urls.baseUrl); // "https://dev-web.tezro.com/"
    cy.url().should("eq", tezroData.urls.startUrl);
    tezroData.userLoginData.forEach((user) => {
      // 5 iteration (в user 5 объектов)
      tezroFunctions.signInExecution.signinSteps(user); // auth
      tezroFunctions.signInExecution.pinSteps(user);

    });*/

    cy.viewport(1800, 950).visit(tezroData.urls.startUrl);
    cy.url().should("eq", tezroData.urls.startUrl);
    cy.get(`${locators.signUpLocators.startPage.signInButton}`).click();
    cy.url().should("eq", tezroData.urls.signInUrl);
    cy.get(`${signinLoc.seedPhraseInput}`)
    .type(`${tezroData.userLoginData[0].seedPhrase}`) // подумать, 
    //как прикрутить функцию Лены typeTextData
    cy.get(`${signinLoc.seedPhraseInput}`)
      .should('contain.value', `${tezroData.userLoginData[0].seedPhrase}`)
    cy.get(`${signinLoc.loginButton}`).click().wait(5000)
    signinLoc.pinInput.forEach(pinCount => {
      cy.get(`${pinCount}`).type('1')
    })
    signinLoc.pinInput.forEach(pinCount => {
      cy.focused().type("1")
    })
    cy.wait(11000).url().should("eq", "https://dev-web.tezro.com/");

  });//it
});//describe




/*
import startPage from './page_model/startpage';
import signUp3Step from './page_model/signup3step';
import userLoginData from './data/userLogin';
import signIn from './page_model/signin';
import login from './login';
import logout from './logout';


fixture`tezro sign in`
  .page(configData.url)

const signInSteps = async (userLoginData) => {
  await startPage.signInUser();
  await signIn.signInStepUser(userLoginData.seedPhrase);
};
const signInQRSteps = async (userLoginData) => {
  await startPage.signInUser();
  await signIn.signInStepUserNotQR(userLoginData.qr);
  await signIn.signInStepUserClickSend();
};
const pinSteps = async (userLoginData) => {
  await signIn.signInEnterPinUser(userLoginData.pin);
  await signIn.signInEnterPinUser(userLoginData.pin);
  await signUp3Step.signUp3StepUrl();
};

test('1. tezro sign in: success', async t => {
  for (const user of userLoginData.slice(0, 2)) {
    await login(user);
    await logout();
  }
});
test('2. tezro sign in: pin code invalid', async t => {
  await signInSteps(userLoginData[0]);
  await signIn.signInEnterPinUser(userLoginData[0].pin);
  await signIn.signInEnterPinUser(userLoginData[1].pin);
  await signUp3Step.errorPinFailed();
  await pinSteps(userLoginData[0]);
  await logout();
});
test('3. tezro sign in: with QR', async t => {
  await signInQRSteps(userLoginData[0]);
  await pinSteps(userLoginData[0]);
  await logout();
});
test('4. tezro sign in with QR: replace QR', async t => {
  await startPage.signInUser();
  await signIn.signInStepUserWithQR(userLoginData[0].qr, userLoginData[0].seedPhrase);
  await signIn.signInStepUserWithQR(userLoginData[1].qr, userLoginData[1].seedPhrase);
  await signIn.signInStepUserClickSend();
  await pinSteps(userLoginData[1]);
  await logout();
});
test('5. tezro sign in with QR: upload not QR, but image', async t => {
  await signInQRSteps(userLoginData[4]);
  await signIn.errorQRInvalidModal();
});
test('6. tezro sign in with QR: upload not QR, not image', async t => {
  await signInQRSteps(userLoginData[3]);
  await signIn.errorNotImageModal();
});
test('7. tezro sign in with QR: invalid QR', async t => {
  await signInQRSteps(userLoginData[2]);
  await signIn.errorTextSeedPhraseInvalid();
});
test('8. tezro sign in: seed phrase invalid', async t => {
  await signInSteps(userLoginData[5]);
  await signIn.errorTextSeedPhraseInvalid()
});
test('9. tezro sign in: seed phrase not registration', async t => {
  await signInSteps(userLoginData[6]);
  await signIn.errorTextSeedPhraseInvalid()
});
test('10. tezro sign in: seed phrase empty', async t => {
  await signInSteps({ ...userLoginData[0], seedPhrase: null });
  await signIn.errorTextSeedPhraseEmpty()
});
*/
