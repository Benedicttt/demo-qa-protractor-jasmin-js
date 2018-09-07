module.exports = {
    user_email_last: function () {
        return JSON.parse(fs.readFileSync('./spec/support/user.json'))['user']['email'];
    },

    user_password_last: function () {
        return JSON.parse(fs.readFileSync('./spec/support/user.json'))['user']['password'];
    },

    runner: function(string_command) {
        const test = new Function(string_command);
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
    }
};