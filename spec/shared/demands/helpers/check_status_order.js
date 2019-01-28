module.exports = {
    call: function(attribute) {
        let value = `${Object.values(attribute)[0]}`;
        let key = `${Object.keys(attribute)[0]}`;

        if (key === "check_statuses_service" && value === 'true') {
            //TODO: SERVICE
            it('sign service', () => {
                let xpath_service = "*//th[@class='span1'][8][contains(text(), 'Услуга')]/following::*/tr[1]/td[11]/a[@title='Подписать']/child::*";

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

            let sign_service = element.all(by.xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/tr[1]/td[12]/a[@title=\"Подписать\"]/child::*")).get(0);

            for_css.wait_xpath("*//th[@class='span1'][9]/a[contains(text(), \"Подпись\")]/following::*/tr[1]/td[12]/a[@title=\"Подписать\"]/child::*", globalTimeout)
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
            let icon_paid = element.all(by.xpath("*//th[@class='span1'][10]/a[contains(text(), \"Оплата\")]/following::*/tr[1]/td[13]/a[@title=\"Выставить на оплату\"]/parent::*/a")).get(0);

            for_css.wait_xpath(icon_paid, globalTimeout);
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
};