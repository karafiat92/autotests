///<reference types="cypress"/>
import tezroData from '../../support/tezro_data';
import locators from '../../support/elementsLocators'
let signinLoc = locators?.signInLocators.signIn

let paragraphText = [
    'Members',
    '0 members'
]

let groupName = `group number ${Math.round(Math.random()*1000)}`
let membersAmount = 2

describe("Group chat", () => {
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

  it("1. Create group chat", () => {
      //Открытие экрана создания группы
    cy.get('button[class="MenuButtonClassStyle_m9q5hkl StyleButton_s1oa7yi9"]')
    .should('be.enabled')
    .click();
    //Проверяем, что открылся (текст про членов и их количество (0))
    cy.get('div[class="StyledSelectedBlock_s15i499r"]').children('p').then(($elem) => {
        let i = 0
        paragraphText.forEach(element => {
            cy.wrap($elem[i]).should('have.text', element)
            ++i
        });
    })
    //Нельзя создать группу без членов
    cy.get('button[class="StyledAddToGroupBtn_s1o5v6gu StyleButton_s1oa7yi9"]')
    .should('be.disabled');
    //Добавление в группу людей
    cy.get("#searchField")
    .should("be.enabled")
    .type("rabb{enter}");
    cy.get('div[class="infinite-scroll-component StyledInfinityList_s1ozr89r"]')
    .children('div')
    .then(($chat) => {
      cy.wait(1000)
        for (var i = 0; i < membersAmount; i++) {
          cy.wait(100)
          .log(`${i}`)
        cy
        .wrap($chat[i])
        .children('button')
        .click()

        }
    })
    //Проверяем, что изменилось количество членов на membersAmount
    cy.get('div[class="StyledSelectedBlock_s15i499r"]')
    .children('p')
    .last().then(($elem) => {
            cy.wrap($elem).should('have.text', `${membersAmount} members`)
        });
    //Создание группы (переход к заполнению данных группы)
    cy.get('button[class="StyledAddToGroupBtn_s1o5v6gu StyleButton_s1oa7yi9"]')
    .should('be.enabled')
    .click();
    //Открылась модалка заполнения данных группы
    cy.get('form[class="StyledNewGroupModal_s468f18"]')
    .should('exist').then(($elem) => {
        cy.wrap($elem).find('textarea')//.forEach(element => {
            .should('be.enabled')
        })
    //Проверяем, что без имени не создаётся группа
    cy.get('button').contains('Ok').click();
    cy.get('#newGroupName').then(($elem) => {
        cy.wrap($elem)
        .siblings().last()
        .should('have.text', 'Required field')
        cy.wrap($elem)
    }).type(groupName)
    //Создаём группу и открываем
    cy.get('button').contains('Ok').click().wait(2000);
    cy.get('button[id="dialogItem"]')
    .find('p[class="StyledAuthor_sixaul3 StyleText_svkxk8i"]')
    .then(($parag) => {
        cy.wrap($parag[0]).should('have.text', groupName)
        cy.wrap($parag[0])
    }).parentsUntil("#dialogItem").last().click()
    // Проверяем все данные в открытой группе
    
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // тащим значения из заголовка с именем юзера
    // и сравниваем с создателем группы
    // и не забываем дышать
    cy.get('p[class="StyleText_svkxk8i"]').first()
    .invoke('text').as('aliasWithText')
    cy.get('@aliasWithText').then((text) => {
      cy.get(".StyledMessageBlock_sfd8xei")
    .last()
    .invoke('text')
    .should('eq', `${text} created the group «${groupName}»`)
    })

    cy.get(".StyledMessageBlock_sfd8xei")
    .last()
    .invoke('text')
    .should('eq', `Vvvvvv Vvvvvv created the group «${groupName}»`)
    cy.get(".StyledChatHeader_s179c1mb").last()
    .should('have.text', `${groupName}${membersAmount + 1} members`)

  }); //it1
});//describe