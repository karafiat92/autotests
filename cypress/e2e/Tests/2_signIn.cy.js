
///<reference types="cypress"/>

import signIn from './pageObjects/signinPage';

describe("Authorisation in Web Tezro", () => {

  it("1. tezro sign in: success", () => {
    let userLoginDataNumber = 0
    signIn.openSigninPage()
    signIn.typeSeedPhrase(userLoginDataNumber)
    signIn.enterPincode(userLoginDataNumber)
    signIn.enterPincode(userLoginDataNumber)
    cy.wait(3000).url().should("eq", signIn.startPage);

  });
});//describe