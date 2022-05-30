/*Функции регистрации, авторизации, выхода из профиля
включающие в себя перечень шагов, осуществляемых в ходе
выполнения этой функции
signUpExecution - прохождение всех шагов регистрации
signInExecution - авторизация через текст/код, пин
logOutExecution - шаги выхода из профиля
*/

import startPage from "./startpage.spec";
import signUp1Step from "./signup1step.spec";
import signUp2Step from "./signup2step.spec";
import signUp3Step from "./signup3step.spec";
import signIn from "./signin.spec";
import mainPageUser from './main_settings.spec'
import tezroData from '../../../support/tezro_data';

let signUpExecution
let signInExecution
let logOutExecution
let tezroFunctions

{
   signUpExecution = {
     async signup(user) { // прохождение регистрации
        startPage.signUpUser(); // переход к регистрации
        signUp1Step.signUp1StepUser(); // сохранение сида
        signUp2Step.signUp2Step.signUp2StepUser(user); // заполнение данных
        signUp3Step.signUp3StepEnterPinUser(user.pin); // введение пин1
        signUp3Step.signUp3StepEnterPinUser(user.pin); // введнеие пин2
        signUp3Step.signUp3StepUrl(); // проверка успешной авторизации (адрес)
    },
  };

   signInExecution = { // прохождение авторизации
    async signinSteps(tezroData) {
       startPage.signInUser();
       signIn.signInStepUser(tezroData.userLoginData.seedPhrase);
    },

    async signinQRSteps(tezroData) {
       startPage.signInUser();
       signIn.signInStepUserNotQR(tezroData.userLoginData.qr);
       signIn.signInStepUserClickSend();
    },

    async pinSteps(tezroData) {
       signIn.signInEnterPinUser(tezroData.userLoginData.pin);
       signIn.signInEnterPinUser(tezroData.userLoginData.pin);
       signUp3Step.signUp3StepUrl();
    },
  };

   logOutExecution = { // прохождение выхода из приложения
     logout() {      
       mainPageUser.settings();
       mainPageUser.editProfile();
       mainPageUser.logOut();
    },
  };
}
export default tezroFunctions = {
  signUpExecution,
  signInExecution,
  logOutExecution,
};
