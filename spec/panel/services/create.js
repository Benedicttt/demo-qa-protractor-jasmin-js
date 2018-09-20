describe('Services', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    it(`Go to page and check title ${page.services.title}`,  () => {
        go(page.services.get);
        expect(browser.getTitle()).toEqual(page.services.title);
    });

    describe('Create service', () => {
        describe('Fill form inputs for US, select, checkbox:', () => {

            beforeAll( () => {
                go(page.services.new.get);
                expect(browser.getTitle()).toEqual(page.services.new.title);
            });

            afterAll( () => {
                for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[1]", 5000);
                element(by.xpath("//*[@id=\"services\"]/tbody/tr[1]/td[1]")).getText().then(function (text) {
                    let data = `{ "service": { "us": { "number": ${text} }, "we": { "number": ${parseInt(text) + 1 } } } }`;
                    helper.write_in_file('service.json', data)
                });
            });

            services_shared.create(0); //0 - we, 1 - us
            services_shared.buttons();

            it('sign', () => {
                for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 10000);
                helper.sign_order_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 0, 1);
            });

            it('check success sign', () => {
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
            });
        });

        describe('Fill form inputs for WE, select, checkbox:', () => {

            beforeAll( () => {
                go(page.services.new.get);
                expect(browser.getTitle()).toEqual(page.services.new.title);
            });

            services_shared.create(1); //0 - we, 1 - us
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
