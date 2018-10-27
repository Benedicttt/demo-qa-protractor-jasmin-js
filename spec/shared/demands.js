const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/demands/test_case.yml', 'utf8')
const scenarios = yaml.safeLoad(file).demand;

let file_service = fs.readFileSync('spec/support/service.json')
let services_ids = JSON.parse(file_service).service

module.exports = {
    run_test_case_return: function(name_case) {
        scenarios.return[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                tag_selector.selectOption(key, value)
            })
        });

        scenarios.return[`${name_case}`].checkbox.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            if (Object.values(id)[0] === true) {
                it(`{ ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click();
                    browser.sleep(100)
                })
            }
        });

        scenarios.return[`${name_case}`].input.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();

                if ( value === 'us') {
                    element(by.id(`${key}`)).sendKeys(services_ids.us.number)

                } else if ( value === 'we') {
                    element(by.id(`${key}`)).sendKeys(services_ids.we.number)

                } else {
                    element(by.id(`${key}`)).sendKeys(`${value}`)

                }
            })
        });


        it("click Save button",  () => {
            let btn = element.all(by.css("button.btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 2500);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 2500);
            btn.click()
        });

        demands_shared.buttons();
        demands_shared.check_status_order_return()

        demands_shared.check_data_popup("SERVICE");
        demands_shared.check_data_popup("DDS");
        demands_shared.check_data_popup("DEMANDS");
    },

    buttons: function() {
        it("click Save button",  () => {
            let btn = element.all(by.css("#new_demand > div.form-actions > button")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 3000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            btn.click();
        });

        it("click accept",  () => {
            let btn = element.all(by.css("button.btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 3000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            btn.click()
        });

        it("assert create current demand",  () => {
            browser.sleep(1000)
            let expectedUrl = browser.baseUrl + '/demands';
            let EC = browser.ExpectedConditions;

            browser.wait(EC.urlContains(expectedUrl), 5000);
            browser.wait(EC.urlIs(expectedUrl), 5000);
            expect(browser.getCurrentUrl()).toEqual(expectedUrl);
        });
    },

    check_status_order_return: function() {
        it('sign and pay', () => {
            browser.sleep(1000);
            helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 1, 0);
            helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[13]/a", 2, 1);
        });

        it('unchecked is_paid in filter', () => {
            go(page.demands.get);

            for_css.wait_css("#filter_is_paid > label", 5000);
            element(by.css("#filter_is_paid > label")).click();
            element(by.id('filter_all')).click();

            browser.sleep(1000);
            browser.actions().mouseMove(element.all(by.css("button.btn-primary")).get(0), {x: 10, y: 10,}).click().perform();

            element.all(by.css('td.no-wrap > a, td.no-wrap > span')).get(0).getText().then((text) => {
                if ( text === '. . . . . .' ) {
                    browser.sleep(3000)
                }
            });
        });

        it('check success sign', () => {
            for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr/td[13]", 5000);
            browser.sleep(500);

            helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
            helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Оплачена");
        });

        demands_shared.check_data_popup("SERVICE");
        demands_shared.check_data_popup("DDS");
        demands_shared.check_data_popup("DEMANDS");
    },

    check_status_order_service: function() {
        describe('Check order signed and order payed `services`', () => {
            it('sign and pay', () => {
                browser.sleep(1000)
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 1, 0);
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 2, 0);
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[13]/a", 3, 1);
            });

            it('check success sign', () => {
                browser.sleep(1000)

                for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 5000);

                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 3, "Подписана");
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Оплачена");
            });
        });

        demands_shared.check_data_popup("SERVICE");
        demands_shared.check_data_popup("DDS");
        demands_shared.check_data_popup("DEMANDS");
    },



    check_data_popup: function(name) {
        it('Find popup', () => {
            for_css.wait_css(".btn-group .icon-info-sign", 5000);
            current_popup = element.all(by.css(".btn-group i.icon-info-sign")).get(0)
            current_popup.click();
            current_popup.isDisplayed();
        });

        if ( name == "DEMANDS" ){
            it('check DEMANDS document', () => {
                elem = element.all(by.css(".show_entities > a")).get(0);
                for_css.wait_css(".show_entities > a", 5000, 1);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

        if ( name == "SERVICE" ){
            it('check SERVICE document', () => {
                elem = element.all(by.css(".show_entities > a")).get(1);
                for_css.wait_css(".show_entities > a", 5000, 1);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

        if ( name == "DDS" ){
            it('check DDS document', () => {
                elem = element.all(by.css(".show_entities > a")).get(2);
                for_css.wait_css(".show_entities > a", 5000, 2);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/fin_indicators/operations/highlight_operation?operation_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });

        }
    },


    demand_is_distributed: function() {
        it('demand_is_distributed', () => {
            for_css.wait_id('demand_is_distributed', 5000);
            element(by.id('demand_is_distributed')).click();
            expect(element(by.id('demand_is_distributed')).getAttribute('checked')).toBeTruthy();
            for_css.wait_id('create_distribution', 5000);
            element(by.id('create_distribution')).click();
            for_css.wait_id('distribution_share', 5000);
            element(by.id('distribution_share')).sendKeys(1);
            btn.click()
        });
    },
    advance_payment: function() {
        it('is_advanced_payment', () => {
            for_css.wait_id('demand_is_advanced_payment', 5000);
            element(by.id('demand_is_advanced_payment')).click();
            expect(element(by.id('demand_is_advanced_payment')).getAttribute('checked')).toBeTruthy();
            for_css.wait_id('create_payment', 5000);
            element(by.id('create_payment')).click();
            for_css.wait_id('payment_amount', 5000);
            element(by.id('payment_amount')).sendKeys(page.demands.amount);
            let btn = element.all(by.css("#new_demand > div.form-actions > button")).get(0);
            btn.click()
        });
    },

    check_notify_for_demand: function() {
        describe('check notify', () => {
            it('click `delete` in link', () => {
                let notify = element.all(by.css('#queue_regular_payment_notification > span > a'));
                expect(notify.get(0).isPresent()).toBe(true);

                notify.count().then(function (n) {
                    for(let a = 0; a < n; a++){
                        element.all(by.css('#queue_regular_payment_notification > span > a')).get(0).click();
                        browser.sleep(500);
                    }
                    first_notify = element(by.css('#queue_regular_payment_notification > span > a'));
                    first_notify.isPresent() === true ? first_notify.click() : expect(first_notify.isPresent()).toBe(false);
                });
            });
        });
    }

};
