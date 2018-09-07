const yaml = require('js-yaml');
const fs = require('fs');
let user = JSON.parse(fs.readFileSync('./spec/support/user.json'));

const user_object = require('./spec/panel/page_object/user.js');
const helper = require('./spec/helpers/base.js');
const selectors = require('./spec/helpers/selectors.js');
const for_css = require('./spec/helpers/css_selectors.js');

const setting = yaml.safeLoad(fs.readFileSync('spec/support/settings.yml', 'utf8'));
const page = yaml.safeLoad(fs.readFileSync('spec/support/pages.yml', 'utf8'));
const form = yaml.safeLoad(fs.readFileSync('spec/support/forms.yml', 'utf8'));

const AllureReporter = require('jasmine-allure-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');

const outputFilename = './spec/support/user.json';

exports.config = {
    capabilities: {
        browserName: 'chrome',
            chromeOptions: {
                args: [
                    "--headless",
                    "--no-sandbox",
                    "--disable-gpu"]
            },
        // shardTestFiles: true,
        // maxInstances: 2,

        browserName: 'firefox',
            // 'moz:firefoxOptions': {
            //     args: ['--headless']
            // }

    },
    directConnect: true,
    baseUrl: 'http://localhost:3000',
    specs: [
        "spec/panel/home_page.js",
        "spec/panel/sign_up.js",
        "spec/panel/sign_in.js",
        "spec/panel/user_access/set_user_access_full.js",
        "spec/panel/**/*.js"
    ],
    allScriptsTimeout: 10000,
    getPageTimeout: 15000,

    files: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery/dist/jquery.min.js'
    ],
    framework: 'jasmine',
    onPrepare() {
        browser.manage().window().maximize();
        global.getRandomString = getRandomString;

        global.admin = 'user86@gmail.com';
        global.id_email = 'user_email';
        global.id_pass = 'user_password';
        global.id_pass_conf = 'user_password_confirmation';
        global.password = '123456';
        global.user_email = 'spok_' + getRandomString(10) + '@gmail.com';
        global.EC = protractor.ExpectedConditions;

        global.fs = fs;
        global.user = user;
        global.user_object = user_object;
        global.setting = setting;
        global.form = form;
        global.page = page;

        global.go = helper.runner;
        global.set = helper.runner;
        global.action = helper.runner;

        global.helper = helper;
        global.tag_selector = selectors;
        global.for_css = for_css;

        global.outputFilename = outputFilename;

        // jasmine.getEnv().afterEach(function (done) {
        //     browser.takeScreenshot().then(function (png) {
        //         allure.createAttachment('Screenshot', function () {
        //             return new Buffer(png, 'base64')
        //         }, 'image/png')();
        //         done();
        //     })
        // });

        var addScreenShots = new function () {
            this.specDone = function (result) {
                // console.log(result);
                if (result.status === "failed") {
                    browser.takeScreenshot().then(function (png) {
                        allure.createAttachment('Screenshot', function () {
                            return new Buffer(png, 'base64')
                        }, 'image/png')();
                    });
                }
            };
        };

        jasmine.getEnv().addReporter(addScreenShots);
        jasmine.getEnv().addReporter(new AllureReporter());

        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'none',      // display stacktrace for each failed assertion, values: (all|specs|summary|none)
            displaySuccessesSummary: false, // display summary of all successes after execution
            displayFailuresSummary: true,   // display summary of all failures after execution
            displayPendingSummary: true,    // display summary of all pending specs after execution
            displaySuccessfulSpec: true,    // display each successful spec
            displayFailedSpec: true,        // display each failed spec
            displayPendingSpec: false,      // display each pending spec
            displaySpecDuration: false,     // display each spec duration
            displaySuiteNumber: false,      // display each suite number (hierarchical)
            colors: {
                success: 'red',
                failure: 'red',
                pending: 'yellow'
            },
            prefixes: {
                success: '✓ ',
                failure: '✗ ',
                pending: '* '
            },
            customProcessors: [],

        }));
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

