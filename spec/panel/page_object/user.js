'use strict';

module.exports = {
    fillFormAuth: function(who) {
        helper.set_input_value(id_email, who);
        helper.set_input_value(id_pass, password);
        element(by.css('button[type=submit]')).click()
    },
    authorization: function(who) {
        browser.waitForAngularEnabled(false);
        browser.manage().deleteAllCookies();
        runner(command.page.sign_in);
        this.fillFormAuth(who);
    }
};
