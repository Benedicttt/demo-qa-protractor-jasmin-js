'use strict';
module.exports = {
    fillFormAuth: function(who) {
        helper.set_input_value(id_email, who);
        helper.set_input_value(id_pass, password);
        element(by.css('button[type=submit]')).click()
    },
    authorization: function(who) {
        set(setting.angular_wait_false);
        set(setting.delete_all_cookies);
        go(page.sign_in.get);
        this.fillFormAuth(who);
    }
};
