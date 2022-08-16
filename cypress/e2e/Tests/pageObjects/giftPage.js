///<reference types="cypress"/>

const gift = {
  // locators
  dialogWindow: "div[role='dialog']",
  menuWindow: "div[role='menu']",
  menuItem: "div[role='menuitem']",
  // Модалка со списком гифтов
  giftModalTitleText: "Gift List",
  closeModalButton: ".CloseButton_c1ne0lt7", // Gift inforamtion too, Congratulation modal too
  modalHeaderButton: ".StyleButton_s1oa7yi9", // + gift, Congratulation modal, close
  giftListInModal: ".StyledGiftList_sarewyw",
  // Карточка в списке гифтов
  giftItemButton: ".StyledGiftCard_s1v6ib76",
  wishOnCardInGiftList: ".StyledWish_s1efadc1",
  restOfCardBalanceInGiftList: ".StyledCurrentAmount_stilzil",
  startCardBalanceInGiftList: ".StyledBalance_s11mfp19",
  qrOnCardInGiftList: "#react-qrcode-logo", // congrat modal too
  giftRecipientAvatarInGiftList: ".StyledUserAvatarsWrapper_s1ckw2ag",
  // Create Gift Card
  wishInput: "#wish_text",
  createNewGiftTitleText: "Create Gift Card",
  giftModalTitle: ".StyledTitle_sr683lu",
  recipientNumberInput: "#recipients_count",
  amountInput: ".AmountClassStyle_a10u5g8i",
  radioButtonLable: ".StyledRadioButton_svh4qu8",
  raddioButtonInput: ".StyledInput_sg6pdlz",
  createGiftButton: ".CreateGiftCardSubmit_clg9mi7",
  currencyButton: ".CreateGiftCardButtonCurrency_cjtiunp",
  chooseCurrencyTitle: "Choose currency",
  // Выбор валюты
  searchInput: "#search",
  currencyItem: ".StyledCurrency_s1646xb6",
  currencyBalance: ".chooseCurrencyModalCurrencyBalance",
  chooseCurrencyButton: ".chooseCurrency",
  closeChooseCurrencyModalBtn: "#closeChooseCurrencyModalBtn",
  // Congratulation modal
  shareButtonCongratulateModal: ".StyledShareButton_s1rh8cq9",
  congratulateTitleText: "Congratulations!",
  // Gift Information
  prevPageButton: ".StyleButton_s1oa7yi9", // Create Gift Card too
  shareButton: ".ShareButton_sopvn30",
  giftInformationTitle: "Gift Information",
  nobodyGotGiftImg: "img[src='/media/noGiftsa69481abca9cb487bdc8.png']",
  giftCardOnGiftInformation: ".StyledGiftCard_s13i8p71",
  wishOnCardInGiftInformation: ".GiftCardDescriptionText_g1jka3n",
  startCardBalanceInGiftInformation: ".GiftCardSurpriseText_guv55zz",
  restOfCardBalanceInGiftInformation: ".GiftCardAmountText_gf40prb",
  defaultWishOnCard: "Touch the card or scan QR and receive my GIFT",
  // Расшаривание можно делать через chat
  // Проверка взаимодействия с гифтом тоже через chat
  // Модалка самостоятельного считывания гифта
  cardOnGetOwnGiftModal: ".StyledGiftCardInfo_s1i44e5s", // Create Gift Card too
  cardOwnerOnGetetOwnGiftModal: ".StyledFrom_sp5kyj0",
  okButtonOnGetCardModal: "StyledButton_ss5phhy",

  // actions
  //Проверка пожелания на карте
  checkWishOnCard(wish) {
    if (wish == "") {
      cy.wrap($card).should("contain.text", this.defaultWishOnCard);
    } else {
      cy.wrap($card).should("contain.text", wish);
    }
  },
  //Проверка суммы и валюты на карте
  checkSumOnCard(currency, amount, showSum) {
    if (showSum == "No") {
      cy.wrap($card).should("contain.text", "Surprise");
    } else {
      cy.wrap($card).should("contain.text", amount + " " + currency);
    }
  },

  // Открытие экрана создания гифта
  openCreateNewGiftScreen() {
    cy.wait(500)
      .get(this.dialogWindow)
      .find(this.modalHeaderButton)
      .first()
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get(this.giftModalTitle).should(
      "contain.text",
      this.createNewGiftTitleText
    );
    return this;
  },

  openWalletsList() {
    cy.wait(100)
      .get(this.currencyButton)
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get(this.dialogWindow)
      .contains(this.chooseCurrencyTitle)
      .should("exist");
    return this;
  },

  // Выбор кошелька
  chooseWallet(currency) {
    cy.wait(500)
      .get(this.currencyItem)
      .contains(currency)
      .parents(this.currencyItem)
      .as("chosenCurrencyButton")
      .find(this.currencyBalance)
      .invoke("text")
      .as("startBalance");
    cy.get("@chosenCurrencyButton")
      .find(this.chooseCurrencyButton)
      .should("be.enabled")
      .click();
    cy.get(this.dialogWindow)
      .contains(this.chooseCurrencyTitle)
      .should("not.exist");
    return this;
  },

  // Сравнить баланс после отправки транзакции
  compareBalanceInWalletList(currency, transactionAmount) {
    cy.get(this.currencyItem)
      .contains(currency)
      .should("exist")
      .siblings("p")
      .wait(3000)
      .invoke("text")
      .as("endBalance")
      .then((end) => {
        const endBalance = new BigNumber(end);
        cy.log("new balance: " + endBalance.toNumber());
        let transactionResult = new BigNumber(endBalance).plus(
          transactionAmount
        );
        cy.get("@startBalance")
          .then(parseFloat)
          .then((start) => {
            const startBalance = new BigNumber(start);
            cy.log("old balance: " + startBalance.toNumber());
            cy.wrap(startBalance.toNumber());
          })
          .should("equal", transactionResult.toNumber());
      });
    return this;
  },

  // Закрытие списка кошельков
  closeWalletsList() {
    cy.get(this.closeChooseCurrencyModalBtn)
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get(this.dialogWindow).should("not.exist");
    return this;
  },

  сheckInternalMinInAmountField(min) {
    cy.get(this.amountInput).invoke("val").should("equal", min);
    return this;
  },
  
  enterWish(wish) {
    if (wish != "") {
      cy.get(this.wishInput)
        .should("be.empty")
        .and("be.enabled")
        .type(wish)
        .should("contain.value", wish);
    } else return this;
    return this;
  },

  enterGiftAmount(amount) {
    cy.get(this.amountInput)
      .clear()
      .should("be.empty")
      .type(amount)
      .should("contain.value", amount);
    return this;
  },

  enterNumberOfPeople(amount) {
    cy.get(this.recipientNumberInput)
      .should("contain.value", "1")
      .clear()
      .should("be.empty")
      .type(amount)
      .should("contain.value", amount);
    return this;
  },

  setSplitAndShowSumType(splitType, showType) {
    cy.get(this.radioButtonLable).contains(splitType).click();
    cy.get("#giftCreateGiftCard").contains(splitType).should("have.attr", "checked")
    cy.get(this.radioButtonLable).contains(showType).click();
    cy.get("#isBalanceShown").contains(showType).should("have.attr", "checked")
    return this;
  },

  pressCreateCardButton() {
    cy.get(this.createGiftButton)
      .should("be.visible")
      .and("be.enabled")
      .click();
    return this;
  },

  openShareModal() {
    cy.get(this.shareButtonCongratulateModal)
      .should("be.visible")
      .and("be.enabled")
      .click();
    return this;
  },

  checkDataOnCardAfterCreating(currency, amount, showSum, wish) {
    cy.wait(5000)
      .get(this.dialogWindow)
      .should("contain.text", this.congratulateTitleText)
      .find(this.cardOnGetOwnGiftModal)
      .then(($card) => {
        checkSumOnCard(currency, amount, showSum);
        checkWishOnCard(wish);
      })
      .get(this.qrOnCardInGiftList)
      .should("exist")
      .and("be.visible");
    return this;
  },

  // для теста 4 по удалению гифта
  openGiftContextMenu(currency, amount, wish) {
    cy.get(this.giftListInModal)
      .should("be.visible")
      .children()
      .should("exist")
      .contains(currency)
      .and(amount)
      .and("contain.text", amount + " " + currency)
      .then(($card) => {
        checkWishOnCard(wish);
      })
      .rightclick();
    return this;
  },
  deleteGift() {
    return this;
  },

  closeGiftModal(buttonDestiny) {
    cy.wait(500)
      .get(this.dialogWindow)
      .find(this.giftModalTitleText)
      .invoke("text")
      .as("modalTitle");
    switch (buttonDestiny) {
      case "Back": {
        cy.get(this.dialogWindow)
          .find(this.modalHeaderButton)
          .first()
          .should("be.visible")
          .and("be.enabled")
          .click();
        break;
      }
      case "Close": {
        cy.get(this.dialogWindow)
          .find(this.modalHeaderButton)
          .last()
          .should("be.visible")
          .and("be.enabled")
          .click();
      }
      default: {
        cy.log("Unknown button destiny");
        break;
      }
    }
    cy.get("@modalTitle").should("not.exist");
    return this;
  },
};
export default gift;
