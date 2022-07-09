///<reference types="cypress"/>
import chat from "../Tests/pageObjects/chatPage";
import signIn from "../Tests/pageObjects/signinPage";
import testData from "../../support/testData";
import BigNumber from "bignumber.js";
import main from "./pageObjects/mainPage";
import gift from "./pageObjects/giftPage";

let cardRecipient = "Mr Spell";
const giftAmount = new BigNumber(0.0001).toNumber();
const numberOfPeople = 2;
let currency = "ETH";
const currencyMin = new BigNumber(0.00000001).toNumber().toFixed(8);
let sumSplit = "Random";
let showSum = "No";
let wishText = "";
let mediaQRType = "Gift";

describe("Gift cards tests", () => {
  beforeEach(() => {
    let userLoginDataNumber = 0;
    signIn.openSigninPage();
    signIn.typeSeedPhrase(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
  });
  it("1. Create gift card and share after the creation", () => {
    main.openGifts();
    gift
      .openCreateNewGiftScreen()
      .openCurrencyModal()
      .chooseCurrency(currency, currencyMin)
      .enterWish(wishText)
      .enterGiftAmount(giftAmount)
      .enterNumberOfPeople(numberOfPeople)
      .setSplitAndShowSumTypse(sumSplit, showSum)
      .pressCreateCardButton();
    chat.enterPincode(0);
    gift
      .checkDataOnCard(currency, giftAmount, showSum, wishText)
      .openShareModal();
    chat.makeChoiceInDialogsForShare(cardRecipient);
    gift.closeCongratsModal();
    chat.openChatWithUser(cardRecipient)
    if (showSum == "Yes")
      chat.checkMediaQrInChat(mediaQRType, currency, giftAmount);
    else chat.checkMediaQrInChat(mediaQRType, "Surprise");
    if (wishText == "")
      chat.checkMediaQrInChat(mediaQRType, gift.defaultWishOnCard);
    else chat.checkMediaQrInChat(mediaQRType, wishText);
    chat.clearHistory()
    .sendMessage("hi")
  });
});
