var user = require('../page_object/user.js');

describe('User add full access on admin', function() {
    beforeAll(function () {
        user.authorization(admin)
    });

    it("Find user '/system/users'", function() {
        browser.get('/system/users');
        element.all(by.css('.btn-mini')).get(0).click();
    });

    it('set access in user last', function () {
        element.all(by.css('.action')).each(function (checkbox) {
            if (checkbox.isDisplayed()) {
                checkbox.getAttribute('id').then(function (id) {
                    browser.actions().mouseMove(checkbox).click().perform();

                    elem = element(by.id(id));
                    expect(elem.getAttribute('checked')).toBeTruthy();
                });
            }
        });
        element(by.css("button[type=submit]")).click();
        element(by.css(".btn-primary")).click();
    });

    describe('Check access user', function () {
        beforeAll(function () {
            user.authorization(user_email)
        });

        it('check pages', function () {
        });
    })
});