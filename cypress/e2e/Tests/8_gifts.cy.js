///<reference types="cypress"/>
///<reference types="@shelex/cypress-allure-plugin" />
import chat from "../Tests/pageObjects/chatPage";
import signIn from "../Tests/pageObjects/signinPage";
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


  it("1. Create a gift card and share after the creation", () => {
    main.openGifts();
    gift
      .openCreateNewGiftScreen()
      .openWalletsList()
      .chooseWallet(currency)
      .сheckInternalMinInAmountField(currencyMin)
      .enterWish(wishText)
      .enterGiftAmount(giftAmount)
      .enterNumberOfPeople(numberOfPeople)
      .setSplitAndShowSumType(sumSplit, showSum)
      .pressCreateCardButton();
    chat.enterPincode(0);
    gift
      .checkDataOnCardAfterCreating(currency, giftAmount, showSum, wishText)
      .openShareModal();
    chat
      .findUserInShareModal(cardRecipient)
      .makeChoiceInDialogsForShare(cardRecipient);
    gift.closeGiftModal("Back")
    .openCreateNewGiftScreen()
    .openWalletsList()
    .compareBalanceInWalletList(currency, currencyMin)
    .closeWalletsList()
    chat.openChatWithUser(cardRecipient);
    if (showSum == "Yes")
      chat.checkMediaQrInChat(mediaQRType, currency, giftAmount);
    else chat.checkMediaQrInChat(mediaQRType, "Surprise");
    if (wishText == "")
      chat.checkMediaQrInChat(mediaQRType, gift.defaultWishOnCard);
    else chat.checkMediaQrInChat(mediaQRType, wishText);
    chat.clearHistory().sendMessage("hi");
  });

  // Не дописан
  xit("2. Create a gift card and share the gift card from card infirmation page", () => {
    main.openGifts();
    gift
      .openCreateNewGiftScreen()
      .openCurrencyModal()
      .chooseCurrency(currency, currencyMin)
      .enterWish(wishText)
      .enterGiftAmount(giftAmount)
      .enterNumberOfPeople(numberOfPeople)
      .setSplitAndShowSumType(sumSplit, showSum)
      .pressCreateCardButton();
    chat.enterPincode(0);
    gift
      .checkDataOnCardAfterCreating(currency, giftAmount, showSum, wishText)
      .closeGiftModal("Back");
  });

  xit("3. Own card activation", () => {});

  xit("4. Delete gift card", () => {});
});
