describe('User add full access on admin', function() {
    beforeAll(function () {
        user_object.authorization(admin);
        go(page.users.get);
        expect(browser.getTitle()).toEqual(page.users.title);
    });

    it('set access in user last', function () {
        xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" + helper.user_email_last().toLowerCase() + "\")]/..//i[@class=\'icon-lock\']"
        btn_mini = element(by.xpath(xpath))
        btn_mini.click()

        browser.executeScript("$('.action').click()")

        element.all(by.css('.action')).each(function (checkbox) {
            if (checkbox.isDisplayed()) {
                checkbox.getAttribute('id').then(function (id) {
                    elem = element(by.id(id));
                    expect(elem.getAttribute('checked')).toBeTruthy();
                });
            }
        });
    });

    it("click accept",  () => {
        btn = element(by.css("button.btn-primary"));
        btn.click();
    });

    it("Find user '/system/users' and (go to modal/add) projects", function() {
        go(page.users.get);
        browser.sleep(500)
        xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" + helper.user_email_last().toLowerCase() + "\")]/..//i[@class=\'icon-list-alt\']"
        icon_list_alt = element(by.xpath(xpath))
        icon_list_alt.click()
    });

    it("add all projects", function() {
        let until = protractor.ExpectedConditions;
        let checkbox = element.all(by.css("label > input.project"));

        browser.wait(until.presenceOf(checkbox), globalTimeout, 'Element taking too long to appear in the DOM');
        checkbox.each(function (box) {
            browser.actions().mouseMove(box, {x: 10, y: 10,}).click().perform();
            expect(box.getAttribute('checked')).toBeTruthy();

        });
        browser.actions().mouseMove(element.all(by.css("button.btn")).get(1), {x: 10, y: 10,}).click().perform();
    });

    it("Add access signature for demands", function () {
        go(page.users.get);
        xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" + helper.user_email_last().toLowerCase() + "\")]/..//i[@class=\'icon-lock\']"
        btn_mini = element(by.xpath(xpath))
        btn_mini.click()

        for_css.wait_css('a.text-success', globalTimeout)
        element.all(by.css('a.text-success')).get(0).click();
        element(by.id('demands_sign')).click();
        element.all(by.css(".btn.btn-primary")).get(0).click();

        browser.wait(EC.visibilityOf(element.all(by.css("a.btn")).get(0)).call(), 8000, 'Button not visible');
        element.all(by.css("a.btn")).get(0).click();
    });
});