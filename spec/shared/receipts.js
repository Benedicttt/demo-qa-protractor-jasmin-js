const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/finances_operations/test_case.yml', 'utf8');
const scenarios = yaml.safeLoad(file).receipts;

module.exports = {
    run_test_case: function(name_case) {
        it(`Go to page and check title ${page.receipts.title}`, () => {
            user_object.authorization(helper.user_email_last());

            go(page.receipts.get);
            expect(browser.getTitle()).toEqual(page.receipts.title);
        });

        scenarios[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                browser.sleep(200)
                tag_selector.selectOption(key, value);
            })
        });

        scenarios[`${name_case}`].checkbox.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            if (Object.values(id)[0] === true) {
                it(`{ ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click();

                    if (key === "receipt_is_refund" && value === 'true' ) {
                        // element(by.id(`${key}`)).click();
                        let service_we = helper.created_services("we")
                        element(by.id('receipt_refundable_service_id')).sendKeys(service_we)
                    }

                })
            }
        });

        scenarios[`${name_case}`].input.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();
                element(by.id(`${key}`)).sendKeys(`${value}`)
            })
        });

        receipts_shared.fill_data_nds(name_case);
        receipts_shared.buttons(name_case);
        receipts_shared.check_data_popup(name_case)
    },

    fill_data_nds: function(name_case) {
        if (scenarios[`${name_case}`].fill_nds_form === true) {

            scenarios[`${name_case}`].nds_form.checkbox.map(function(id) {
                let value = `${Object.values(id)[0]}`;
                let key = `${Object.keys(id)[0]}`;

                it(`{ ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click()
                });
            })

            scenarios[`${name_case}`].nds_form.selector.map(function(id) {
                let value = `${Object.values(id)[0]}`;
                let key = `${Object.keys(id)[0]}`;

                it(`{ ${key}: ${value} }`, () => {
                    browser.sleep(200)
                    tag_selector.selectOption(key, value);
                })
            });
        }
    },

    buttons: function(name_case) {
        it("click Save button",  () => {
            let EC = protractor.ExpectedConditions;
            let btn = element(by.css("#new_receipt > div.form-actions > button"));

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), globalTimeout);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), globalTimeout);
            btn.click();
        });

        if (scenarios[`${name_case}`].click_accept_NDS ===  true) {
            it("click accept NDS", () => {
                let btn = element(by.css("#repeat-confirm"));
                let EC = protractor.ExpectedConditions;

                browser.wait(protractor.ExpectedConditions.visibilityOf(btn), globalTimeout);
                browser.wait(EC.elementToBeClickable(btn.isEnabled()), globalTimeout);
                btn.click();
            });
        }

        it("click YES",  () => {
            browser.sleep(500)
            let btn = element.all(by.css(".btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), globalTimeout);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), globalTimeout);
            btn.click();

        });

        it("assert create current DDS",  () => {
            browser.sleep(1000)
            let expectedUrl = browser.baseUrl + '/fin_indicators/operations';
            let EC = browser.ExpectedConditions;

            browser.wait(EC.urlContains(expectedUrl), globalTimeout);
            browser.wait(EC.urlIs(expectedUrl), globalTimeout);
            expect(browser.getCurrentUrl()).toEqual(expectedUrl);
        });
    },

    check_data_popup: function(name_case) {
        it('Find popup', () => {
            for_css.wait_css(".btn-group .icon-info-sign", globalTimeout);
            let current_popup = element.all(by.css(".btn-group i.icon-info-sign")).get(0)
            current_popup.click();
            current_popup.isDisplayed();
            for_css.wait_css(".popover-title", globalTimeout, 0)
            browser.sleep(3000)

        });

        if (scenarios[`${name_case}`].check_data_popup_service ===  true) {
            it('check SERVICE document', () => {
                let elem = element.all(by.css(".show_entities > a")).get(0);
                for_css.wait_css(".show_entities > a", globalTimeout, 0);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

        if (scenarios[`${name_case}`].check_data_popup_dds ===  true) {
            it('check DDS document', () => {
                let elem = element.all(by.css(".show_entities > a")).get(1);

                for_css.wait_css(".show_entities > a", globalTimeout)

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/fin_indicators/operations/highlight_operation?operation_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

        if (scenarios[`${name_case}`].check_data_nds_we ===  true) {
            it('check NDS document WE', () => {
                let elem = element.all(by.css(".show_entities > a")).get(2);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

        if (scenarios[`${name_case}`].check_data_nds_us ===  true) {
            it('check NDS document US', () => {
                browser.sleep(1500)
                let elem = element.all(by.css(".show_entities > a")).get(3);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

    },
};