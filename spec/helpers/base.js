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

    write_in_file: function (name_file, data) {
        fs.writeFile(outputFilename + name_file, data, (error) => {  });
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

    first_number_service: function () {
        return JSON.parse(fs.readFileSync('./spec/support/service.json'))['service']['we']['number'];
    },

    last_number_service: function () {
        return JSON.parse(fs.readFileSync('./spec/support/service.json'))['service']['us']['number'];
    },

    sign_order_xpath: function (xpath_elem, index_elem, count_click) {
        for_css.wait_xpath(xpath_elem, 5000);
        element.all(by.css('.btn.btn-mini')).get(index_elem).click().then(function () {
            browser.sleep(1000);
            for_css.wait_css('#modal form', 10000);
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
        for_css.wait_css("td.no-wrap > a, td.no-wrap > span", 5000);
        browser.sleep(500);
        element.all(by.css(css)).get(index_elem).getText().then(function (result) {
            if ( log === true) { console.log(result, index_elem) }
            expect(result).toEqual(expect_text)
        })
    },

    click_is_paid_and_filter_all: function () {
        for_css.wait_css("#filter_is_paid > label", 5000);
        for_css.wait_css(".btn.btn-primary", 5000)
        
        element(by.css("#filter_is_paid > label")).click();
        browser.sleep(1000)

        element(by.css(".btn.btn-primary")).click()
        browser.sleep(1000)
        element(by.css(".btn.btn-primary")).click()
        browser.sleep(1000)
    }

};