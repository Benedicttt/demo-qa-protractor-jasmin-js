describe('Demands', function () {
    describe('create', function () {
        it('Go to page', function () {
            browser.get("/demands/new");
            browser.getTitle(title_demands)
        })
    });
});