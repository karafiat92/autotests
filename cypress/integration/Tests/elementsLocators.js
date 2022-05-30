
// локаторы для доступа к элементам на разных страницах


    //локаторы регистрации
let locators;
    
  const  signUpLocators = {
        startPage: { // стартовая страница
            signInButton: "#loginButton",
            signUpButton: "#signupButton"
        },
        signUp1Step: { // первая страница (сохранение сида)
            saveQRButton: "#SeedPhraseQRCodeDowloadPNG",
            saveTextButton: "#SeedPhraseQRCodeDowloadTXT",
            checkboxSavedSeed: "#signUpChecksaved",
            signupNextButton: "#signUpFirstSubmit"
        },
        signUp2Step: { // вторая страница (заполнение данных профиля)
            firstNameInput: "#firstNameField",
            lastNameInput: "#lastNameField",
            usernameInput: "#usernameField",
            nextButton: "#signUpSecondSubmit",
            checkboxIOathSign: "#signUpCheckIOathSign"
            /*errorText1: Selector(".errorText").withText("Minimum length is 5 symbols"),
            errorText2: Selector(".errorText").withText("Required field"),
            errorText3: Selector(".errorText").withText("Invalid username"),
            errorText4: Selector(".errorText").withText("Username is already taken"),
            errorText5: Selector(".errorText").withText(
                "Only latin characters allowed"
            ),
            errorText6: Selector(".errorText").withText("Invalid value"),
            errorText7: Selector(".errorText").withText(
                "At least one letter is required"
            ),
            errorText8: Selector(".errorText").withText("Maximum length is 32 symbols"),
            errorText9: Selector(".errorText").withText(
                "Special symbols are not allowed"
            ),
            errorText10: Selector(".errorText").withText("First character must be latin"),*/
        },
        signUp3Step: { // третья страница (введение пинкода)
            pin1Input: "#pin_0",
            pin2Input: "#pin_1",
            pin3Input: "#pin_2",
            pin4Input: "#pin_3",
            //errorText: Selector("#pinError").withText("Invalid PIN code")
        }
    },

    // локаторы авторизации
    signInLocators = {
        signIn : { // страница авторизации 
            seedPhraseInput: "#seedPhraseField",
            //errorText1: Selector(".errorText").withText("Invalid seed-phase"),
            //errorText2: Selector(".errorText").withText("Seed-phase cannot be empty"),
            uploadSeedPhrase: "#loginUploadPhrase",
            loginButton: "#loginFirstSubmit",
            pinInput: ["#pin_0", "#pin_1", "#pin_2", "#pin_2"]
            //errorText: Selector("#pinError").withText("Invalid PIN code"),
            //errorModal1: Selector("#textInfoModal").withText("Invalid QR code"),
            //errorModal2: Selector("#textInfoModal").withText("Invalid file"),
            //errorButton: Selector('#closeInfoModalBtn'),
        }
    },

    mainPageLocators = {
        settingsButton: "#settingsButton", // попросить прописать айдишник
        editProfileButton: '#editProfileButton',
        saveProfileButton: '#saveProfileButton',
        logOutButton: '#logOutButton',
        fiatButton: '#fiatButton > div',
        privacyButton: '#privacyButton',
        seedPhraseButton: '#seedPhraseButton',
        kycButton: '#kycButton',
        name: '#myFullName',
    }


export default locators = {
    signUpLocators,
    signInLocators,
    mainPageLocators
}