/// <reference types="cypress"/>

import tezroData from "../../support/tezro_data";
import tezroFunctions from "./page_model/signUpSignInLogOut.spec";

import signUp2Step from "./page_model/signup2step.spec";
import mainPageUser from "./page_model/main_settings.spec";
import locators from "../../support/elementsLocators";

let signinLoc = locators?.signInLocators.signIn;

async function checkFields(selectorName, selectorData) {
  cy.get(`${selectorName}`)
    .should("be.visible")
    .should("contain.value", `${selectorData}`);
}

//все тесты по регистрация
describe("Tezro sign up", () => {
  it("1. tezro sign up: success for 5 users", () => {
    cy.visit(tezroData.urls.baseUrl); // "https://dev-web.tezro.com/"
    cy.url().should("eq", tezroData.urls.startUrl);
    tezroData.userSignUpData.forEach((user) => {
      // 5 iteration (в user 5 объектов)
      tezroFunctions.signUpExecution.signup(user); // регистрации
      mainPageUser.settings();
      mainPageUser.editProfile();
      checkFields(
        locators.editProfileLocators.firstnameInput,
        signUp2Step.userProfileData.userFirstname
      );
      checkFields(
        locators.editProfileLocators.lastnameInput,
        signUp2Step.userProfileData.userLastname
      );
      checkFields(
        locators.editProfileLocators.usernameInput,
        signUp2Step.userProfileData.userUsername
      );
      cy.get(`${locators.editProfileLocators.saveButton}`).click().wait(2000);
      mainPageUser.seedPhrase();
      signinLoc.pinInput.forEach((pinCount) => {
        cy.get(`${pinCount}`).type(`${tezroData.userSignUpData[0].pin}`);
      });
      /* Разобрать это добро, возможно, поможет найти элемент по типу
      cy.get('form').within(() => {
  cy.get('input').type('Pamela') // Only yield inputs within form
  cy.get('textarea').type('is a developer') // Only yield textareas within form
})
      */

      cy.get(".StyledSeedPhraseModal_s1m6gcfy")
        .find(">p") //.children('.StyledSeedPhrase_s1j9bvp0 StyleText_svkxk8i')
        .not("#modalSeedPhrase")
        .then( ($elem) => { // function ($elem){}
          cy.readFile("cypress/downloads/seedPhrase.txt").should(
            "eq",
            $elem.text()
          );
        });

      //tezroFunctions.logOutExecution.logout(); // логаута
    });
  });
  /*it("29. tezro sign up: correct user data in profile", () => {
    cy.visit(tezroData.urls.baseUrl); // "https://dev-web.tezro.com/"
       tezroFunctions.signUpExecution.signup(user); // регистрации
       checkUserData(user);
       
  });*/
  /*
test('2. tezro sign up: checkbox to save QR code not checked ', async t => {
  await startPage.signUpUser();
  await signUp1Step.signUp1StepUserFailled();
});
test('3. tezro sign up: inputs empty', async t => {
  await signupSteps({ ...user[0], firstname: null, lastname: null, phone: null, username: null });
  await signUp2Step.errorTextFieldEmptyAll();
});

test('4. tezro sign up: username empty', async t => {
  await signupSteps({ ...user[0], username: null });
  await signUp2Step.errorTextFieldEmpty();
});
test('5. tezro sign up: firstname empty', async t => {
  await signupSteps({ ...user[0], firstname: null });
  await signUp2Step.errorTextFieldEmpty();
});
test('6. tezro sign up: lastname empty', async t => {
  await signupSteps({ ...user[0], lastname: null });
  await signUp2Step.errorTextFieldEmpty();
});
test('7. tezro sign up: phone empty', async t => {
  await signupSteps({ ...user[0], phone: null });
  await signUp2Step.errorTextFieldEmpty();
});
test(`8. tezro sign up: username < 5 letters = ${user[6].username}`, async t => {
  await signupSteps({ ...user[0], username: user[6].username });
  await signUp2Step.errorTextUsernameMin()
});
test(`9. tezro sign up: username > 32 letters = ${user[3].username}`, async t => {
  await signupSteps({ ...user[0], username: user[3].username });
  await signUp2Step.errorTextMaxLetters()
});
test(`10. tezro sign up: firstname > 32 letters = ${user[3].firstname}`, async t => {
  await signupSteps({ ...user[0], firstname: user[3].firstname });
  await signUp2Step.errorTextMaxLetters()
});
test(`11. tezro sign up: lastname > 32 letters = ${user[3].lastname}`, async t => {
  await signupSteps({ ...user[0], lastname: user[3].lastname });
  await signUp2Step.errorTextMaxLetters()
});
test.skip(`12. tezro sign up: username invalid - special letters = ${user[2].username}`, async t => {
  await signupSteps({ ...user[0], username: user[2].username });
  await signUp2Step.errorTextSpecialSymbol()
});
test.skip(`13. tezro sign up: firstname invalid - special letters = ${user[2].firstname}`, async t => {
  await signupSteps({ ...user[0], firstname: user[2].firstname });
  await signUp2Step.errorTextSpecialSymbol()
});
test.skip(`14. tezro sign up: lastname invalid - special letters = ${user[2].lastname}`, async t => {
  await signupSteps({ ...user[0], lastname: user[2].lastname });
  await signUp2Step.errorTextSpecialSymbol()
});
test(`15. tezro sign up: firstname invalid - first character not latin = ${user[1].firstname}`, async t => {
  await signupSteps({ ...user[0], firstname: user[1].firstname });
  await signUp2Step.errorTextFirstLetter()
});
test(`16. tezro sign up: lastname invalid - first character not latin = ${user[1].lastname}`, async t => {
  await signupSteps({ ...user[0], lastname: user[1].lastname });
  await signUp2Step.errorTextFirstLetter()
});
test.skip(`17. tezro sign up: username invalid - first character not latin = ${user[1].username}`, async t => {
  await signupSteps({ ...user[0], username: user[1].username });
  await signUp2Step.errorTextFirstLetter()
});
test(`18. tezro sign up: username is occupied (username and email) = ${user[8].username}`, async t => {
  await signupSteps({ ...user[0], username: user[8].username });
  await signUp2Step.errorTextUsernameOccupied()
});
test(`19. tezro sign up: username is occupied (username) = ${user[10].username}`, async t => {
  await signupSteps({ ...user[0], username: user[10].username });
  await signUp2Step.errorTextUsernameOccupied()
});
test.skip(`20. tezro sign up: username is occupied (email) = ${user[9].username}`, async t => {
  await signupSteps({ ...user[0], username: user[9].username });
  await signUp2Step.errorTextUsernameOccupied()
});
test(`21. tezro sign up: firstname invalid: сyrillic letters = ${user[4].firstname}`, async t => {
  await signupSteps({ ...user[0], firstname: user[4].firstname });
  await signUp2Step.errorTextNameInvalid()
});
test(`22. tezro sign up: lastname invalid: сyrillic letters = ${user[4].lastname}`, async t => {
  await signupSteps({ ...user[0], lastname: user[4].lastname });
  await signUp2Step.errorTextNameInvalid()
});
test.skip(`23. tezro sign up: username invalid: сyrillic letters = ${user[4].username}`, async t => {
  await signupSteps({ ...user[0], username: user[4].username });
  await signUp2Step.errorTextNameInvalid()
});
test(`24. tezro sign up: username invalid: few words = ${user[7].username}`, async t => {
  await signupSteps({ ...user[0], username: user[7].username });
  await signUp2Step.errorTextUsernameInvalid1()
});
test(`25. tezro sign up: username invalid: have space = ${user[5].username}`, async t => {
  await signupSteps({ ...user[0], username: user[5].username });
  await signUp2Step.errorTextUsernameInvalid1()
});
test(`26. tezro sign up: phone invalid = ${user[11].phone}`, async t => {
  await signupSteps({ ...user[0], phone: user[11].phone });
  await signUp2Step.errorTextPhoneInvalid()
});
test(`27. tezro sign up: partial phone = ${user[12].phone}`, async t => {
  await signupSteps({ ...user[0], phone: user[12].phone });
  await signUp2Step.errorTextPhoneInvalid()
});
test('28. tezro sign up: pin invalid', async t => {
  await signupSteps(user[0]);
  await signUp3Step.signUp3StepEnterPinUser(user[0].pin);
  await signUp3Step.signUp3StepEnterPinUser(user[1].pin);
  await signUp3Step.errorPinFailed();
  await signUp3Step.signUp3StepEnterPinUser(user[0].pin);
  await signUp3Step.signUp3StepEnterPinUser(user[0].pin);
  await signUp3Step.signUp3StepUrl();
  await logout();
});
*/
});
