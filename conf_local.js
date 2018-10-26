const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const user_object = require('./spec/panel/page_object/user.js');
const user_shared = require('./spec/shared/user.js');

const helper = require('./spec/helpers/base.js');
const selectors = require('./spec/helpers/selectors.js');
const for_css = require('./spec/helpers/css_selectors.js');
const demands_shared = require('./spec/shared/demands.js');
const services_shared = require('./spec/shared/services.js');
const receipts_shared = require('./spec/shared/receipts.js');
const conversion_shared = require('./spec/shared/conversion.js');

data = fs.readFileSync('./spec/support/user.json')
let user = JSON.parse(data);
const setting = yaml.safeLoad(fs.readFileSync('spec/support/settings.yml', 'utf8'));
const page = yaml.safeLoad(fs.readFileSync('spec/support/pages.yml', 'utf8'));
const form = yaml.safeLoad(fs.readFileSync('spec/support/forms.yml', 'utf8'));

const AllureReporter = require('jasmine-allure-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');

const outputFilename = './spec/support/';




var addScreenShots = {
    specDone: function (result) {
        if (result.status === 'failed') {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screen', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
            });
        }
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

exports.config = {
    baseUrl: process.env.APP_HOST,

    directConnect: true,
    capabilities: {
        browserName: 'chrome',
            chromeOptions: {
                args: [ "--disable-gpu", "--window-size=1920x1080" ]
            }

        // shardTestFiles: true,
        // maxInstances: 5,

    },

    suites: {
        authentication: [
            "spec/panel/home_page.js",
            "spec/panel/sign_up.js",
            "spec/panel/sign_in.js"],

        preconditions: [
            "spec/panel/home_page.js",
            "spec/panel/sign_up.js",
            "spec/panel/sign_in.js",
            "spec/panel/user_access/set_user_access_full.js",
            "spec/panel/services/create.js",
        ],

        regression: [
            "spec/panel/home_page.js",
            "spec/panel/sign_up.js",
            "spec/panel/sign_in.js",
            "spec/panel/user_access/set_user_access_full.js",
            "spec/panel/services/create.js",
            "spec/panel/**/*.js"
        ],


    },

    allScriptsTimeout: 10000,
    getPageTimeout: 15000,

    files: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery/dist/jquery.min.js'
    ],
    framework: 'jasmine',

    onPrepare() {
        var width = 1620;
        var height = 1080;
        browser.driver.manage().window().setSize(width, height);           
       

        global.getRandomString = getRandomString;

        global.admin           = 'admin@404-group.info';
        global.id_email        = 'user_email';
        global.id_pass         = 'user_password';
        global.id_pass_conf    = 'user_password_confirmation';
        global.password        = '123456';
        global.user_email      = 'spok_' + getRandomString(10) + '@gmail.com';
        global.EC              = protractor.ExpectedConditions;

        global.fs              = fs;
        global.user            = user;
        global.user_object     = user_object;
        global.setting         = setting;
        global.form            = form;
        global.page            = page;

        global.go              = helper.runner;
        global.set             = helper.runner;
        global.action          = helper.runner;

        global.helper          = helper;
        global.tag_selector    = selectors;
        global.for_css         = for_css;

        global.outputFilename  = outputFilename;

        global.demands_shared  = demands_shared;
        global.services_shared = services_shared;
        global.receipts_shared = receipts_shared;
        global.conversion_shared = conversion_shared;
        global.user_shared = user_shared;


        jasmine.getEnv().addReporter(addScreenShots);
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: './allure-results/'
        }));

        jasmine.getEnv().addReporter(new SpecReporter( { displayStacktrace: 'all' } ));
    }

};

// arr = []
//     %w[operation demand service].each { |index| arr << index.classify }
// arr.each { |i| i.constantize.all.each { |i| i.delete } }

