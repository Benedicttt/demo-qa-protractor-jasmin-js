const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const editJsonFile = require("edit-json-file");

const user_object = require('./spec/panel/page_object/user.js');
const user_shared = require('./spec/shared/user.js');

const helper = require('./spec/helpers/base.js');
const selectors = require('./spec/helpers/selectors.js');
const for_css = require('./spec/helpers/css_selectors.js');
const demands_return_shared = require('./spec/shared/demands/return.js');
const demands_services_shared = require('./spec/shared/demands/services.js');
const services_shared = require('./spec/shared/services.js');
const conversion_shared = require('./spec/shared/conversion.js');
const salary_shared = require('./spec/shared/salary.js');
const employee_shared = require('./spec/shared/employee.js');
const receipts_shared = require('./spec/shared/receipts.js');
const cashier_shared = require('./spec/shared/cashier.js');

data = fs.readFileSync('./spec/support/user.json')
let user = JSON.parse(data);
const setting = yaml.safeLoad(fs.readFileSync('spec/support/settings.yml', 'utf8'));
const page = yaml.safeLoad(fs.readFileSync('spec/support/pages.yml', 'utf8'));
const form = yaml.safeLoad(fs.readFileSync('spec/support/forms.yml', 'utf8'));

const AllureReporter = require('jasmine-allure-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');

let outputFilename = './spec/support/';

const addScreenShots = {
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

let getRandomString = function(length) {
    let string = '';
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (i = 0; i < length; i++) {
        string += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return string;
};

var disableNgAnimate = function() {
    angular
        .module('disableNgAnimate', [])
        .run(['$animate', function($animate) {
            $animate.enabled(false);
        }]);
};

let disableCssAnimate = function() {
    angular
        .module('disableCssAnimate', [])
        .run(function() {
            let style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '* {' +
                '-webkit-transition: none !important;' +
                '-moz-transition: none !important' +
                '-o-transition: none !important' +
                '-ms-transition: none !important' +
                'transition: none !important' +
                '}';
            document.getElementsByTagName('head')[0].appendChild(style);
        });
};

let dataUtilMockModule = function () {
    let utilModule = angular.module('dataUtil', ['platform']);
    utilModule.service('EntityCreation', ['EntityDataService', '$q', function (EntityDataService) {

        createEntity = function (details,type) {
            let entity = EntityDataService.Entity(details).ofType(type);
            let promise = entity.save();
            return promise;
        };
    }]);
};


exports.config = {

    directConnect: JSON.parse(process.env.DIRECT_CONNECT),

    selenium: {
        start_process: false
    },

    seleniumAddress: 'http://selenium:4444/wd/hub',

    baseUrl: process.env.APP_HOST,

    capabilities: {
        // shardTestFiles: false,     // allows specs to be executed in parallel.
        // maxInstances: 1,

        browserName: 'chrome',

        chromeOptions: {
            prefs: { 'credentials_enable_service': false },
            args: [ "--disable-gpu", "--window-size=1920x1080" ]
        },

    },
    splitTestsBetweenCapabilities: true,
    allScriptsTimeout: 10000,
    getPageTimeout: 12000,

    files: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery/dist/jquery.min.js'
    ],
    framework: 'jasmine',

    onPrepare: function () {

        browser.addMockModule('dataUtil', dataUtilMockModule);
        browser.addMockModule('disableNgAnimate', disableNgAnimate);
        browser.addMockModule('disableCssAnimate', disableCssAnimate);


        let width = 1620;
        let height = 1080;
        browser.driver.manage().window().setSize(width, height);


        global.getRandomString = getRandomString;

        global.admin           = 'admin@404-group.info';
        global.id_email        = 'user_email';
        global.id_pass         = 'user_password';
        global.id_pass_conf    = 'user_password_confirmation';
        global.password        = '123456';
        global.user_email      = 'spok_' + getRandomString(10) + '@gmail.com';
        global.EC              = protractor.ExpectedConditions;
        global.globalTimeout   = 3000;
        global.fs              = fs;
        global.editJsonFile    = editJsonFile;
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

        global.demands_services_shared  = demands_services_shared;
        global.demands_return_shared  = demands_return_shared;
        global.services_shared = services_shared;
        global.receipts_shared = receipts_shared;
        global.conversion_shared = conversion_shared;
        global.user_shared = user_shared;
        global.salary_shared = salary_shared;
        global.employee_shared = employee_shared;
        global.cashier_shared = cashier_shared;

        // jasmine.getEnv().addReporter(addScreenShots);
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: './allure-results/'
        }));

        jasmine.getEnv().addReporter(new SpecReporter( { displayStacktrace: 'all' } ));
    },

    suites: {
        create_user: [
            "spec/panel/preconditions/sign_up.js",
            "spec/panel/preconditions/home_page.js",
            "spec/panel/preconditions/sign_in.js",
        ],

        add_accesses: [
            "spec/panel/preconditions/user_access/set_user_access_full.js"
        ],

        cashier: [
            "spec/panel/preconditions/cashier/cashier_real.js",
            "spec/panel/preconditions/cashier/cashier_virtual.js"
        ],

        create_services: [
            "spec/panel/preconditions/employee.js",
            "spec/panel/preconditions/services/us.js",
            "spec/panel/preconditions/services/we.js"
        ],

        preconditions: [
            "spec/panel/preconditions/sign_up.js",
            "spec/panel/preconditions/home_page.js",
            "spec/panel/preconditions/sign_in.js",
            "spec/panel/preconditions/user_access/set_user_access_full.js",
            "spec/panel/preconditions/cashier/cashier_real.js",
            "spec/panel/preconditions/cashier/cashier_virtual.js",
            "spec/panel/preconditions/employee.js",
            "spec/panel/preconditions/services/us.js",
            "spec/panel/preconditions/services/we.js"
        ],

        regression: [
            "spec/panel/regression/**/*.js"
        ],

        demands: [
            "spec/panel/regression/demands/return.js",
            "spec/panel/regression/demands/service.js"
        ],

        check_user_access: [
            "spec/panel/preconditions/user_access/set_user_access_mid.js"
        ]

    }
};


// arr = []
//     %w[operation demand service].each { |index| arr << index.classify }
// arr.each { |i| i.constantize.all.each { |i| i.delete } }

