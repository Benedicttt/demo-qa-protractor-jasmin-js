'use strict';
module.exports = {
    fillFormAuth: function(who) {
        helper.set_input_value(id_email, who);
        helper.set_input_value(id_pass, password);
        element(by.css('button[type=submit]')).click()
    },

    authorization: function(who) {
        set(setting.angular_wait_false);

        element(by.css(".pull-right .dropdown")).isPresent().then(function(result) {
            element(by.css(".pull-right .dropdown")).getText().then(function(current_user) {
                if (current_user !== who) {
                    set(setting.delete_all_cookies);
                }
            });

            if (result == false ){
                go(page.sign_in.get);
                user_object.fillFormAuth(who);
            } else {
                console.log("You are authorize");
            }
        });
    }
};
