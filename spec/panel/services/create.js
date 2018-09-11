describe('Services', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    afterAll( () => {
        browser.sleep(5000);
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
            services_shared.buttons()
        });
    });
});
