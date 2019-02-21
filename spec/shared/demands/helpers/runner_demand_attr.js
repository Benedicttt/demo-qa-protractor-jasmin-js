const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/demands/test_case.yml', 'utf8');

let advance_payment         = require('./advance_payment.js');
let add_inventory           = require('./add_inventory.js');
let is_distributed          = require('./is_distributed.js');
let buttons                 = require('./click_main_btn.js');
let check_notify_for_demand = require('./check_notify_for_demand.js');
let check_status_order      = require('./check_status_order.js');
let sign_is_distributed     = require('./sign_is_distributed.js');

const scenarios_service = yaml.safeLoad(file).demand.service;

module.exports = {
    runner_demand_attr(name_case, attribute, type = null) {
        let value = `${Object.values(attribute)[0]}`;
        let key = `${Object.keys(attribute)[0]}`;

        it(`{ ${key}: ${value} }`, () => {
            if (key === "advances" && value === 'true') {
                advance_payment.call()
            }
            if (key === "demand_is_distributed" && value !== 'false') {
                is_distributed.call(value.split(";"))
            }

            if (key === "click_buttons" && value === 'true') {
                buttons.call()
            }

            if (key === "check_notify" && value === 'true') {
                check_notify_for_demand.call()
            }

        });

        if (key === "check_statuses_service" && value === 'true') {
            it('sign amortization', () => {
                scenarios_service[`${name_case}`].attributes.map(function (attribute) {
                    let value = `${Object.values(attribute)[0]}`;
                    let key = `${Object.keys(attribute)[0]}`;

                    //TODO: AMORTIZATION
                    if (key === "add_inventory" && value === 'true') {
                        browser.sleep(500);
                        helper.sign_and_paid_xpath(11, '', 'Услуга', 'Задать процент амортизации').click();

                        for_css.wait_xpath("//h3[contains(text(), \"Число периодов амортизации имущества\")]", globalTimeout);
                        element.all(by.css('.btn-primary')).get(0).click();
                        browser.sleep(1000);
                        browser.navigate().refresh();
                    }
                });

            });

            check_status_order.call(attribute, name_case)
        }

        if (key === "sign_is_distributed" && value === "true") {
            sign_is_distributed.call(attribute)
        }

        if (key === "check_popup" && value === 'true') {
            helper.check_data_popup(name_case, type);
        }

        if (key === "check_statuses_return" && value === 'true') {
            check_status_order.call(attribute, name_case)
        }
    }
}