///<reference types="cypress"/>

const gift = {
  // locators
  dialogWindow: "div[role='dialog']",
  menuWindow: "div[role='menu']",
  menuItem: "div[role='menuitem']",
  // Модалка со списком гифтов
  giftModalTitleText: "Gift List",
  closeModalButton: ".CloseButton_c1ne0lt7", // Gift inforamtion too, Congratulation modal too
  createNewCardButton: ".StyleButton_s1oa7yi9",
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
  createNewGiftTitleSelector: ".StyledTitle_sr683lu",
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
  closeCurrencyButton: "",
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
  closeButtonGetCardModal: ".StyleButton_s1oa7yi9", // Congratulation modal too

  // actions
  // Открытие экрана создания гифта
  openCreateNewGiftScreen() {
    cy.wait(500)
      .get(this.dialogWindow)
      .find(this.createNewCardButton)
      .first()
      .should("be.visible")
      .and("be.enabled")
      .click();
    cy.get(this.createNewGiftTitleSelector).should(
      "contain.text",
      this.createNewGiftTitleText
    );
    return this;
  },
  openCurrencyModal() {
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
  chooseCurrency(currency, min) {
    cy.wait(500)
      .get(this.currencyItem)
      .contains(currency)
      .parents(this.currencyItem)
      .as("chosenCurrencyButton")
      .find(this.currencyBalance)
      .invoke("text")
      .as("chosenCurrencyBalance");
    cy.get("@chosenCurrencyButton")
      .find(this.chooseCurrencyButton)
      .should("be.enabled")
      .click();
    cy.get(this.dialogWindow)
      .contains(this.chooseCurrencyTitle)
      .should("not.exist");
    cy.get(this.amountInput).invoke("val").should("equal", min);
    return this;
  },
  enterWish(wish) {
    if (wish != ""){
    cy.get(this.wishInput)
      .should("be.empty")
      .and("be.enabled")
      .type(wish)
      .should("contain.value", wish);
    }
    else return this;
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
  setSplitAndShowSumTypse(splitType, showType) {
    cy.get(this.radioButtonLable).contains(splitType).click();
    cy.get(this.radioButtonLable).contains(showType).click();
    // Нет проверки, не знаю, по чему можно измерить, что кнопка нажата
    return this;
  },
  pressCreateCardButton() {
    cy.get(this.createGiftButton)
      .should("be.visible")
      .and("be.enabled")
      .click();
    return this;
  },
  checkDataOnCard(currency, amount, showSum, wish) {
    cy.wait(5000)
      .get(this.dialogWindow)
      .should("contain.text", this.congratulateTitleText)
      .find(this.cardOnGetOwnGiftModal)
      .then(($card) => {
        if (showSum == "No") {
          cy.wrap($card).should("contain.text", "Surprise");
        } else {
          cy.wrap($card).should("contain.text", amount + " " + currency);
        }
        if (wish == "") {
          cy.wrap($card).should("contain.text", this.defaultWishOnCard);
        } else {
          cy.wrap($card).should("contain.text", wish);
        }
      })
      .get(this.qrOnCardInGiftList)
      .should("exist")
      .and("be.visible")
    return this;
  },
  openShareModal(){
    cy.get(this.shareButtonCongratulateModal)
    .should("be.visible")
    .and("be.enabled")
    .click()
    return this;
  },
  closeCongratsModal(){
    cy.get(this.closeModalButton)
    .should("be.visible")
    .and("be.enabled")
    .click()
return this  
},
};
export default gift;
