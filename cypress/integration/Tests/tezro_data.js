
// данные для прохождения различных проверок
const baseUrl = "https://dev-web.tezro.com/"; 


let tezroData;

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
    // данные по кошелькам
    const cryptoData = [
        {
            amount: "0.000012",
            address: "0xf13f5DA07820451A37716e16219884928004913A", // адрес eth получателя
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
        { 
            user: "Zzzz Zzzzz" 
        },
        { 
            user: "Vvvvvv Vvvvvv" 
        },
        { 
            message: 'Moning, влорыол 12312 :?*()4' 
        },
        { 
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' 
        },
        { 
            message: "kuku kuku" 
        },
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
        // хз что за адреса такие, вроде, сейчас таких нет
        //signup2stepUrl: baseUrl + 'signup2step',
        //signup3stepUrl: baseUrl + 'signup3step',
        // mainUrl: baseUrl + 'main',
        settingsUrl: baseUrl + 'settings',
        editProfileUrl: baseUrl + 'settings/edit-profile',
        signInUrl: baseUrl + 'login',
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
        },
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
        },
    ]
    // успешная регистрация 5 юзеров
    const userSignUpData = [
        {
            firstname: "Hilinaseqqwrthor111",
            lastname: "Knottystseqqwrthor111",
            username: `testuser1_${Math.trunc((Math.random()*1000000))}`,
            pin: "2",
        },/*
        {
            firstname: "Jondwrth Jonsetor",
            lastname: "Kronwrth Kronsetor",
            username: `testuser2_${Math.trunc((Math.random()*1000000))}`,
            pin: "4",
    
        },
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
    userSignUpData
 }