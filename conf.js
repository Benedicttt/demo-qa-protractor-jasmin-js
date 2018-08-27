const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    capabilities: [
        { browserName: 'chrome',
            chromeOptions: {
                args: [ "--headless",  "--disable-gpu" ]
            }
        },

        {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: ['--headless']
            }
        }
    ],
    directConnect: true,
    baseUrl: 'http://localhost:3000/',
    framework: 'jasmine',
    // specs: ['spec/panel/**/*.js'],
    specs: ["spec/panel/sign_up.js", "spec/panel/**/*.js"],
    allScriptsTimeout: 20000,
    getPageTimeout: 15000,
    jasmineNodeOpts: {
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 40000
    },
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        global.getRandomString = getRandomString;

        global.admin = 'user86@gmail.com';
        global.id_email = 'user_email';
        global.id_pass = 'user_password';
        global.id_pass_conf = 'user_password_confirmation';
        global.password = '123456';
        global.user_email = 'spok_' + getRandomString(10) + '@gmail.com';
        global.registration_success = '×\nДобро пожаловать! Вы успешно зарегистрировались.';
        global.exit_success ='×\nВыход из системы выполнен.';
        global.authorization_success ='×\nВход в систему выполнен.';

        global.helper = require('./spec/helpers/helpers.js');

        global.protractor = protractor;
        global.$ = browser.$;
        global.$$ = browser.$$;
        global.element = browser.element;
        global.by = global.By = protractor.By;
    }

};

getRandomString = function(length) {
    var string = '';
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (i = 0; i < length; i++) {
        string += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return string;
};

