const yaml    = require('js-yaml');
const fs      = require('fs');

const setting = yaml.safeLoad(fs.readFileSync('./spec/support/settings.yml', 'utf8'));
const page    = yaml.safeLoad(fs.readFileSync('./spec/support/pages.yml', 'utf8'));
const form    = yaml.safeLoad(fs.readFileSync('./spec/support/forms.yml', 'utf8'));
const user      = JSON.parse(fs.readFileSync('./spec/support/user.json'));

module.exports = {
    call: function() {

        global.getRandomString = getRandomString;
        global.admin           = 'admin@local.host';
        // global.admin           = 'admin@404-group.info';
        global.id_email        = 'user_email';
        global.id_pass         = 'user_password';
        global.id_pass_conf    = 'user_password_confirmation';
        global.password        = '123456';
        global.user_email      = 'spok_' + getRandomString(10) + '@gmail.com';
        global.EC              = protractor.ExpectedConditions;
        global.globalTimeout   = 15000;
        global.user            = user;
        global.setting         = setting;
        global.form            = form;
        global.page            = page;
        global.fs              = fs;

        global.editJsonFile  = require("edit-json-file");
        global.Url           = require('url-parse');

        global.helper = require('../spec/helpers/base.js');
        global.go     = helper.runner;
        global.set    = helper.runner;
        global.action = helper.runner;

        global.outputFilename           = '../spec/support/';
        global.tag_selector             = require('../spec/helpers/selectors.js');;
        global.for_css                  = require('../spec/helpers/css_selectors.js');
        global.user_object              = require('../spec/panel/page_object/user.js');
        global.demands_services_shared  = require('../spec/shared/demands/services.js');
        global.demands_return_shared    = require('../spec/shared/demands/return.js');
        global.services_shared          = require('../spec/shared/services.js');
        global.receipts_shared          = require('../spec/shared/receipts.js');
        global.conversion_shared        = require('../spec/shared/conversion.js');
        global.user_shared              = require('../spec/shared/user.js');
        global.salary_shared            = require('../spec/shared/salary.js');
        global.employee_shared          = require('../spec/shared/employee.js');
        global.cashier_shared           = require('../spec/shared/cashier.js');
        global.testing_selectors_shared = require('../spec/shared/testing_selectors.js');
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
