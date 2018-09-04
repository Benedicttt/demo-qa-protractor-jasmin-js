describe('Demands', function () {
    browser.waitForAngularEnabled(false);

    beforeAll(function () {
        helper.authorization
    });

    describe('create', function () {
        it('Go to page', function () {
            browser.get("/demands/new");
            browser.getTitle(title_demands);
        });
    });
});
