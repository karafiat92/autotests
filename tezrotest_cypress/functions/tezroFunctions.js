import startPage from "../page_model/startpage";
import signUp1Step from "../page_model/signup1step";
import signUp2Step from "../page_model/signup2step";
import signUp3Step from "../page_model/signup3step";
import signIn from "../page_model/signin";
import mainPageUser from '../'

{
  const signUpExecution = {
    async signup(user) { // прохождение регистрации
      await startPage.signUpUser(); // переход к регистрации
      await signUp1Step.signUp1StepUser(); // сохранение сида
      await signUp2Step.signUp2StepUser(user); // заполнение данных
      await signUp3Step.signUp3StepEnterPinUser(user.pin); // введение пин1
      await signUp3Step.signUp3StepEnterPinUser(user.pin); // введнеие пин2
      await signUp3Step.signUp3StepUrl(); // проверка успешной авторизации (адрес)
    },
  };

  const signInExecution = { // прохождение авторизации
    async signinSteps(userLoginData) {
      await startPage.signInUser();
      await signIn.signInStepUser(userLoginData.seedPhrase);
    },

    async signinQRSteps(userLoginData) {
      await startPage.signInUser();
      await signIn.signInStepUserNotQR(userLoginData.qr);
      await signIn.signInStepUserClickSend();
    },

    async pinSteps(userLoginData) {
      await signIn.signInEnterPinUser(userLoginData.pin);
      await signIn.signInEnterPinUser(userLoginData.pin);
      await signUp3Step.signUp3StepUrl();
    },
  };

  const logOutExecution = { // прохождение выхода из приложения
    async logout() {      
      await mainPageUser.settings();
      await mainPageUser.editProfile();
      await mainPageUser.logOut();
    },
  };
}
export default tezroFunctions = {
  signUpExecution,
  signInExecution,
  logOutExecution,
};
