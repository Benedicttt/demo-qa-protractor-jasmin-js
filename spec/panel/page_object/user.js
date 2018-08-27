'use strict';

module.exports = {
    fillFormAuth: function(who) {
        helper.set_input_value(id_email, who);
        helper.set_input_value(id_pass, password);
        element(by.css('button[type=submit]')).click()
    },

    fillFormReg: function() {
        helper.set_input_value(id_email, user_email);
        helper.set_input_value(id_pass, password);
        helper.set_input_value(id_pass_conf, password);
        element(by.css('button[type=submit]')).click()
    },
    authorization: function(who) {
        browser.waitForAngularEnabled(false);
        browser.manage().deleteAllCookies();
        browser.get('/users/sign_in');
        this.fillFormAuth(who);
    },
    exit_session: function() {
        element.all(by.css('.dropdown > a')).each(function(element) {
            element.getText().then(function (text) {
                if (text === user_email.toLowerCase()){
                    element.click();
                } else {
                    console.log(`Not found name link ${ user_email }`)
                }
            });
        });
        element(by.cssContainingText("#exit", 'Выход')).click();
        expect(element(by.css('.alert-success')).getText()).toEqual(exit_success);
    },
    registration: function() {
        browser.get('/users/sign_up');
        this.fillFormReg();
    },
};
