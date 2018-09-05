const yaml = require('js-yaml');
const fs = require('fs');
const command = yaml.safeLoad(fs.readFileSync('spec/support/setting.yml', 'utf8'));
const form = yaml.safeLoad(fs.readFileSync('spec/support/forms.yml', 'utf8'));

const user = require('./spec/support/user.json');
const user_object = require('./spec/panel/page_object/user.js');


var AllureReporter = require('jasmine-allure-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    capabilities: {
        browserName: 'chrome',
            chromeOptions: {
                args: [
                    "--headless",
                    "--no-sandbox",
                    "--disable-gpu",
                    "--window-size=1600,800"]
            },
        // shardTestFiles: true,
        // maxInstances: 2,

        browserName: 'firefox',
            // 'moz:firefoxOptions': {
            //     args: ['--headless']
            // }

    },
    directConnect: true,
    baseUrl: 'http://localhost:3000/',
    specs: [
        "spec/panel/home_page.js",
        "spec/panel/sign_up.js",
        "spec/panel/sign_in.js",
        "spec/panel/user_access/set_user_access_full.js",
        "spec/panel/**/*.js"
    ],
    allScriptsTimeout: 20000,
    getPageTimeout: 15000,
    jasmineNodeOpts: {
        isVerbose: false,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 40000
    },
    files: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery/dist/jquery.min.js'
    ],
    framework: 'jasmine',
    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        global.getRandomString = getRandomString;

        global.admin = 'user86@gmail.com';
        global.id_email = 'user_email';
        global.id_pass = 'user_password';
        global.id_pass_conf = 'user_password_confirmation';
        global.password = '123456';
        global.user_email = 'spok_' + getRandomString(10) + '@gmail.com';
        global.helper = require('./spec/helpers/helpers.js');
        global.title_demands = "Добавление заявки | СПОК";
        global.EC=protractor.ExpectedConditions;

        global.fs = fs;
        global.command = command;
        global.form= form;
        global.user = user;
        global.user_object = user_object;
        global.runner = helper.runner;

        jasmine.getEnv().addReporter(new AllureReporter());
        jasmine.getEnv().afterEach(function(done){
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                done();
            })
        });
    }
};

var getRandomString = function(length) {
    var string = '';
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (i = 0; i < length; i++) {
        string += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return string;
};



