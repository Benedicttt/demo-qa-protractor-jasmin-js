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
            }
        });
    },

    selectOptionCSS: function (selector, item) {
        let selectList, desiredOption;
        let reg = new RegExp(item);

        tag_selector.wait_css_select(selector, globalTimeout);
        selectList = element(by.css(selector));

        selectList.all(protractor.By.tagName('option')).then(function (options) {
            console.log("\tExpected: [ " + item + " ]");
            browser.sleep(200);

            options.some(function (option) {
                option.getText().then(function (text) {

                    if (reg.test(text) === true) {
                        desiredOption = option;
                    }
                });

            });
        })
            .then(function () {
                if(desiredOption) {
                    desiredOption.click();
                }

                desiredOption.getText().then(function (text) {
                    console.log("\tActual: [ " + text + " ]");
                });
            })

    },

    selectOption: function (selector, item) {
        let selectList, desiredOption;
        let reg = new RegExp(item);

        tag_selector.wait_id_select(selector, globalTimeout);
        selectList = element(by.id(selector));

        selectList.all(protractor.By.tagName('option')).then(function (options) {
            console.log("\tExpected: [ " + item + " ]");
            browser.sleep(200);

            options.some(function (option) {
                option.getText().then(function (text) {

                        if (reg.test(text) === true) {
                            desiredOption = option;
                        }
                    });

                });
            })
            .then(function () {
                if(desiredOption) {
                    desiredOption.click();
                }

                desiredOption.getText().then(function (text) {
                    console.log("\tActual: [ " + text + " ]");
                });
            })

    }
};

