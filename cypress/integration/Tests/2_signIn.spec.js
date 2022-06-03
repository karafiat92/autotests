
///<reference types="cypress"/>

// import tezroData from '../../support/tezro_data';
// import tezroFunctions from "./page_model/signUpSignInLogOut.spec";
// import checkUserData from './page_model/checkUserData.spec'
// import signUp2Step from './page_model/signup2step.spec'
// import mainPageUser from './page_model/main_settings.spec'
// import locators from '../../support/elementsLocators'

// let signinLoc = locators?.signInLocators.signIn
import signIn from './pageObjects/signinPage';


describe("Authorisation in Web Tezro", () => {

  it("1. tezro sign in: success", () => {
    let userLoginDataNumber = 0
    signIn.openSigninPage()
    signIn.typeSeedPhrase(userLoginDataNumber)
    signIn.enterPincode(userLoginDataNumber)
    signIn.enterPincode(userLoginDataNumber)
    cy.wait(3000).url().should("eq", signIn.startPage);

  });//it
});//describe


/*
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
