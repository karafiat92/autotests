///<reference types="cypress"/>
import chat from "../Tests/pageObjects/chatPage";
import signIn from "../Tests/pageObjects/signinPage";

let groupName = `group number ${Math.round(Math.random() * 1000)}`;
let membersAmount = 2;
let userForSearch = "ra"

describe("Group chat", () => {
  beforeEach(() => {
    let userLoginDataNumber = 0;
    signIn.openSigninPage();
    signIn.typeSeedPhrase(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
  });

  it("1. Create and delete a group chat", () => {
    chat
      .openCreateGroupWindow()
      .addMembersBeforeGroupCreated(userForSearch, membersAmount)
      .openGroupDataFilling()
      .fillGroupData(groupName)
      .openCreatedGroup(groupName)
      .checkGroupData(groupName, membersAmount)
      .openChatContextMenu(groupName)
      .chooseContextMenuItem("Delete")
      .deleteChat(groupName)
  }); 
}); //describe
