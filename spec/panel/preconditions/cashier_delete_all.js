describe('Add cashier to Admin project', () => {

    it(`Go to page and check title ${page.references.title}`,  () => {
        user_object.authorization(helper.user_email_last());

        go(page.references.get);
        expect(browser.getTitle()).toEqual(page.references.title);
    });

    it(`Delete all cashier`,  () => {

    });

});
