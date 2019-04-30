'use strict';
module.exports = {
    fillFormAuth: function(who) {
        helper.set_input_value(id_email, who);
        helper.set_input_value(id_pass, password);
        element(by.css('button[type=submit]')).click()
    },

    authorization: function(who) {
        console.log(who)
        set(setting.angular_wait_false);
        browser.driver.manage().timeouts().implicitlyWait(2000);
        go(page.sign_in.get);

        element(by.css(".pull-right .dropdown")).isPresent().then(function(result) {
            if (result == true ) {

                element(by.css(".pull-right .dropdown")).getText().then(function (current_user) {

                    if (current_user.toLowerCase() !== who.toLowerCase()) {
                        set(setting.delete_all_cookies);

                        go(page.sign_in.get);
                        user_object.fillFormAuth(who);
                    }
                });

            } else {
                user_object.fillFormAuth(who);
            }
        });
    }
};
