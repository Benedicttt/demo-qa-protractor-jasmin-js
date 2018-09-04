var fs = require('fs');
var outputFilename = 'user.json';

module.exports = {
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