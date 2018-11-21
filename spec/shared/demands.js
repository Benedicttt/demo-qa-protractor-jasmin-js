const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/demands/test_case.yml', 'utf8');
const scenarios_return = yaml.safeLoad(file).demand.return;
const scenarios_service = yaml.safeLoad(file).demand.service;

let file_service = fs.readFileSync('spec/support/service.json');
let services_ids = JSON.parse(file_service).service;
let data = [];

module.exports = {
    run_test_case_service: function (name_case) {
        it(`Go to page and check title ${page.demands.title}`, () => {
            user_object.authorization(helper.user_email_last());

            go(page.demands.get);
            expect(browser.getTitle()).toEqual(page.demands.title);

            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        scenarios_service[`${name_case}`].selector.map(function (id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                browser.sleep(200);
                tag_selector.selectOption(key, value);
            })
        });

        scenarios_service[`${name_case}`].checkbox.map(function (id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            if (Object.values(id)[0] === true) {
                it(`{ checkbox ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click();
                    browser.sleep(100)
                })
            }
        });

        scenarios_service[`${name_case}`].attributes.map(function (attribute) {
            let value = `${Object.values(attribute)[0]}`;
            let key = `${Object.keys(attribute)[0]}`;

            if (key === "add_inventory" && value === 'true') {
                it(`{ input ${key}: ${value} }`, () => {
                    demands_shared.add_inventory()
                });
            }
        });

        scenarios_service[`${name_case}`].input.map(function (id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();

                if (value === 'us') {
                    element(by.id(`${key}`)).sendKeys(helper.created_services("us"))

                } else if (value === 'we') {
                    element(by.id(`${key}`)).sendKeys(services_ids.we.number)

                } else {
                    element(by.id(`${key}`)).sendKeys(`${value}`)

                }
            })
        });

        scenarios_service[`${name_case}`].attributes.map(function (attribute) {
            demands_shared.runner_demand_attr(name_case, attribute, scenarios_service)
        });
    },

    run_test_case_return: function (name_case) {
        it(`Go to page and check title ${page.demands.title}`, () => {
            user_object.authorization(helper.user_email_last());

            go(page.demands.get);
            expect(browser.getTitle()).toEqual(page.demands.title);

            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        scenarios_return[`${name_case}`].selector.map(function (id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ select ${key}: ${value} }`, () => {
                browser.sleep(300);
                tag_selector.selectOption(key, value)
            })
        });

        scenarios_return[`${name_case}`].checkbox.map(function (id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            if (Object.values(id)[0] === true) {
                it(`{ checkbox ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click();
                    browser.sleep(300)
                })
            }
        });

        scenarios_return[`${name_case}`].attributes.map(function (attribute) {
            let value = `${Object.values(attribute)[0]}`;
            let key = `${Object.keys(attribute)[0]}`;

            if (key === "add_inventory" && value === 'true') {
                it(`{ input ${key}: ${value} }`, () => {
                    demands_shared.add_inventory()
                });
            }
        });

        scenarios_return[`${name_case}`].input.map(function (id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;


            it(`{ input ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();

                if (value === 'us') {
                    console.log(`number service: ${helper.created_services("us")}`)

                    element(by.id(`${key}`)).sendKeys(helper.created_services("us"))

                } else if (value === 'we') {
                    console.log(`number service: ${helper.created_services("us")}`)

                    element(by.id(`${key}`)).sendKeys(services_ids.we.number)

                } else {
                    element(by.id(`${key}`)).sendKeys(`${value}`)

                }
            })
        });

        scenarios_return[`${name_case}`].attributes.map(function (attribute) {
            demands_shared.runner_demand_attr(name_case, attribute, scenarios_return)
        });

    },

    runner_demand_attr(name_case, attribute, type = null) {
        let value = `${Object.values(attribute)[0]}`;
        let key = `${Object.keys(attribute)[0]}`;

        it(`{ ${key}: ${value} }`, () => {
            if (key === "advances" && value === 'true') {
                demands_shared.advance_payment()
            }
            if (key === "demand_is_distributed" && value !== 'false') {
                demands_shared.demand_is_distributed(value.split(";"))
            }

            if (key === "click_buttons" && value === 'true') {
                demands_shared.buttons()
            }

            if (key === "check_notify" && value === 'true') {
                demands_shared.check_notify_for_demand()
            }

        });

        if (key === "check_statuses_service" && value === 'true') {
            it('sign amortization', () => {
                scenarios_service[`${name_case}`].attributes.map(function (attribute) {
                    let value = `${Object.values(attribute)[0]}`;
                    let key = `${Object.keys(attribute)[0]}`;

                    //TODO: AMORTIZATION
                    if (key === "add_inventory" && value === 'true') {
                        browser.sleep(1000);
                        for_css.wait_xpath("*//th[@class='span1'][8][contains(text(), \"Услуга\")]/following::*/td[11]/a[@title=\"Задать процент амортизации\"]/i", globalTimeout);
                        element.all(by.xpath("*//th[@class='span1'][8][contains(text(), \"Услуга\")]/following::*/td[11]/a[@title=\"Задать процент амортизации\"]/i")).get(0).click();

                        for_css.wait_xpath("//h3[contains(text(), \"Число периодов амортизации имущества\")]", globalTimeout);
                        element.all(by.css('.btn-primary')).get(0).click();
                        browser.sleep(1000);
                        browser.navigate().refresh();
                    }
                });

            });

            demands_shared.check_status_order(attribute, name_case)
        }

        if(key === "sign_is_distributed" && value === "true") {
            demands_shared.sign_is_distributed(attribute)
        }

        if (key === "check_popup" && value === 'true') {
            helper.check_data_popup(name_case, type);
        }

        if (key === "check_statuses_return" && value === 'true') {
            demands_shared.check_status_order(attribute, name_case)
        }
    },

    //TODO: Add inventory
    add_inventory: function () {
        for_css.wait_id("demand_contractor_type_id", globalTimeout);

        tag_selector.selectOption('demand_contractor_type_id', "--  На имущество");
        tag_selector.selectOption('demand_contractor_id', " Webazilla");

        for_css.wait_id('link_service_properties', globalTimeout);
        element(by.id('link_service_properties')).click();
        browser.sleep(1000);

        for_css.wait_id('service_properties_amount', globalTimeout);
        element(by.id('service_properties_amount')).sendKeys('1');
        element(by.id('service_properties_name')).sendKeys('--  На имущество');
        element.all(by.css('.btn-primary')).get(0).click();
        browser.sleep(200);

        tag_selector.selectOption('demand_contractor_id', " Webazilla")
    },

    //TODO: Base template function for template `run test case`
    buttons: function () {
        browser.executeScript("$('#new_demand > div.form-actions > button')[0].click()");
        browser.sleep(2500);
        browser.executeScript("$('#new_demand > div.form-actions > button')[0].click()");

        let btn_last = element.all(by.css("button.btn-primary")).get(0);
        browser.wait(protractor.ExpectedConditions.visibilityOf(btn_last), globalTimeout);
        browser.wait(EC.elementToBeClickable(btn_last.isEnabled()), globalTimeout);
        btn_last.click();

        browser.sleep(1000);
        let expectedUrl = browser.baseUrl + '/demands';

        browser.wait(EC.urlContains(expectedUrl), globalTimeout);
        browser.wait(EC.urlIs(expectedUrl), globalTimeout);
        expect(browser.getCurrentUrl()).toEqual(expectedUrl);
    },

    sign_is_distributed: function(attribute) {
        let value = `${Object.values(attribute)[0]}`;
        let key = `${Object.keys(attribute)[0]}`;

        if(key === "sign_is_distributed" && value === "true") {
            it('sign service(distributed)', () => {
                let xpath_service = "*//th[@class='span1'][8][contains(text(), 'Услуга')]/following::*/td[11]/a[contains(text(), 'Распределена')]";
                let xpath_btn_in_model = "*//a[@class='btn btn-mini btn-success' and @title='Подписать']/child::*";
                let btn_last = element.all(by.css("button.btn-primary")).get(0);
                let check_xpath = "*//th[@class='span1'][8][contains(text(), 'Услуга')]/../../..//tr[1]//td[11]/a[@class='label label-success' and contains(text(), 'Распределена')]";

                for_css.wait_xpath(xpath_service, globalTimeout);
                element.all(by.xpath(xpath_service)).get(0).click();
                browser.sleep(1500);

                let length_btn_sign = browser.executeScript("return $('a[title=\"Подписать\"].btn-success').length");
                element(by.css("button[data-dismiss=\"modal\"].close")).click();

                length_btn_sign.then((e) => {
                    for (let i = 0; i < e; i++) {
                        for_css.wait_xpath(xpath_service, globalTimeout);
                        element.all(by.xpath(xpath_service)).get(0).click();
                        browser.sleep(1500);

                        for_css.wait_xpath(xpath_btn_in_model, globalTimeout);
                        element.all(by.xpath(xpath_btn_in_model)).get(0).click();

                        browser.wait(protractor.ExpectedConditions.visibilityOf(btn_last), globalTimeout);
                        browser.wait(EC.elementToBeClickable(btn_last.isEnabled()), globalTimeout);
                        btn_last.click();
                        browser.sleep(2000);

                    }
                });

                for_css.wait_xpath(check_xpath, globalTimeout);
                expect(element(by.xpath(check_xpath)).isPresent()).toBeTruthy()

            });

            it('sign demand', () => {
                //TODO: SIGN
                browser.sleep(1000)
                for_css.wait_xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*", globalTimeout)
                let sign_service = element.all(by.xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*")).get(0);
                sign_service.click();

                for_css.wait_xpath("//h3[contains(text(), \"Подпись заявки\")]", globalTimeout);
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
                browser.sleep(1200);

                for_css.wait_xpath('//*[@id="demands"]/tbody/tr[1]/td[13]/a', globalTimeout);
                let icon_paid = element.all(by.xpath("*//th[@class='span1'][10]/a[contains(text(), \"Оплата\")]/following::*/td[13]/a[@title=\"Выставить на оплату\"]/parent::*/a")).get(0);
                icon_paid.click();

                for_css.wait_xpath("//h3[contains(text(), \"Выставление заявки на оплату\")]", globalTimeout);
                element.all(by.css('.btn-primary')).get(0).click();

                for_css.wait_xpath("//td[contains(text(), \"Комиссия:\")]", globalTimeout);
                element.all(by.css('.btn-primary')).get(0).click();
                browser.sleep(1200);

                if (key === "check_statuses_service" && value === 'true') {
                    helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Оплачена");
                }
                if (key === "check_statuses_return" && value === 'true') {
                    helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Оплачена");
                }
            });
        }
    },

    check_status_order: function(attribute) {
        let value = `${Object.values(attribute)[0]}`;
        let key = `${Object.keys(attribute)[0]}`;

        if (key === "check_statuses_service" && value === 'true') {
            //TODO: SERVICE
            it('sign service', () => {
                let xpath_service = "*//th[@class='span1'][8][contains(text(), 'Услуга')]/following::*/td[11]/a[@title='Подписать']/child::*";
                for_css.wait_xpath(xpath_service, globalTimeout);
                element.all(by.xpath(xpath_service)).get(0).click();
                browser.sleep(1000);

                for_css.wait_xpath("//h3[contains(text(), \"Подпись услуги\")]", globalTimeout);
                element.all(by.css('.btn-primary')).get(0).click();
                browser.sleep(1000);
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Подписана");
            });
        }

        it('sign demand', () => {
            //TODO: SIGN
            browser.sleep(1000)
            for_css.wait_xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*", globalTimeout)
            let sign_service = element.all(by.xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/td[12]/a[@title=\"Подписать\"]/child::*")).get(0);
            sign_service.click();

            for_css.wait_xpath("//h3[contains(text(), \"Подпись заявки\")]", globalTimeout);
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
            browser.sleep(1200);

            for_css.wait_xpath('//*[@id="demands"]/tbody/tr[1]/td[13]/a', globalTimeout);
            let icon_paid = element.all(by.xpath("*//th[@class='span1'][10]/a[contains(text(), \"Оплата\")]/following::*/td[13]/a[@title=\"Выставить на оплату\"]/parent::*/a")).get(0);
            icon_paid.click();

            for_css.wait_xpath("//h3[contains(text(), \"Выставление заявки на оплату\")]", globalTimeout);
            element.all(by.css('.btn-primary')).get(0).click();

            for_css.wait_xpath("//td[contains(text(), \"Комиссия:\")]", globalTimeout);
            element.all(by.css('.btn-primary')).get(0).click();
            browser.sleep(1200);

            if (key === "check_statuses_service" && value === 'true') {
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Оплачена");
            }
            if (key === "check_statuses_return" && value === 'true') {
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Оплачена");
            }
        });

    },

    demand_is_distributed: function(arr) {
        for_css.wait_id('demand_is_distributed', globalTimeout);
        element(by.id('demand_is_distributed')).click();

        expect(element(by.id('demand_is_distributed')).getAttribute('checked')).toBeTruthy();

        arr.map(function(e){
            let data_int     = e.split(",")[0];
            let data_project = e.split(",")[1].toString();

            element(by.id('create_distribution')).click();
            for_css.wait_id('distribution_share', globalTimeout);
            browser.sleep(2000);

            tag_selector.selectOption("distribution_project_id", data_project);

            element.all(by.css(".icon-plus-sign")).get(0).click();
            for_css.wait_id("expenditure_name", globalTimeout);
            element(by.id('expenditure_name')).sendKeys(data_project);

            element.all(by.css(".btn-primary")).get(0).click();
            tag_selector.selectOption("distribution_expenditure_id", data_project)

            browser.executeScript(`$('#distribution_share').val(${parseFloat(data_int)})`);

            element.all(by.css(".btn-primary")).get(0).click()

        });

    },

    advance_payment: function() {
        for_css.wait_id('demand_is_advanced_payment', globalTimeout);
        element(by.id('demand_is_advanced_payment')).click();
        expect(element(by.id('demand_is_advanced_payment')).getAttribute('checked')).toBeTruthy();
        for_css.wait_id('create_payment', globalTimeout);
        element(by.id('create_payment')).click();
        for_css.wait_id('payment_amount', globalTimeout);
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

