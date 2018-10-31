describe('Services new', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    it(`Go to page and check title ${page.services.title}`,  () => {
        go(page.services.get);
        expect(browser.getTitle()).toEqual(page.services.title);

        go(page.services.new.get);
        expect(browser.getTitle()).toEqual(page.services.new.title);
    });

    describe('Fill form inputs for type WE:', () => {
        services_shared.run_test_case("base_we")
    });
});
