///<reference types="cypress"/>
import testData from "../../support/testData";
import locators from "../../support/elementsLocators";
import BigNumber from 'bignumber.js';
import chat from "./pageObjects/chatPage";
import signIn from "./pageObjects/signinPage";
import main from "./pageObjects/mainPage";
import config from "../Tests/tezroConfigs/cryptoWalletsConfigs";
import wallet from "./pageObjects/walletPage";
let signinLoc = locators?.signInLocators.signIn;
let sendCrypto = testData.sendCryptoData;

let foundUser = "Mr Spell"
let currency = "ETH";
let message = "Hi"
const internalTransactionAmount= new BigNumber(0.000001).toNumber()
const internalCyrrencyMin = new BigNumber(config.ETH.limits.internal).toNumber()
const externalTransactionAmount = new BigNumber(0.01).toNumber()
const externalCyrrencyMin = new BigNumber(0.01).toNumber();

BigNumber.config({
  EXPONENTIAL_AT: 1e9,
  FORMAT: {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: '',
  },
});

describe("Sending transactions", () => {
  beforeEach(() => {
    let userLoginDataNumber = 0;
    signIn.openSigninPage();
    signIn.typeSeedPhrase(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
    signIn.enterPincode(userLoginDataNumber);
  });
  it("Sending transaction in privat chat", () => {
    chat.findUser(foundUser)
    .openWalletsList()
    .chooseWallet(sendCrypto[0].currencyabbreviation)
    .enterTransactionAmount(internalTransactionAmount)
    .enterPincode(0)
    cy.wait(7000)
    chat.openWalletsList()
    .compareBalanceInWalletList(sendCrypto[0].currencyabbreviation, internalTransactionAmount)
    .closeWalletsList()
    .clearHistory()
    .sendMessage(message)
  });
  
  it("Sending escrow transaction in privat chat", () => {
    cy.wait(2000)
    chat.findUser(foundUser)
    .openWalletsList()
    .chooseWallet(sendCrypto[0].currencyabbreviation)
    .enterEscrowMinAmount(sendCrypto[0].currencyabbreviation, internalCyrrencyMin) 
    .enterPincode(0)
    cy.wait(8000)
    chat.openEscrowModalWindow()
    .unlockEscrow()
    // Очищение истории, чтобы получать правильную транзакцию
    // из списка транзакций
    chat.openWalletsList()
    .compareBalanceInWalletList(sendCrypto[0].currencyabbreviation, internalCyrrencyMin)
    .closeWalletsList()
    .clearHistory()
    .sendMessage(message)
  })
  
  it("Sending internal transaction on Send screen", () => {
    cy.log(config.ETH.limits.internal)
    main.openWallets()
    wallet.openTransactionHistory(sendCrypto[0].currencyName)
    .openSendScreen()
    .fillingAddressAndAmount(sendCrypto[0].address, externalCyrrencyMin, externalTransactionAmount)
    .createExternalTransaction(sendCrypto[0].recipientName, sendCrypto[0].modalText, sendCrypto[0].address)
    chat.enterPincode(0)
    wallet.closeSuccessTransactionModal()
    .compareBalanceInTransactionHistory(externalTransactionAmount)
    .checkTransactionInTransactionHistory(
      sendCrypto[0].recipientName,
      externalTransactionAmount,
      sendCrypto[0].currencyabbreviation,
      sendCrypto[0].direction
    )
  }); 
  it("Sending external transaction on Send screen", () => {
    const commission = new BigNumber(externalTransactionAmount)
      .multipliedBy(config.ETH.commission.output)

    cy.log(config.ETH.commission.output)
    main.openWallets()
    wallet.openTransactionHistory(sendCrypto[1].currencyName)
    .openSendScreen()
    .fillingAddressAndAmount(sendCrypto[1].address, externalCyrrencyMin, externalTransactionAmount)
    .createExternalTransaction(sendCrypto[1].recipientName, sendCrypto[1].modalText, sendCrypto[1].address)
    chat.enterPincode(0)
    wallet.closeSuccessTransactionModal()
    .compareBalanceInTransactionHistory(new BigNumber(externalTransactionAmount).plus(commission))
    .checkTransactionInTransactionHistory(
      sendCrypto[1].recipientName,
      externalTransactionAmount,
      sendCrypto[1].currencyabbreviation,
      sendCrypto[1].direction
    )
    .checkTransactionCommission(commission, sendCrypto[1].currencyabbreviation)
  }); 
}); // describe
