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
            demands_shared.services();
            demands_shared.buttons();

            it('sign and pay', () => {
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 1, 0);
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 2, 0);
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[13]/a", 3, 1);
            });

            it('check success sign', () => {
                go(page.demands.get);
                for_css.wait_css("input[value=is_paid]", 5000);
                element(by.css('input[value=is_paid]')).click();
                browser.sleep(500);
                element(by.css('.btn.btn-primary')).click();
                for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 10000);

                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 3, "Подписана");
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Оплачена");
            });
        });
    });

    describe('Create returned', () => {
        beforeAll( () => {
            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        describe('Fill form inputs, select, checkbox:', () => {
            demands_shared.returns();
            demands_shared.buttons();

            it('sign and pay', () => {
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 1, 0);
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[13]/a", 2, 1);
            });

            it('check success sign', () => {
                go(page.demands.get);
                for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 5000);

                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Подписана");
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 3, "Оплачена");
            });
        });
    });
});
