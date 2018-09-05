describe('User add full access on admin', function() {
    beforeAll(function () {
        user_object.authorization(admin)
    });

    it("Find user '/system/users' and go to madoal projects", function() {
        runner(command.page.users);
        element.all(by.css('.icon-list-alt')).get(0).click();
    });

    it("add all projects", function() {
        var until = protractor.ExpectedConditions;
        checkbox = element.all(by.css("label > input.project"));
        browser.wait(until.presenceOf(checkbox), 5000, 'Element taking too long to appear in the DOM');

        checkbox.each(function (box) {
            browser.actions().mouseMove(box, {x: 10, y: 10,}).click().perform();
            expect(box.getAttribute('checked')).toBeTruthy();

        });
        browser.actions().mouseMove(element(by.css("button.btn")), {x: 10, y: 10,}).click().perform();
    });

    it("Add access signature for demands", function () {
        runner(command.page.users);
        element.all(by.css('.btn-mini')).get(0).click();
        element.all(by.css('a.text-success')).get(0).click();
        element(by.id('demands_sign')).click();
        element.all(by.css(".btn.btn-primary")).get(0).click();

        browser.wait(EC.visibilityOf(element.all(by.css("a.btn")).get(0)).call(), 8000, 'Button not visible');
        element.all(by.css("a.btn")).get(0).click();
    });

    it('set access in user last', function () {
        element.all(by.css('.btn-mini')).get(0).click();
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
});