///<reference types="cypress"/>
import tezroData from "../../support/tezro_data";
import locators from "../../support/elementsLocators";
import BigNumber from 'bignumber.js';
let signinLoc = locators?.signInLocators.signIn;
let sendCrypto = tezroData.sendCryptoData;

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
    // авторизация. Потом перепишу в отдельную простую функцию для запуска в 1 строку
    cy.viewport(1800, 950)
      .visit(tezroData.urls.startUrl);
    cy.url()
      .should("eq", tezroData.urls.startUrl);
    cy.get(`${locators.signUpLocators.startPage.signInButton}`)
      .click();
    cy.url()
      .should("eq", tezroData.urls.signInUrl);
    cy.get(`${signinLoc.seedPhraseInput}`)
      .type(
        `${tezroData.userLoginData[0].seedPhrase}`
      ); // подумать,
    //как прикрутить функцию Лены typeTextData
    cy.get(`${signinLoc.seedPhraseInput}`)
      .should("contain.value",
        `${tezroData.userLoginData[0].seedPhrase}`
      );
    cy.get(`${signinLoc.loginButton}`)
      .click()
      .wait(1000);
    signinLoc.pinInput.forEach((pinCount) => {
      cy.get(`${pinCount}`)
        .type("1");
    });
    signinLoc.pinInput.forEach((pinCount) => {
      cy.focused()
        .type("1");
    });
    cy.wait(2000)
      .url()
      .should("eq", "https://dev-web.tezro.com/");
  });
  xit("Sending transaction in privat chat", () => {
    let currency = "ETH";
    let transactionAmount = 0.000001
    // Сначала найдём юзера, которому перекидывать деньги
    // Открываем чат с ним
    cy.wait(2000)
      .get("#searchInput")
      .should("be.enabled")
      .focus()
      .wait(2000)
      .type(tezroData.userGlobalSearch.lastname)
      .wait(500);
    cy.get("#dialogs-infinityScrollWrapper")
      .should("contain.text", tezroData.userGlobalSearch.lastname)
      .then(($chat) => {
        cy.document($chat);
        cy.get($chat)
          .find("button")
          .click();
      });
    cy.get("#currencyButton")
      .should("exist")
      .should("be.enabled")
      .click();
    cy.get(".ReactModal__Content")
      .should("be.visible");

    cy.get(".StyledCurrency_s1646xb6")
      .find("p[class='StyleText_svkxk8i']")
      .contains(currency)
      .as(`${currency}wallet`)
      .should("exist")
      .siblings("p")
      .as("walletCurrency")
      .invoke("text")
      // Сохраняем значение баланса
      .as("balance1")
      .then(parseFloat)
    cy.get('@' + `${currency}wallet`)
      .parents('div.StyledCurrency_s1646xb6')
      .find('button')
      .as(`${currency}button`)
      .click();
    // Вводим сумму
    cy.get("input[name='amountField']")
      .clear()
      .type(transactionAmount)
      .should('have.value', transactionAmount)
      .type('{enter}')
    // Вводим пинкод
    cy.get("div[role='dialog']")
      .should('exist')
    signinLoc.pinInput.forEach(pinCount => {
      cy.get(`${pinCount}`)
        .type('1')
    })
    // Проверяем, что сумма уменьшилась
    cy.wait(7000)
      .get("#currencyButton")
      .should("exist")
      .should("be.enabled")
      .click()
      .wait(4000);
    cy.get(".StyledCurrency_s1646xb6")
      .find("p[class='StyleText_svkxk8i']")
      .contains(currency)
      .should("exist")
      .siblings("p")
      .invoke("text")
      .wait(3000)
      .as("balance2")
      .then((bal2) => {
        const newBalance = new BigNumber(bal2);
        cy.log("new balance: " + newBalance.toNumber())
        let transactionResult = new BigNumber(newBalance).plus(transactionAmount)
        cy.get('@balance1')
          .then(parseFloat)
          .then((bal1) => {
            const oldBalance = new BigNumber(bal1);
            cy.log("old balance: " + oldBalance.toNumber())
            cy.wrap(oldBalance.toNumber())
          }).should("equal", transactionResult.toNumber())
      })
  })
  xit("Sending escrow transaction in privat chat", () => {
    let currency = "ETH";
    cy.wait(2000)
      .get("#searchInput")
      .should("be.enabled")
      .focus()
      .wait(2000)
      .type(tezroData.userGlobalSearch.lastname)
      .wait(500);
    cy.get("#dialogs-infinityScrollWrapper")
      .should("contain.text", tezroData.userGlobalSearch.lastname)
      .then(($chat) => {
        cy.document($chat);
        cy.get($chat)
          .find("button")
          .click();
      });
    cy.get("#currencyButton")
      .should("exist")
      .should("be.enabled")
      .click();
    cy.get(".ReactModal__Content")
      .should("be.visible");
    // Написать проверку на то, что в сообщении отображается правильная сумма
    cy.get(".StyledCurrency_s1646xb6")
      .find("p[class='StyleText_svkxk8i']")
      .contains(currency)
      .as(`${currency}wallet`)
      .should("exist")
      .siblings("p")
      .as("walletCurrency")
      .invoke("text")
      // Сохраняем значение баланса
      .as("balance1")
      .then(parseFloat)
    cy.get('@' + `${currency}wallet`)
      .parents('div.StyledCurrency_s1646xb6')
      .find('button')
      .as(`${currency}button`)
      .click()
    cy.get("input[name='amountField']")
      .invoke('val')
      .as(`${currency}min`)
    // Прожимаем кнопку эскроу
    cy.get('#escrowTxFormBtn')
      .click();
    cy.get("#sendTxFormBtn")
      .click();
    cy.get('.PinCodeWrapper_pnkfvhj')
      .should("contain.text", 'Sending money under ESCROW you agree')
      .find('.StyledCheckWrapper_sufxuur')
      .should('have.attr', 'style')
      .and('equal', '--sufxuur-0:scale(1);')
    signinLoc.pinInput.forEach(pinCount => {
      cy.get(`${pinCount}`)
        .type('1')
    })
    cy.wait(8000)
    cy.get('p[class="StyledFullDate_s4n5bsi StyleText_svkxk8i"]')
      .last()
      .then(($elem) => {
        cy.get($elem)
          .parents('div[class="messageTxItem StyledWrapper_s1u2hop9"]')
          .as('escrowTransaction')
        cy.wrap($elem)
      })
      .should('contain.text', '179: 23: 5')
      .siblings('.StyledEscrowTxInnerContent_smwsvb3')
      .find('button')
      .click()
    cy.get('div[role="dialog"]')
      .should('be.visible')
      .find('#submitInfoModalBtn')
      .should('be.enabled')
      .click();
    cy.get('@escrowTransaction')
      .should('not.contain.text', '179: 23: ')

    // Очищение истории, чтобы получать правильную транзакцию
    cy.get('.StyledCurrentChatMenu_s1dxgzff').click()
    cy.get('div[role="menu"]')
      .should("be.visible")
      .find("div[role='menuitem']")
      .contains("Clear history")
      .click()
    cy.get("div[role='dialog']")
      .should("be.visible")
      .find('button')
      .contains("Clear")
      .should("be.enabled")
      .click()
  })
  // Попробовать для сравнения значения при совершении транзакции
  // cy.get('#num-example .messages').should(($el) => {
  //   const n = parseInt($el.text())
  //   expect(n, 'number of messages')
  //     .to.be.a('number')
  //     .and.be.within(0, 10)
  // })

  // Работает, можно переиспользовать для проверки текста
  //   cy.get('@balance').then((bal)=>{
  //     let texti = bal
  // Возвращает текст, охохо
  //     cy.wrap(texti).as('texti')
  //     })
  //   cy.get('@texti').then(texti => {
  //     expect(texti).to.contain(balanceString)
  //  });

  // Написание сообщения
  // let messagg = "qqqdsfgsdfgsdffgdsfgsdfgsdfg ggdsfgdfgdsdfgdfgdfgdsfttt"
  // // Пишем текстовое сообщение
  // cy.get("#messageFieldValue")
  // .focus()
  // .should("be.enabled")
  // .type(messagg)
  // .invoke('val').as('aliasWithText')
  // cy.get("#messageFieldValue").type("{enter}");

  // cy.get('@aliasWithText').then(() => {
  //   cy.get("p[class='messageTextItem MessageClassStyle_m2dsqsi StyleText_svkxk8i']")
  // .last()
  // .invoke('text')
  // .should("eq", messagg)
  // })
  xit("Sending internal transaction on Send screen", () => {
    const transactionAmount = new BigNumber(0.01).toNumber();
    // Открываем кошельки
    cy.get("#walletsButton")
      .contains("Wallet")
      .should("be.visible")
      .click()
    // Открываем историю транзакций эфира
    cy.get("button[class='StyledWalletBalanceInfo_s1rdc79s StyleButton_s1oa7yi9']")
      .contains(sendCrypto[0].currencyName)
      .should("be.visible")
      .click()
    //Запоминаем сумму на кошельке
    cy.get("#transactionHistoryWalletBalance")
      .invoke("text")
      .as("oldBalance") // псевдоним для сравнения суммы после отправки
    // Открываем экран Send
    cy.get("#transactionHistorySendBtn")
      .should('be.enabled')
      .should('be.visible')
      .click()
    // Появляется экран Send
    cy.get("div[role='dialog']")
      .should("be.visible")
      .find("#address")
      // Вводим адрес
      .type(sendCrypto[0].address)
      .should("contain.text", sendCrypto[0].address)
    // Ищем поле суммы
    cy.get("input[name='amount']")
      .should(
        "contain.value",
        new BigNumber(sendCrypto[0].externalMin).toNumber()
      )
      // Очищаем поле и вводим новую сумму
      .clear()
      .type(transactionAmount)
    // Нажимаем Next
    cy.get("#sendTransactionModalNextBtn")
      .should("be.enabled")
      .should("be.visible")
      .click()
    // Модалка подтверждения транзакции юзеру Тезро
    cy.get("div[role='dialog']")
      .should("contain.text", sendCrypto[0].recipientName)
      .and("contain.text", sendCrypto[0].modalText)
      .and("contain.text", sendCrypto[0].address)
    // Отправляем транзакцию
    cy.get("#sendTransactionInfoModalSendBtn")
      .should('be.enabled')
      .should('be.visible')
      .click()
    // Вводим пинкод
    signinLoc.pinInput.forEach(pinCount => {
      cy.get(`${pinCount}`)
        .type('1')
    })
    //Модалка успешной отправки
    cy.wait(8000)
      .get("div[role='dialog']")
      .should("contain.text", "Success")
      .find("#submitInfoModalBtn")
      .click()
      // Смотрим баланс и сравниваем с прошлым
      .get("#transactionHistoryWalletBalance")
      .invoke("text")
      .as('newBalance')
      .then(parseFloat)
      .then(($bal) => {
        const oldBalance = new BigNumber($bal);
        const result = new BigNumber(oldBalance).plus(transactionAmount)
        cy.get('@oldBalance')
          .then(parseFloat)
          .should("equal", result.toNumber())
      })
    // Смотрим, что появилась операция
    cy.get(".StyledTransactionsHistoryItem_s2rinvy")
      .first()
      .should("contain.text", sendCrypto[0].recipientName)
      .and(
        "contain.text",
        `-${transactionAmount} ${sendCrypto[0].currencyabbreviation}`
      )
      .and("contain.text", "Sent")
  }); // it
  it("Sending external transaction on Send screen", () => {
    const transactionAmount = new BigNumber(0.01).toNumber();
    const commission = new BigNumber(transactionAmount)
      .multipliedBy(sendCrypto[1].commission)
    // Открываем кошельки
    cy.get("#walletsButton")
      .contains("Wallet")
      .should("be.visible")
      .click()
    // Открываем историю транзакций эфира
    cy.get("button[class='StyledWalletBalanceInfo_s1rdc79s StyleButton_s1oa7yi9']")
      .contains(sendCrypto[1].currencyName)
      .should("be.visible")
      .click()
    //Запоминаем сумму на кошельке
    cy.get("#transactionHistoryWalletBalance")
      .invoke("text")
      .as("oldBalance") // псевдоним для сравнения суммы после отправки
    // Открываем экран Send
    cy.get("#transactionHistorySendBtn")
      .should('be.enabled')
      .should('be.visible')
      .click()
    // Появляется экран Send
    cy.get("div[role='dialog']")
      .should("be.visible")
      .find("#address")
      .type(sendCrypto[1].address)
      .should("contain.value", sendCrypto[1].address)
      .get("input[name='amount']")
      .should(
        "contain.value",
        new BigNumber(sendCrypto[0].externalMin).toNumber()
      )
    // Нажимаем кнопку Next
    cy.get("#sendTransactionModalNextBtn")
      .should("be.enabled")
      .should("be.visible")
      .click()
    // Модалка подтверждения транзакции юзеру Тезро
    cy.get("div[role='dialog']")
      .should("contain.text", sendCrypto[1].modalText)
      .and("contain.text", sendCrypto[1].address)
    // Отправляем транзакцию
    cy.get("#sendTransactionInfoModalSendBtn")
      .should('be.enabled')
      .should('be.visible')
      .click()
    // Вводим пинкод
    signinLoc.pinInput.forEach(pinCount => {
      cy.get(`${pinCount}`)
        .type('1')
    })
    //Модалка успешной отправки
    cy.wait(8000)
      .get("div[role='dialog']")
      .should("contain.text", "Success")
      .find("#submitInfoModalBtn")
      .click()
      // Смотрим баланс и сравниваем с прошлым
      .get("#transactionHistoryWalletBalance")
      .invoke("text")
      .as('newBalance')
      .then(parseFloat)
      .then(($bal) => {
        const newBalance = new BigNumber($bal);
        const result = new BigNumber(newBalance).plus(transactionAmount).plus(commission)
        cy.get('@oldBalance')
          .then(parseFloat)
          .should("equal", result.toNumber())
      })
    // Смотрим, что появилась операция
    cy.get(".StyledTransactionsHistoryItem_s2rinvy")
      .first()
      .should("contain.text", sendCrypto[1].recipientName)
      .and(
        "contain.text",
        `-${transactionAmount} ${sendCrypto[1].currencyabbreviation}`
      )
      .and("contain.text", "Sent")
      .and("contain.text", "Commission service")
      .and(
        "contain.text",
        `-${commission} ${sendCrypto[1].currencyabbreviation}`
      )

  }); // it

}); // describe
