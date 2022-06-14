///<reference types="cypress"/>
import testData from "../../support/testData";
import chat from "../Tests/pageObjects/chatPage";
import signIn from "../Tests/pageObjects/signinPage";

let groupName = `group number ${Math.round(Math.random() * 1000)}`;
let membersAmount = 2;
let userForSearch = "rab"

describe("Group chat", () => {
  beforeEach(() => {
    let userLoginDataNumber = 0;
    signIn.openSigninPage();
    signIn.typeSeedPhrase(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
  });

  it("1. Create group chat", () => {
    chat
      .openCreateGroupWindow()
      .addMembersBeforeGroupCreated(userForSearch, membersAmount)
      .openGroupDataFilling()
      .fillGroupData(groupName)
      .openCreatedGroup(groupName)
      .checkGroupData(groupName, membersAmount)
  }); 
}); //describe
