let outputFilename = './spec/support/user.json';

module.exports = {
    runner: function(string_command) {
        var test = new Function(string_command);
        test();
    },

    set_input_value: function(id, string) {
        element(by.id(id)).clear();
        return element(by.id(id)).sendKeys(string);
    },

    get_input_attr: function(id, value) {
        return element(by.id(id)).getAttribute(value);
    },

    write_in_file: function (data) {
        fs.writeFile(outputFilename, data, (error) => {  });
    },

    addCookie: function() {
        browser.get("/");
        browser.manage().deleteAllCookies();
        browser.driver.manage().addCookie(
            {
                'httpOnly': true,
                'name': user.cookie.name,
                'path': '/',
                'secure': false,
                'value': user.cookie.value
            }
        );
        browser.get("/");
    },
    authorization_last_user: function () {
        browser.get("/");
        browser.manage().deleteAllCookies();
        browser.get("/");

        helper.set_input_value(id_email, user.user.email);
        expect(helper.get_input_attr(id_email, 'values')).toEqual(user.user.email);

        helper.set_input_value(id_pass, user.user.password);
        expect(helper.get_input_attr(id_pass, 'value')).toEqual(user.user.email);

        let remember_box = element(by.id("user_remember_me"));
        remember_box.click();
        expect(remember_box.getAttribute('checked') ).toBeTruthy();

        element(by.css("button[type=submit]")).click();

        browser.manage().getCookie('_session_id').then(function(cookie) {
            expect(cookie.value.length).toEqual(32);
        }).then();
    }
};