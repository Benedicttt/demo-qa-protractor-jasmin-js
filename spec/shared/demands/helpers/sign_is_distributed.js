module.exports = {
    call: function(attribute) {
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
    }
};
