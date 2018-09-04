var user = require('../../../user.json');

describe('Demands', function () {
    browser.waitForAngularEnabled(false);

    beforeAll(function () {
        helper.addCookie;
        browser.get("/demands/new");

    });

    describe('create', function () {
        it('Go to page', function () {
            browser.getTitle(title_demands);
        });

    });
});

