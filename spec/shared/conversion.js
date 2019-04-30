const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/finances_operations/test_case.yml', 'utf8');
const scenarios = yaml.safeLoad(file).conversion;

module.exports = {
    run_test_case: function(name_case) {
        it(`Go to page and check title ${page.conversion.title}`,  () => {
            user_object.authorization(helper.user_email_last());

            go(page.conversion.get);
            expect(browser.getTitle()).toEqual(page.conversion.title);
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

        conversion_shared.fill_data_nds(name_case);

        conversion_shared.buttons(name_case);
        helper.check_data_popup(name_case, scenarios);
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
            let btn = element(by.css(".form-actions > .btn-primary"));

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
            let btn = element(by.css(".confirm-convertion"));
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), globalTimeout);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), globalTimeout);
            btn.click();
        });

        it("assert create current DDS",  () => {
            browser.sleep(1000);

            helper.check_current_url('/fin_indicators/operations')
        });
    },
};