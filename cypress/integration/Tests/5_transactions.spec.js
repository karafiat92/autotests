///<reference types="cypress"/>
import tezroData from "../../support/tezro_data";
import locators from "../../support/elementsLocators";
let signinLoc = locators?.signInLocators.signIn;

describe("Sending transactions", () => {
  beforeEach(() => {
    // авторизация. Потом перепишу в отдельную простую функцию для запуска в 1 строку
    cy.viewport(1800, 950).visit(tezroData.urls.startUrl);
    cy.url().should("eq", tezroData.urls.startUrl);
    cy.get(`${locators.signUpLocators.startPage.signInButton}`).click();
    cy.url().should("eq", tezroData.urls.signInUrl);
    cy.get(`${signinLoc.seedPhraseInput}`).type(
      `${tezroData.userLoginData[0].seedPhrase}`
    ); // подумать,
    //как прикрутить функцию Лены typeTextData
    cy.get(`${signinLoc.seedPhraseInput}`).should(
      "contain.value",
      `${tezroData.userLoginData[0].seedPhrase}`
    );
    cy.get(`${signinLoc.loginButton}`).click().wait(1000);
    signinLoc.pinInput.forEach((pinCount) => {
      cy.get(`${pinCount}`).type("1");
    });
    signinLoc.pinInput.forEach((pinCount) => {
      cy.focused().type("1");
    });
    cy.wait(2000).url().should("eq", "https://dev-web.tezro.com/");
  });

  it("Sending transaction in privat chat", () => {
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
        cy.get($chat).find("button").click();
      });

    let currency = "ETH";
    let transactionAmount = 0.000001
    let displayDecimal = 8

    cy.get("#currencyButton").should("exist").should("be.enabled").click();
    cy.get(".ReactModal__Content")
      //.contains("Choose currency")
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
    // .should("equal", 0.20540427)
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
        cy.get(`${pinCount}`).type('1')
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
    .then(parseFloat)
    .then((bal2) => {
      cy.log("new balance: " + bal2)
      let transactionResult = (bal2 + transactionAmount)
      cy.get('@balance1').then(parseFloat)
      .then((bal1) => {
        cy.log("old balance: " + bal1)
        cy.wrap(bal1)
      }).should("equal", transactionResult)
    })
    // Написать проверку на то, что в сообщении отображается правильная сумма
    cy.get('@' + `${currency}button`).click();
    cy.get("input[name='amountField']").invoke('val').as(`${currency}min`)
    // Прожимаем кнопку эскроу
    cy.get('#escrowTxFormBtn').click();
    cy.get("#sendTxFormBtn").click();
    cy.get('.PinCodeWrapper_pnkfvhj')
    .should("contain.text", 'Sending money under ESCROW you agree')
    // .find('#escrowCheckBoxPineCodeModal')
    .find('.StyledCheckWrapper_sufxuur')
    .should('have.attr', 'style')
    .and('equal', '--sufxuur-0:scale(1);')
    signinLoc.pinInput.forEach(pinCount => {
      cy.get(`${pinCount}`).type('1')
    })
    cy.wait(8000)
    cy.get('p[class="StyledFullDate_s4n5bsi StyleText_svkxk8i"]').last()
    .then(($elem) => {
      cy.get($elem).parents('div[class="messageTxItem StyledWrapper_s1u2hop9"]')
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
    cy.get('@escrowTransaction').should('not.contain.text', '179: 23: ')
        
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
  }); // it
}); // describe
