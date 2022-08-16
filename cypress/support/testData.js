// данные для прохождения различных проверок
let tezroData;

const baseUrl = Cypress.config("baseUrl");
 
// данные для создания контакта
const contactsData = [
    {
        name: "Emma",    // валидный контакт
        surname: "Shift",
        country: "American Samoa",
        phone: "2345678861",
    },
    {
        phone: "2111111112" // невалидный номер телефона
    },
    {
        phone: "222333445_" // не полный номер телефона
    },
]

const userGlobalSearch = {
    usernameWithDog: "@fashy5",
    username: "fashy5",
    firstname: "Fashio",
    lastname: "sTudenT",
    message: ""
}

const supportQuestions = [
    "Hello",
    "Can you help me?",
    "I have a problem",
    "i have a question",
    "How can i transfer money / How to recharge my wallet?",
    "Transfer fiat to Tezro",
    "Transfer crypto to Tezro",
    "Transfer money to another Tezro user",
    "Withdraw crypto from Tezro",
    "Withdraw fiat from Tezro",
    "Which currencies do you have",
    "I found a bug, what do i do?",
    "What does escrow mean?",
    "how can i add my friend?",
    "how can i invite my friend to Tezro?",
    "Why do i have to enter pin-code all the time?",
    "Why do i create new pin-code every login?",
    "What are gift cards used for?",
    "Which devices Tezro supports?",
    "Is there any transaction restrictions?",
    "Is there any commission to transactions? / How much do i have to pay for transactions?",
    "crypto top-up commission",
    "withdraw crypto commission",
    "fiat recharge commission",
    "fiat withdraw comission",
    "can't find a person, what's the problem?",
    "this  doesn't work",
    "can i change my username / nickname?",
    "how can i restore my pin-code ",
    "how can i restore my seed-phrase",
    "I made the transaction by mistake, can i cancel it",
    "I made the transaction by mistake what can i do now",
    "How can i exсhange my currencies",
    "Can i pay from Tezro in shop",
    "What does cryptocurrency mean",
    "What bot can do",
    "Somebody once told me",
    "Is this a bot?",
    "How can i contact operator",
    "Contact real support",
    "Dark theme in app",
    "What are verification limits",
    "App version",
    "How is your system working",
    "How are you",
    "Why sometimes the app work very slow",
    "Can you check please",
    "What is your name",
    "can i email someone",
    "how is exchange working",
    "how much is 2x2",
    "how to make money",
    "buy coins",
    "buy crypto",
    "change to",
    "pay for goods",
    "change my email address",
    "change username",
    "how to use auctions",
    "qwesdfgfgdfgrt34 g5t54t54t45t"
]

const supportAnswers = [
    "Hello, how can i help you?",
    "Hello, how can i help you?",
    "Hello, what is your problem?",
    "Hello, what is your question?",
    "Hello, please clarify, which transfer method do you want to know about? Options are: transfer fiat to Tezro, transfer crypto to Tezro, transfer money to another Tezro user, withdraw crypto from Tezro, withdraw fiat from Tezro.",
    "Hello, you can recharge your Tezro fiat account from any card, to do so open your wallets (from the bottom menu), click on fiat button (2 cards on top), add card to Tezro and you can recharge your fiat balance anytime from that card, or you can also add another card if you want!",
    `Hello, to top up your crypto balance go to your wallets (from the bottom menu), choose crypto you want to replenish, click on "Get" on the bottom of the chosen crypto wallet. There you can copy your wallet number to transfer crypto to Tezro. You could also enter the sum and scan QR code to easy transfer from another wallet, or share this QR to any social network for other people to top up your balance`,
    "Hello, to transfer money to another Tezro user, open the chat with them and click on the Bitcoin button on the bottom-left. Choose the currency you want to transfer, enter the sum and click arrow to send it. The money inside Tezro will be transfered instantly!",
    "Hello, to withdraw crypto from Tezro go to your wallets (from the bottom menu), choose the currency you want to withdraw and click Send. There you can enter the sum and wallet address to withdraw crypto. Make sure to check the address you enter for any errors, or the currency could be lost forever!",
    "Hello, the option to withdraw fiat is unavailable at the moment, stay tuned for the updates, we are working on it!",
    "Hello, to check the list of the active currencies open your wallents (from the bottom menu), you can always check the supported currencies there.",
    "Hello, to report a bug contact support, using the button below and explain under which circumstances you are encountering this error and which client you are using (ios, android, web, desktop)?",
    "Hello, escrow is the secured type of transactions used inside Tezro. You can transfer the money for any service to another user using escrow. User will recieve money only after your confirmation of completing the provided service.",
    `Hello, you can add a contact to your list by phone number (contact button in the upper menu, then click "+" button), or find them by username from the chat list, then send them a message in Tezro to start chatting.`,
    `Hello, you can invite your friends to Tezro from the contacts screen in the upper menu, click on the "invite friend" button there and by using "share Tezro" option you can send an invite link to any social network to your friends.`,
    "Hello, we ask users to confirm all the currency operation by entering pin-code for security reasons, if someone steals your device it will be impossible to withdraw money without knowing the current pin-code.",
    "Hello, for every new authorisation we ask users to create another pin-code for security reasons. Pin-code is a temporary password used for current session only.",
    "Hello, you can create gift cards and send it to your friend to invite them to Tezro and become your subscriber. Click on the gift button in the upper menu and start sending gifts!",
    "Hello, you can install mobile version of Tezro on android, ios or use desktop version designed for macOS. Also there is web-version optimized for windows PC.",
    "Hello, there is no restrictions, you can transfer any currency supported in Tezro anywhere and to anyone.",
    "Hello, there is no comission for transfers inside Tezro. To learn about outside commissions ask directly: top-up comissions, withdraw crypto commission, recharge fiat commission, withdraw fiat comission",
    "Hello, there is no commission in Tezro to top-up your crypto wallet, you only need to pay for the blockchain commission to create transaction.",
    "Hello, there is a small comission in Tezro for crypto withdrawal of 0.01%",
    "Hello, there is no commission in Tezro for recharging operation, however, there is a small fee taken by the bank. You can check the exact amount when you try to recharge Tezro wallet from card",
    "Hello, the option to withdraw fiat is unavailable at the moment, stay tuned for the updates, we are working on it!",
    "Hello, if you cannot find a person knowing the username make sure there the spelling is correct. Also maybe the person is hidden from search. You can enable this option for yourself from the settings > security menu.",
    "Hello, if the problem you describing repeats inself please contact the operator using the button below.",
    "Hello, to change your username go to the settings, open your profile (button with your first and last names, phone number and username) click on the username to open the edit username screen",
    "Hello, your pin-code is unique for each session, if you forgot you pin-code, try to logout and create another pin-code after entering your seed-phrase / scanning QR",
    "Hello, you can check your seed-phrase in the settings menu, click on seed-phrase button there and enter your current pin-code to reveal the phrase. Make sure you copy it somewhere safe afterwards. In case you forgot your pin-code, unfortunatelly your seed-phrase can no longer be restored",
    "Hello, please try to contact the operator with the details of the transaction. Tezro will try to help you in than case. To make sure you can always cancel your transaction use escrow.",
    "Hello, please try to contact the operator with the details of the transaction. Tezro will try to help you in than case. To make sure you can always cancel your transaction use escrow.",
    "Hello, to exhange your currencies you can try our Exchange chat. The you can create offers to another users, or try the convert function to convert one currency to another inside Tezro",
    "Hello, you can only pay in shop's connected to Tezro, to confirm please ask the shop representative",
    `Hello, cryptocurrency is a form of payment that can be exchanged online for goods and services. Many companies have issued their own currencies, often called tokens, and these can be traded specifically for the goods or services that the company provides.`,
    "Hello, i can answer simple questions about Tezro. Try asking me about commissions, seed-phrase, supporting devices, gift cards or any other Tezro modules.",
    "The world is gonna roll me... anyways, can i help you?",
    "Hello, yes, i am a programm, designed for answering simple questions about commissions, seed-phrase, supporting devices, gift cards or any other Tezro modules.",
    "Hello, to request an operator use the button in the bottom menu. Your question will be answered shortly.",
    "Hello, to request an operator use the button in the bottom menu. Your question will be answered shortly.",
    "Hello, to activate dark theme go to setting (gear icon) > appearance and choose dark color theme.",
    `Hello, to check your withdraw verification limits proceed to settings > verification level and click on "!" in the upper menu. You can also read about verification documents there.`,
    "Hello, to check your app version navigate to the settings (gear icon) and scroll to the bottom. App version should be shown there.",
    "Hello, Tezro is working just fine, do you have any specific questions?",
    "Hello, i'm fine, what about you?",
    "Hello, we are working on optimisation of our app, please contact the operator using the button below and tell us where exactly it is slow? Under which conditions do you encounter the slow work?",
    "Hello, to request answering specific question pls contact the operator using the button below.",
    "Hello, i have no name, can i help you?",
    "Hello, you can send messages to any email address from Tezro. To do so click on the mail icon in the bottom menu, then click on pencil on top, enter email address, subject and your message. Email will be sent shortly after.",
    "Hello, in exchange chat you can create exchange offers to other users. They can make offers in response and after both of you accept them the trade will happen.",
    "Hello 2x2=5, i am not a calculator allright? Any other questions?",
    "Hello, to make money in Tezro there are a lot of options. You can trade crypto in exchange, open a shop in Markets or sell your assets on Auction. Soon you will be also able to invest money in Tezro DeFi.",
    "Hello, you can recharge your Tezro fiat account from any card and then try to make an exchange offer in exchange chat to receive your first crypto.",
    "Hello, you can recharge your Tezro fiat account from any card and then try to make an exchange offer in exchange chat to receive your first crypto.",
    "Hello, you can use exchange chat to create offers using crypto and fiat currencies. Other users should create responding offers to trade you currencies.",
    "Hello, you can buy goods in Tezro Market or on Auctions using your Tezro wallet, or you can just bind a card to Tezro and pay from it.",
    "Hello, you cannot change your email address after registration in Tezro. This decision is permanent.",
    "Hello, you can change your username anytime from your user profile.",
    "Hello, you can sell your assets on Tezro auction. There are 2 types of distribution: 100% auction type where you sell you completely selling your asset and 49% exchange type when users can buy each percent for a different price. On auction there is a timer, when it expires the max bid wins and the ownership transfers to winner. On burse the ownership remains the same, but users can resell owned percents again and again for a different price.",
    "Hello, unfortunately i cannot answer this question, please contact the operator if you still need help."
]

// Данные для отправки транзакции с экрана Send
const sendCryptoData = [
    {
        address: "0xf13f5DA07820451A37716e16219884928004913A",
        modalText: "Address you entered belongs to a user in Tezro, You can send internal transaction without commission.",
        recipientName: "Fashio sTudenT",
        externalMin: 0.01,
        currencyabbreviation: "ETH",
        currencyName: "Ethereum",
        direction: "Sent"
    },
    {
        address: "0xb6A6B94a87D05fe771912783a2BA65DB2dFa5Ea7",
        recipientName: "External Transaction",
        modalText: "Address you entered belongs to external user. Transaction will be send with a small fee.",
        externalMin: 0.01,
        currencyabbreviation: "ETH",
        currencyName: "Ethereum",
        commission: 0.01,
        direction: "Sent"
    }
]
// данные по кошелькам
const cryptoData = [
    {
        amount: "0.000012",
        address: "0x4F880463A5ead45A9E4402d2F0921E75aeade04D", // адрес eth получателя
        numberWallet: 1,
        decimal: 8,
        comment: "comment escrow1",
    },
    {
        amount: "0.0000117",
        address: "0x4F880463A5ead45A9E4402d2F0921E75aeade04D", // адрес eth получателя
        numberWallet: 1,
        decimal: 8,
        qr: './uploads/qr.png',
        comment: "comment escrow2",
        escrowName: "Escrow Service"
    },
    {
        amount: "0.000",
        address: "0x4F880463A5ead45A9E4402d2F0921E75aeade04D", // адрес eth получателя
        numberWallet: 1,
        decimal: 8,
    },
    {
        amount: "0.000013",
        address: "dfdfgsdfgdsfgdfgsdfgsdfgsgfsdgdsfgfgdfgg", // адрес невалидный получателя
        numberWallet: 1,
        decimal: 8,
        qr: './uploads/zzzzz.png',   // невалидный QR код
    },
    {
        amount: "0.02",
        address: "lrlteszqbbjk", // адрес eos отправителя - пустой кошелек
        memo: "c.qcmt3ckspf",
        numberWallet: 0,
        decimal: 4,
    },
    {
        amount: "0.0002",
        address: "mwGjWzBipdGpr8EPT9c5HTSG36C7hafx76", // адрес btc получателя
        numberWallet: 2,
        decimal: 8,
        qr: './uploads/qrVvvvvv.png',   // не QR код, но изображение
    },
    {
        amount: "0.0002",
        address: "0xe273eBEc07Fab764344FB7C8bc2532e241AF9A09", // адрес eth отправителя
        numberWallet: 1,
        decimal: 8,
    },
    {
        amount: "10",
        numberWallet: 0, // usd - фиат
        decimal: 2, // фиат, usdt, eurt, cnht
        note: "test",
        email: "vvvvvv@mio.i-link.pro",
        fiat: 1, //eur
    },
    {
        amount: "0.01",
        numberWallet: 0, // usd - фиат
        decimal: 2, // фиат, usdt, eurt, cnht
        note: "test",
        email: "vvvvvv.pro",
        fiat: 1, //eur
    },
]
// данные по фиатным картам
const fiat = [
    {
        cardHolderName: 'Vvvvvv Vvvvvv',
        cardNumber: '4242424242424242',//without 3ds Visa
        expDate: '1221', //  дата
        cvv: '222',
        typeCard: "/static/media/visaCard.a4e61d8f.svg",
    },
    {
        cardHolderName: 'Vvvvvv Vvvvvv',
        cardNumber: '4000000000003220',//without 3ds Visa
        expDate: '1222', //  дата
        cvv: '555',
    },
    {
        cardHolderName: 'Vvvvvv',
        cardNumber: '400000000000322',//невалидная карта
        expDate: '122', //  дата
        cvv: '55',
    },
    {
        cardHolderName: '!"№;%: ?*()_+',
        cardNumber: '4000000000009995',//недостаточно средств
        expDate: '122', //  дата
        cvv: '55',
    },
    {
        cardHolderName: 'Иван Иванов',
        cardNumber: '5555555555555555',//
        expDate: '0121', //  дата
        cvv: '55',
    },
    {
        cardHolderName: '345345 35345',
        cardNumber: '5555555555554444',//
        expDate: '122', //  дата
        cvv: '55',
        typeCard: "/static/media/masterCard.35a2b4d3.svg",
    },
]
// данные по сообщениям в чате
const messagesData = [
    // {
    //     user: "Zzzz Zzzzz"
    // },
    // {
    //     user: "Vvvvvv Vvvvvv"
    // },
    {
        message: 'Moning, влорыол 12312 :?*()4'
    },
    {
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
    },
    {
        message: "kuku kuku"
    },
    {
        message: `very long message${Math.round(Math.random() * 1000)}`
    }
]
// данные для регистрации нового юзера (имя, фамилия)
const nameCurrentUser = [
    {
        firstname: "krokis", //валидные данные
        lastname: "tommysy",
    },
    {
        firstname: "krokis sdf", // из нескольких слов
        lastname: "tommysy asddfg",
    },
    {
        firstname: "krokis-sdf", // с тире
        lastname: "tommysy-asddfg",
    },
    {
        firstname: "krokis_sdf", // с подчеркиванием
        lastname: "tommysy_asddfg",
    },
    {
        firstname: "krokis'sdf", // с аппострофом
        lastname: "tommysy'asddfg",
    },
    {
        firstname: "qwertyuiopasdfghjklzxcvbnmqwertyu", //больше 32 символов
        lastname: "qwertyuiopasdfghjklzxcvbnmqwertyu",
    },
    {
        firstname: "1jonny", //первый символ не латинский
        lastname: "3smitty",
    },
    {
        firstname: "jonny#$%^&+=!@", //не разрешенные спецсимволы
        lastname: "smitty#$%^&*()",
    },
    {
        firstname: "SИван", //кирилица
        lastname: "SИванов",
    },
    {
        firstname: "Vvvvvv",
        lastname: "Vvvvvv",
    },
]
//данные для пополнения с карты
const rechargeCard = [
    {
        cardWith3ds: 0, //without 3ds
        summa: "1",
        fiat: 0, //usd
        nameService: "Fiat Service",
    },
    {
        cardWith3ds: 0, //without 3ds
        summa: "2",
        fiat: 1, //eur
        nameService: "Fiat Service",
    },
    {
        cardWith3ds: 0, //without 3ds
        summa: "0",
        fiat: 0, //usd
        nameService: "Fiat Service",
    },
    {
        cardWith3ds: 0, //without 3ds
        summa: "0.55",
        fiat: 1, //eur
        nameService: "Fiat Service",
    },
]
// данные для поиска
const searchData = [
    {
        search: "Роооо" // существующий контакт
    },
    {
        search: "+79138453543" // существующий контакт
    },
    {
        search: "luuuuu" // существующий контакт
    },
    {
        search: "12345555" // не существующий контакт
    },
]
// данные адресов страниц 
const urls = {
    baseUrl: baseUrl,
    startUrl: baseUrl,
    signUpUrl: baseUrl + 'signup',
    settingsUrl: baseUrl + 'settings',
    editProfileUrl: baseUrl + 'settings/edit-profile',
    signInUrl: baseUrl,
    contactsUrl: baseUrl + 'contacts',
    walletUrl: baseUrl + 'wallet',
    chooseWalletUrl: baseUrl + 'wallet/transactions-history/ETH', // переработать
    // на универсальную строчку с криптой
}
// данные дляя регистрации нового юзера (валидные и невалидные)
const user = [
    {
        firstname: "Jonnywesdawqweyr", //валидные данные
        lastname: "Smittyweerawqweyr",
        username: "jonnywesdaSmitqqe113",
        pin: "1",

    },
    {
        firstname: "1jonny", //первый символ не латинский
        lastname: "3smitty",
        username: "5jonnwewwrrr",
        pin: "2",

    },
    {
        firstname: "jonny#$%^&+=!@", //не разрешенные спецсимволы
        lastname: "smitty#$%^&*()",
        username: "d!@##%^&&",
        pin: "2",
    },
    {
        firstname: "qwertyuiopasdfghjklzxcvbnmqwertyu", //больше 32 символов
        lastname: "qwertyuiopasdfghjklzxcvbnmqwertyu",
        username: "qwertyuiopasdfghjklzxcvbnmqwertyu",
        pin: "3",
    },
    {
        firstname: "SИван", //кирилица
        lastname: "SИванов",
        username: "Sникнейм",
        pin: "4",
    },
    {
        firstname: " Jonny ",  // с пробелами
        lastname: " Smitty ",
        username: " jonnwewwrrr57 ",
        pin: "4",
    },
    {
        username: "jonn", //юзернейм меньше 5 символов
    },
    {
        username: "jonny smitty", //юзернейм из 2 слов
    },
    {
        username: "vvvvvv", //существующий юзернейм из существующей почты
    },
    {
        username: "testios", //юзернейм из существующей почты
    },
    {
        username: "krokittt", //существующий юзернейм
    },
    {
        phone: "111111111_", //невалидный номер телефона
    },
    {
        phone: "11________", //неполный номер телефона
    },
]
// данные для прохождения авторизации
const userLoginData = [
    {
        seedPhrase: "minimum awake worth ignore blouse shop you custom fine virtual office truly", //валидные данные юзер Vvvvv
        pin: "1",
        qr: './uploads/vvvvv.JPG',
    },/*
        {
            seedPhrase: "toe insane bounce include shoot license spice list eye resource execute beef", //валидные данные юзер Zzzzz
            pin: "2",
            qr: './uploads/zzzzz.png',
        },
        {
            seedPhrase: "0x4F880463A5ead45A9E4402d2F0921E75aeade04D", //невалидные данные в QR коде
            qr: './uploads/qr.png',
        },
        {
            seedPhrase: "destroy",
            qr: './uploads/document.pdf',   // не QR код и не изображение
        },
        {
            qr: './uploads/1.png',   // не QR код, но изображение
        },
        {
            seedPhrase: "destroy",  // не полная сидфраза
        },
        {
            seedPhrase: "destroy gold visual pumpkin fit duck announce sunny inject chase churn miracly" // не валидная сидфраза
        },*/
]
// успешная регистрация 5 юзеров
const userSignUpData = [
    {
        firstname: "Hilinaseqqwrthor111",
        lastname: "Knottystseqqwrthor111",
        username: `testuser1_${Math.trunc((Math.random() * 1000000))}`,
        pin: "2",
    },
    {
        firstname: "Jondwrth Jonsetor",
        lastname: "Kronwrth Kronsetor",
        username: `testuser2_${Math.trunc((Math.random() * 1000000))}`,
        pin: "4",

    },
    /*
    {
        firstname: "Jonwrth-Jonsor",
        lastname: "Kronwrth-Kronsor",
        username: `testuser3_${Math.trunc((Math.random()*1000000))}`,
        pin: "4",
 
    },
    {
        firstname: "Jonwrt_Jonsor",
        lastname: "Kronwrt_Kronsor",
        username: `testuser4_${Math.trunc((Math.random()*1000000))}`,
        pin: "4",
 
    },
    {
        firstname: "Jon11swrtor",
        lastname: "Kron22swrtor",
        username: `testuser5_${Math.trunc((Math.random()*1000000))}`,
        pin: "4",
 
    },*/
]

export default tezroData = {
    contactsData,
    cryptoData,
    fiat,
    messagesData,
    nameCurrentUser,
    rechargeCard,
    searchData,
    urls,
    user,
    userLoginData,
    userSignUpData,
    userGlobalSearch,
    sendCryptoData,
    supportAnswers,
    supportQuestions
}