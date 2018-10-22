module.exports = {
    wait_id_select: function(id, ms){
        let until = protractor.ExpectedConditions;
        elem = element(by.id(id)).all(by.tagName('option'));
        browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
    },

    wait_css_select: function(css, ms){
        let until = protractor.ExpectedConditions;
        elem = element(by.css(css)).all(by.tagName('option'));
        browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
    },

    wait_xpath_select: function(xpath, ms){
        let until = protractor.ExpectedConditions;
        elem = element(by.xpath(xpath)).all(by.tagName('option'));
        browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
    },

    click_id_on_option: (id, index, ms) => {
        tag_selector.wait_id_select(id, ms);
        element(by.id(id)).all(by.tagName('option')).then(function(options){
            options[index].click();
        });
    },

    click_css_on_option: function (css, index, ms) {
        tag_selector.wait_css_select(css, ms);
        element(by.css(css)).all(by.tagName('option')).then(function(options){
            options[index].click();
        });
    },

    click_xpath_on_option: function (xpath, index, ms) {
        tag_selector.wait_xpath_select(xpath, ms);
        element(by.xpath(xpath)).all(by.tagName('option')).then(function(options){
            options[index].click();
        });
    },

    from_text: function(type, data_selector, search_text) {
        let selectors = element.all(by[ type ? 'css' : '' || type ? 'id' : '' || type ? 'xpath' : '' ](data_selector))
        type === 'css' ? for_css.wait_css(data_selector, 3000) : '';
        type === 'id' ? for_css.wait_id(data_selector, 3000) : '';
        type === 'xpath' ? for_css.wait_xpath(data_selector, 3000) : '';

        selectors.each(function(elem) {
            elem.getText().then(function(text) {
                if ( text === search_text ) {
                    elem.click()
                    expect(elem.getText()).toEqual(search_text)
                } 
            })
        })
    },

    selectOption: function (selector, item) {
        tag_selector.wait_id_select(selector, 5000);
        var selectList, desiredOption;
        selectList = element(by.id(selector));
        selectList.all(protractor.By.tagName('option'))
            .then(function (options) {
                options.some(function (option) {
                    option.getText().then(function (text) {
                        if (item.toLowerCase() === text.toLowerCase()) {
                            desiredOption = option;
                            return true;
                        }
                        return true;
                    });
                });
            })
            .then(function () {
                if (desiredOption) {
                    desiredOption.click();
            }
        });
    }
};

