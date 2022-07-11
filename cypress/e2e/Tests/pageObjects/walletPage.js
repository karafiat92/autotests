///<reference types="cypress"/>
import BigNumber from "bignumber.js";

const wallet = {
  // locators
  // Список кошельков/Стартовая страница кошельков
  currencyList:
    "button[class='StyledWalletBalanceInfo_s1rdc79s StyleButton_s1oa7yi9']",
  pageTitleSelector: ".StyledHeaderWrapper_sisb9an",
  pageTitleText: "Wallet",
  // История транзакций
  transactionHistoryWalletBalance: "#transactionHistoryWalletBalance",
  transactionHistorySendBtn: "#transactionHistorySendBtn",
  transactionItemInTransactionList: ".StyledTransactionsHistoryItem_s2rinvy",
  // Экран Send
  dialogWindow: "div[role='dialog']",
  addressInput: "#address",
  amountInput: "input[name='amount']",
  sendTransactionModalNextBtn: "#sendTransactionModalNextBtn",
  // Модалка подтверждения транзакции
  sendTransactionInfoModalSendBtn: "#sendTransactionInfoModalSendBtn",
  successTransactionSubmittBtn: "#submitInfoModalBtn",

  // actions
  // Открытие истории транзакции валюты
  openTransactionHistory(currency) {
    cy.get(this.currencyList).contains(currency).should("be.visible").click();
    cy.get(this.transactionHistoryWalletBalance)
      .invoke("text")
      .as("oldBalance"); // псевдоним для сравнения суммы после отправки
    return this;
  },
  // Открытие экрана Send
  openSendScreen() {
    cy.get(this.transactionHistorySendBtn)
      .should("be.enabled")
      .should("be.visible")
      .click();
    cy.get(this.dialogWindow).should("be.visible");
    return this;
  },
  // Заполнение полей на экране Send (адрес, минималка (для проверки), сумма)
  fillingAddressAndAmount(address, currencyMin, amount) {
    cy.get(this.dialogWindow)
      .find(this.addressInput)
      // Вводим адрес
      .type(address)
      .should("contain.value", address);
    // Ищем поле суммы
    cy.get(this.amountInput)
      .should("contain.value", currencyMin)
      // Очищаем поле и вводим новую сумму
      .clear()
      .type(amount);
    return this;
  },
  // Отправка транзакции (проверка получателя, текста в модалке, адреса)
  createExternalTransaction(recipientName, modalText, address) {
    if (recipientName == "External Transaction") {
      cy.get(this.sendTransactionModalNextBtn)
        .should("be.enabled")
        .should("be.visible")
        .click();
      // Модалка подтверждения транзакции юзеру Тезро
      cy.get(this.dialogWindow)
        .should("contain.text", modalText)
        .and("contain.text", address);
      // Отправляем транзакцию
      cy.get(this.sendTransactionInfoModalSendBtn)
        .should("be.enabled")
        .should("be.visible")
        .click();
    } else {
      // Нажимаем Next
      cy.get(this.sendTransactionModalNextBtn)
        .should("be.enabled")
        .should("be.visible")
        .click();
      // Модалка подтверждения транзакции юзеру Тезро
      cy.get(this.dialogWindow)
        .should("contain.text", recipientName)
        .and("contain.text", modalText)
        .and("contain.text", address);
      // Отправляем транзакцию
      cy.get(this.sendTransactionInfoModalSendBtn)
        .should("be.enabled")
        .should("be.visible")
        .click();
    }
    return this;
  },
  // Закрытие модалки успешной отправки транзакции
  closeSuccessTransactionModal() {
    cy.wait(3000)
      .get(this.dialogWindow)
      .should("contain.text", "Success")
      .find(this.successTransactionSubmittBtn)
      .click();
    return this;
  },
  // Сравнение баланса после отправки транзакции
  compareBalanceInTransactionHistory(transactionAmount) {
    cy.wait(7000)
      .get(this.transactionHistoryWalletBalance)
      .invoke("text")
      .as("newBalance")
      .then(parseFloat)
      .then(($bal) => {
        const oldBalance = new BigNumber($bal);
        const result = new BigNumber(oldBalance).plus(transactionAmount);
        cy.get("@oldBalance")
          .then(parseFloat)
          .should("equal", result.toNumber());
      });
    return this;
  },
  // Проверка наличия исходящей транзакции в истории (получатель, Сумма, валюта, направление)
  checkTransactionInTransactionHistory(name, amount, currency, direction) {
    cy.wait(3000)
      .get(this.transactionItemInTransactionList)
      .first()
      .should("contain.text", name)
      .and("contain.text", amount)
      .and("contain.text", currency)
      .and("contain.text", direction);
    return this;
  },
  // Проверка наличия комиссии у внешней транзакции
  checkTransactionCommission(commission, currency) {
    cy.get(this.transactionItemInTransactionList)
      .first()
      .should("contain.text", "Commission service")
      .and("contain.text", `-${commission} ${currency}`);
    return this;
  },
};
export default wallet;
