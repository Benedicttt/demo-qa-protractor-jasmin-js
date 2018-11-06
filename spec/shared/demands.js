const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/demands/test_case.yml', 'utf8')
const scenarios = yaml.safeLoad(file).demand;

let file_service = fs.readFileSync('spec/support/service.json')
let services_ids = JSON.parse(file_service).service

let yourGlobalVariable;

module.exports = {
    run_test_case_service: function(name_case) {
        it(`Go to page and check title ${page.demands.title}`,  () => {
            user_object.authorization(helper.user_email_last());

            go(page.demands.get);
            expect(browser.getTitle()).toEqual(page.demands.title);

            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        scenarios.service[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                tag_selector.selectOption(key, value)
            })
        });

        scenarios.service[`${name_case}`].checkbox.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            if (Object.values(id)[0] === true) {
                it(`{ checkbox ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click();
                    browser.sleep(100)
                })
            }
        });

        scenarios.service[`${name_case}`].input.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();

                if ( value === 'us') {
                    element(by.id(`${key}`)).sendKeys(helper.created_services("us"))

                } else if ( value === 'we') {
                    element(by.id(`${key}`)).sendKeys(services_ids.we.number)

                } else {
                    element(by.id(`${key}`)).sendKeys(`${value}`)

                }
            })
        });

        scenarios.service[`${name_case}`].attributes.map(function(attribute){
            demands_shared.runner_demand_attr(name_case, attribute)
        });
    },

    run_test_case_return: function(name_case) {
        it(`Go to page and check title ${page.demands.title}`,  () => {
            user_object.authorization(helper.user_email_last());

            go(page.demands.get);
            expect(browser.getTitle()).toEqual(page.demands.title);

            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        scenarios.return[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ select ${key}: ${value} }`, () => {
                tag_selector.selectOption(key, value)
            })
        });

        scenarios.return[`${name_case}`].checkbox.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            if (Object.values(id)[0] === true) {
                it(`{ checkbox ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click();
                    browser.sleep(100)
                })
            }
        });

        scenarios.return[`${name_case}`].input.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;


            it(`{ input ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();

                if ( value === 'us') {
                    console.log(`number service: ${helper.created_services("us")}`)

                    element(by.id(`${key}`)).sendKeys(helper.created_services("us"))

                } else if ( value === 'we') {
                    console.log(`number service: ${helper.created_services("us")}`)

                    element(by.id(`${key}`)).sendKeys(services_ids.we.number)

                } else {
                    element(by.id(`${key}`)).sendKeys(`${value}`)

                }
            })
        });

        scenarios.return[`${name_case}`].attributes.map(function(attribute){
            demands_shared.runner_demand_attr(name_case, attribute)
        });
    },

    runner_demand_attr(name_case, attribute) {
        let value = `${Object.values(attribute)[0]}`;
        let key = `${Object.keys(attribute)[0]}`;

        it(`{ ${key}: ${value} }`, () => {
            if (key === "advances" && value === 'true') {
                demands_shared.advance_payment()
            }
            if (key === "demand_is_distributed" && value === 'true') {
                demands_shared.demand_is_distributed()
            }
            if (key === "add_inventory" && value === 'true') {
                demands_shared.add_inventory()
            }

            if (key === "click_buttons" && value === 'true') {
                demands_shared.buttons()
            }

            if (key === "check_notify" && value === 'true') {
                demands_shared.check_notify_for_demand()
            }

            if (key === "check_popup" && value === 'true') {
                for_css.wait_css(".btn-group .icon-info-sign", 5000);
                current_popup = element.all(by.css(".btn-group i.icon-info-sign")).get(0)
                current_popup.click();
                current_popup.isDisplayed();
                demands_shared.check_data_popup("SERVICE");
                demands_shared.check_data_popup("DDS");
                demands_shared.check_data_popup("DEMANDS");
            }
        });

        if (key === "check_statuses_service" && value === 'true') {
            it('sign amortization', () => {
                scenarios.service[`${name_case}`].attributes.map(function(attribute) {
                    let value = `${Object.values(attribute)[0]}`;
                    let key = `${Object.keys(attribute)[0]}`;

                    //TODO: AMORTIZATION
                    if (key === "add_inventory" && value === 'true') {
                        browser.sleep(1000);
                        for_css.wait_xpath("*//th[@class='span1'][8][contains(text(), \"Услуга\")]/following::*/td[11]/a[@title=\"Задать процент амортизации\"]/i", 3000)
                        element.all(by.xpath("*//th[@class='span1'][8][contains(text(), \"Услуга\")]/following::*/td[11]/a[@title=\"Задать процент амортизации\"]/i")).get(0).click();

                        for_css.wait_xpath("//h3[contains(text(), \"Число периодов амортизации имущества\")]", 5000)
                        element.all(by.css('.btn-primary')).get(0).click()
                        browser.sleep(1000)
                        browser.navigate().refresh();
                    }
                });

            });

            demands_shared.check_status_order(attribute)
        }

        if (key === "check_statuses_return" && value === 'true') {
            demands_shared.check_status_order(attribute)
        }
    },

    //TODO: Add inventory
    add_inventory: function() {
        tag_selector.selectOption('demand_contractor_type_id', "--  На имущество")
        tag_selector.selectOption('demand_contractor_id', " Webazilla")

        for_css.wait_id('link_service_properties', 3000);
        element(by.id('link_service_properties')).click();

        for_css.wait_id('service_properties_amount', 3000);
        element(by.id('service_properties_amount')).sendKeys('1');
        element(by.id('service_properties_name')).sendKeys('--  На имущество');
        element.all(by.css('.btn-primary')).get(0).click();

        tag_selector.selectOption('demand_contractor_id', " Webazilla")
    },

    //TODO: Base template function for template `run test case`
    buttons: function() {
        browser.executeScript("$('#new_demand > div.form-actions > button')[0].click()")
        browser.sleep(3000);
        browser.executeScript("$('#new_demand > div.form-actions > button')[0].click()")

        let btn_last = element.all(by.css("button.btn-primary")).get(0);
        browser.wait(protractor.ExpectedConditions.visibilityOf(btn_last), 3000);
        browser.wait(EC.elementToBeClickable(btn_last.isEnabled()), 5000);
        btn_last.click()

        browser.sleep(1000)
        let expectedUrl = browser.baseUrl + '/demands';

        browser.wait(EC.urlContains(expectedUrl), 5000);
        browser.wait(EC.urlIs(expectedUrl), 5000);
        expect(browser.getCurrentUrl()).toEqual(expectedUrl);
    },

    check_status_order: function(attribute) {
        let value = `${Object.values(attribute)[0]}`;
        let key = `${Object.keys(attribute)[0]}`;

        if (key === "check_statuses_service" && value === 'true') {
            //TODO: SERVICE
            it('sign service', () => {
                let xpath_service = "*//th[@class='span1'][8][contains(text(), \"Услуга\")]/following::*/td[11]/a[@title=\"Подписать\"]/child::*";
                for_css.wait_xpath(xpath_service, 3000);
                element.all(by.xpath(xpath_service)).get(0).click();
                browser.sleep(1000);

                for_css.wait_xpath("//h3[contains(text(), \"Подпись услуги\")]", 5000);
                element.all(by.css('.btn-primary')).get(0).click();
                browser.sleep(1000);
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Подписана");
            });

        }

        it('sign demand', () => {
            //TODO: SIGN
            browser.sleep(1000)
            for_css.wait_xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*", 3000)
            let sign_service = element.all(by.xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*")).get(0);
            sign_service.click();

            for_css.wait_xpath("//h3[contains(text(), \"Подпись заявки\")]", 5000);
            element.all(by.css('.btn-primary')).get(0).click();
            browser.sleep(1000)

            if (key === "check_statuses_service" && value === 'true') {
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Подписана");
            }
            if (key === "check_statuses_return" && value === 'true') {
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Подписана");
            }
        });

        it('paid', () => {
            //TODO: PAID
            browser.sleep(1200)

            for_css.wait_xpath('//*[@id="demands"]/tbody/tr[1]/td[13]/a', 3000)
            let icon_paid = element.all(by.xpath("*//th[@class='span1'][10]/a[contains(text(), \"Оплата\")]/following::*/td[13]/a[@title=\"Выставить на оплату\"]/parent::*/a")).get(0)
            icon_paid.click()
            for_css.wait_xpath("//h3[contains(text(), \"Выставление заявки на оплату\")]", 5000)
            element.all(by.css('.btn-primary')).get(0).click();

            for_css.wait_xpath("//td[contains(text(), \"Комиссия:\")]", 5000)
            element.all(by.css('.btn-primary')).get(0).click();
            browser.sleep(1200)

            if (key === "check_statuses_service" && value === 'true') {
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Оплачена");
            }
            if (key === "check_statuses_return" && value === 'true') {
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Оплачена");
            }
        });

    },

    check_data_popup: function(name) {

        if ( name === "DEMANDS" ){
            browser.sleep(1500)

            let elem = element.all(by.css(".show_entities > a")).get(0);
            for_css.wait_css(".show_entities > a", 5000, 1);

            elem.getAttribute('href').then(function (value) {
                let id = value.match(/\d+/g).slice(-1)[0];
                let query = "/demands/highlight_demand?demand_id=";
                expect(value).toEqual(browser.baseUrl + query + id);
            })
        }

        if ( name === "SERVICE" ){
            let elem = element.all(by.css(".show_entities > a")).get(1);
            for_css.wait_css(".show_entities > a", 5000, 1);

            elem.getAttribute('href').then(function (value) {
                let id = value.match(/\d+/g).slice(-1)[0];
                let query = "/services/highlight_service?service_id=";
                expect(value).toEqual(browser.baseUrl + query + id);
            })
        }

        if ( name === "DDS" ){
            let elem = element.all(by.css(".show_entities > a")).get(2);
            for_css.wait_css(".show_entities > a", 5000, 2);

            elem.getAttribute('href').then(function (value) {
                let id = value.match(/\d+/g).slice(-1)[0];
                let query = "/fin_indicators/operations/highlight_operation?operation_id=";
                expect(value).toEqual(browser.baseUrl + query + id);
            })
        }
    },

    demand_is_distributed: function() {
        for_css.wait_id('demand_is_distributed', 5000);
        element(by.id('demand_is_distributed')).click();

        expect(element(by.id('demand_is_distributed')).getAttribute('checked')).toBeTruthy();

        for_css.wait_id('create_distribution', 5000);
        element(by.id('create_distribution')).click();
        for_css.wait_id('distribution_share', 5000);
        element(by.id('distribution_share')).sendKeys(1);
        element.all(by.css(".btn-primary")).get(0).click()

    },
    advance_payment: function() {
        for_css.wait_id('demand_is_advanced_payment', 5000);
        element(by.id('demand_is_advanced_payment')).click();
        expect(element(by.id('demand_is_advanced_payment')).getAttribute('checked')).toBeTruthy();
        for_css.wait_id('create_payment', 5000);
        element(by.id('create_payment')).click();
        for_css.wait_id('payment_amount', 5000);
        element(by.id('payment_amount')).sendKeys(101);

        element.all(by.css(".btn-primary")).get(0).click()
    },

    check_notify_for_demand: function() {
        browser.sleep(1000)
        let notify = element.all(by.css('#queue_regular_payment_notification > span > a'));
        expect(notify.get(0).isPresent()).toBe(true);

        notify.count().then(function (n) {
            for(let a = 0; a < n; a++){
                element.all(by.css('#queue_regular_payment_notification > span > a')).get(0).click();
                browser.sleep(500);
            }
            let first_notify = element(by.css('#queue_regular_payment_notification > span > a'));
            first_notify.isPresent() === true ? first_notify.click() : expect(first_notify.isPresent()).toBe(false);
        });
    }
};

