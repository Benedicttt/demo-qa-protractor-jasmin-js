module.exports =
    {
        set:
            [
                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs:
                        [
                            "../spec/panel/preconditions/sign_up.js",
                            "../spec/panel/preconditions/home_page.js",
                            "../spec/panel/preconditions/sign_in.js",

                            "../spec/panel/preconditions/user_access/set_user_access_full.js",

                            "../spec/panel/preconditions/employee.js"

                        ]
                },


                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs: [
                        "../spec/panel/regression/tests_selector/demand_new.js"
                    ]

                },

                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs: [
                        "../spec/panel/regression/tests_selector/service_new.js"
                    ]

                },

                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs: [
                        "../spec/panel/preconditions/services/us.js",
                        "../spec/panel/preconditions/services/we.js"
                    ]

                },

                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs: [
                        "../spec/panel/regression/tests_selector/filter_demand.js"
                    ]

                },

                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs: [
                        "../spec/panel/regression/tests_selector/filter_operations.js"
                    ]

                },

                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs: [
                        "../spec/panel/regression/tests_selector/filter_service.js"
                    ]

                },

                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs: [
                        "../spec/panel/regression/demands/return.js"
                    ]

                },

                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs: [
                        "../spec/panel/regression/demands/service.js"
                    ]

                },

                {
                    browserName: "chrome",
                    chromeOptions: {
                        prefs: { 'credentials_enable_service': false },
                        args: [ "--disable-gpu", "--window-size=1920x1080" ]
                    },
                    specs: [
                        "../spec/panel/regression/finances_operations/*.js"
                    ]

                },

                    specs: [
                        "../spec/panel/preconditions/cashier/cashier_real.js",
                        "../spec/panel/preconditions/cashier/cashier_virtual.js"
                    ]

                },
            ]
    };

