let global_variables =  require('./global_variable.js');
let suites           =  require('./suites.js');
let reports          =  require('./reports.js');
let disable          =  require('./disable.js');
let capabilities     =  require('./capabilities.js');

exports.config = {
    // suites:       suites,
    multiCapabilities: [
        {
            "browserName": "chrome",
            count: 1,
            specs:
                [
                    "../spec/panel/preconditions/sign_up.js",
                    "../spec/panel/preconditions/home_page.js",
                    "../spec/panel/preconditions/sign_in.js",
                    "../spec/panel/preconditions/user_access/set_user_access_full.js",
                    "../spec/panel/preconditions/cashier/cashier_real.js",
                    "../spec/panel/preconditions/cashier/cashier_virtual.js",
                    "../spec/panel/preconditions/employee.js",
                    "../spec/panel/preconditions/services/us.js",
                    "../spec/panel/preconditions/services/we.js",

                    "../spec/panel/regression/**/*.js"
                ]
        },
        {
            "browserName": "chrome",
            count: 1,
            specs: ["../spec/panel/regression/testing_selector_ajax.js"]

        },
    ],

    framework:    'jasmine',

    splitTestsBetweenCapabilities: true,
    allScriptsTimeout:             15000,
    getPageTimeout:                15000,

    jasmineNodeOpts: {
        showColors:             true,
        includeStackTrace:      true,
        defaultTimeoutInterval: 600000
    },

    baseUrl:          process.env.APP_HOST,
    directConnect:    JSON.parse(process.env.DIRECT_CONNECT),
    seleniumAddress: 'http://selenium:4444/wd/hub',
    selenium: { start_process: false },

    onPrepare: function () {
        global_variables.call();
        reports.call_settings();
        disable.animations();

        browser.driver.manage().window().setSize(1620, 1080);
        browser.manage().timeouts().implicitlyWait(5000);
    }
};
