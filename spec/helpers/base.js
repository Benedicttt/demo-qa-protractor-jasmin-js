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
    },
    sign_order_xpath: function (xpath_elem, index_elem, count_click) {
        for_css.wait_xpath(xpath_elem, 5000);
        element.all(by.css('.btn.btn-mini')).get(index_elem).click().then(function () {
            browser.sleep(1000);
            for_css.wait_css('#modal form', 4000);
                Number.prototype.times = function (cb) {
                    var i = -1;

                    while (++i < this) {
                        cb
                    }

                    return +this;
                };

            if (count_click > 0) {
                element(by.css('#modal form')).submit();
                browser.sleep(1000);
                element(by.css('#modal form')).submit();
            } else {
                element(by.css('#modal form')).submit();
            }
            browser.sleep(1000);
        });
    },

    check_success_sign: function (css, index_elem = null, expect_text = null, log = null){
        element.all(by.css(css)).each(function (elem, index) {
            elem.getAttribute('class').then(function (attr) {
                if ( attr === 'label label-success' ) {
                    if ( log === true ) {
                        elem.getText().then(function (text){ console.log( text, index ) })
                    }

                    if ( index === index_elem ) {
                        elem.getText().then(function (text) {
                            expect(text).toEqual(expect_text)
                        })
                    }
                }
            });
        });
    }
};