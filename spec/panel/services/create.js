describe('Services', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    it(`Go to page and check title ${page.services.title}`,  () => {
        go(page.services.get);
            expect(browser.getTitle()).toEqual(page.services.title);
        allure.createStep('ID: ', function () {
        });
    });

    describe('Create service', () => {
        beforeAll( () => {
            go(page.services.new.get);
            expect(browser.getTitle()).toEqual(page.services.new.title);
        });

        describe('Fill form inputs, select, checkbox:', () => {

            services_shared.service_create();
            services_shared.buttons();

            it('sign', () => {
                for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 10000);
                helper.sign_order_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 0, 1);
            });

            it('check success sign', () => {
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
            });

        });
    });
});
