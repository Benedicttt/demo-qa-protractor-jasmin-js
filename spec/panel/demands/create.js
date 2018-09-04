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

    describe('create', function () {
        it('Go to page1', function () {
            helper.addCookie;
            browser.get("/demands/new");

            browser.getTitle(title_demands);
        });
    });
    describe('create', function () {
        it('Go to page3', function () {
            helper.addCookie;
            browser.get("/demands/new");

            browser.getTitle(title_demands);
        });
    });

});
