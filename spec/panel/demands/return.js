describe('Demands, create new, type `returned`', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    it(`Go to page and check title ${page.demands.title}`,  () => {
        go(page.demands.get);
        expect(browser.getTitle()).toEqual(page.demands.title);

        go(page.demands.new.get);
        expect(browser.getTitle()).toEqual(page.demands.new.title);
    });

    describe('Fill form inputs, select, checkbox:', () => {
        demands_shared.run_test_case_return("case_1")
    });
});
