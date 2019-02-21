module.exports = {
    call: function(attribute) {

        let value = `${Object.values(attribute)[0]}`;
        let key = `${Object.keys(attribute)[0]}`;

        if (key === "check_statuses_service" && value === 'true') {
            //TODO: SERVICE
            it('sign service', () => {
                helper.sign_and_paid_xpath(11, '', 'Услуга', 'Подписать').click();
                browser.sleep(1000);

                for_css.wait_xpath("//h3[contains(text(), \"Подпись услуги\")]", globalTimeout);
                element.all(by.css('.btn-primary')).get(0).click();
                browser.sleep(1000);
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Подписана");
            });
        }

        it('sign demand', () => {
            //TODO: SIGN
            browser.sleep(1000);
            helper.sign_and_paid_xpath(12, '/a', 'Подпись', 'Подписать').click();

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
            helper.sign_and_paid_xpath(13, '/a', 'Оплата', 'Выставить на оплату').click();

            for_css.wait_xpath("//h3[contains(text(), \"Выставление заявки на оплату\")]", globalTimeout);
            tag_selector.selectOption("demand_payer_account_id", "Cashier")
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
};