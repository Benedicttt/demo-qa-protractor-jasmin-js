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

    from_text: function(type, data_selector, search_text, action) {
        const selectors = element.all(by[type ? 'css' : '' || type ? 'id' : '' || type ? 'xpath' : ''](data_selector))
        type === 'css' ? for_css.wait_css(data_selector, globalTimeout) : '';
        type === 'id' ? for_css.wait_id(data_selector, globalTimeout) : '';
        type === 'xpath' ? for_css.wait_xpath(data_selector, globalTimeout) : '';

        selectors.map(function(item, index_elem) {
        }).then( (text) => {
            let limit = text.length;

            for (let index = 0; index < limit; index++) {
                let index_elem = index;

                let option = selectors.get(index).getText();
                option.then((text)=>{
                    if( text === search_text ) {
                       action === 'click' ? selectors.get(index_elem).click() : '';
                    }

                })
            };
        });


    },

    selectOption: function (selector, item) {
        tag_selector.wait_id_select(selector, globalTimeout);
        let selectList, desiredOption;

        selectList = element(by.id(selector));
        browser.sleep(200);

        selectList.all(protractor.By.tagName('option'))
            .then(function (options) {
                options.some(function (option) {
                    option.getText().then(function (text) {
                        let reg = new RegExp(item)

                        if (reg.test(text)) {
                            desiredOption = option;
                        }
                    });
                });
            })
            .then(function () {
                if(desiredOption) {
                    desiredOption.click();
                }
            });
    }
};

