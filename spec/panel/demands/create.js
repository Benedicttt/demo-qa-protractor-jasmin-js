describe('Demands', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    it(`Go to page and check title ${page.demands.title}`,  () => {
        go(page.demands.get);
        expect(browser.getTitle()).toEqual(page.demands.title);
    });

    describe('Create service', () => {
        beforeAll( () => {
            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        describe('Fill form inputs, select, checkbox:', () => {
            // afterAll( () => {
            //     go(page.demands.get);
            //     for_css.wait_css("input[value=is_paid]", 5000);
            //     element(by.css('input[value=is_paid]')).click();
            //     browser.sleep(500);
            //     element(by.css('.btn.btn-primary')).click();
            //
            //     for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 5000);
            //
            //     helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
            //     helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 3, "Подписана");
            //     helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Оплачена");
            // });
            //
            // demands_shared.services();
            // demands_shared.buttons();
            //
            // it('last sign', () => {
            //     helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 1, 0);
            //     helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 2, 0);
            //     helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[13]/a", 3, 1);
            // });

            // it('first sign', () => {
            //     for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 5000);
            //     element.all(by.css('.btn.btn-mini')).get(1).click().then(function () {
            //         for_css.wait_css("#modal form", 5000);
            //         element(by.css('#modal form')).submit();
            //         browser.sleep(1000);
            //     });
            // });
            //
            // it('last sign', () => {
            //     for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 5000);
            //     element.all(by.css('.btn.btn-mini')).get(2).click().then(function () {
            //         browser.sleep(1000);
            //         for_css.wait_css(".modal-footer > button.btn.btn-primary", 4000);
            //         element(by.css(".modal-footer > button.btn.btn-primary")).click();
            //         browser.sleep(1000);
            //     });
            // });
            //
            // it('pay accept', () => {
            //     for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[13]/a", 5000);
            //     element.all(by.css('.btn.btn-mini')).get(3).click().then(function () {
            //         browser.sleep(1000);
            //         for_css.wait_css("#modal form", 8000);
            //         element(by.css('#modal form')).submit();
            //         browser.sleep(1000);
            //         element(by.css('#modal form')).submit();
            //     });
            // });
        });
    });

    //
    describe('Create returned', () => {
        beforeAll( () => {
            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        afterAll( () => {
            go(page.demands.get);
            for_css.wait_css("input[value=is_paid]", 5000);
            element(by.css('input[value=is_paid]')).click();
            browser.sleep(500);
            element(by.css('.btn.btn-primary')).click();

            for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 5000);

            // helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", '', "", true);
            // helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 3, "Подписана");
            // helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Оплачена");
        });


        describe('Fill form inputs, select, checkbox:', () => {
            demands_shared.returns();
            demands_shared.buttons();

            it('last sign', () => {
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 1, 0);
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[13]/a", 2, 1);
            });
        });
    });
});


SELECT status_id FROM
demands_pay_demand( 86,
    54122,
    1765,
    101.0,
    1,
    0.0,
    0,
    0,
    0,
    '2018-09-11'::date,
    0 ) AS status_id)