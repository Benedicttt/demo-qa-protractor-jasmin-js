module.exports = {
    buttons: function() {
        it("click Save button",  () => {
            var btn = element.all(by.css("button.btn-primary")).get(0);
            var EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            action(page.services.click_submit)
        });

        it("click accept",  () => {
            var btn = element.all(by.css("button.btn-primary")).get(0);
            var EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            action(page.services.click_submit);
        });

        it("assert create current service",  () => {
            let expectedUrl = browser.baseUrl + '/services';
            let EC = browser.ExpectedConditions;

            browser.wait(EC.urlContains(expectedUrl), 5000);
            browser.wait(EC.urlIs(expectedUrl), 5000);
            expect(browser.getCurrentUrl()).toEqual(expectedUrl);
        });
    },

    service_frame: function() {
        it('service_service_source_id',  () => {
            expect(element(by.id('service_service_source_id')).isDisplayed()).toBeTruthy();
        });

        page.services.us.ids.checkbox.forEach(function (id) {
            let elem = element(by.id(id.toString()));

            it(`ID: ${id}`,  () => {
                elem.click();
                expect(elem.getAttribute('checked')).toBeTruthy();
            });
        });

        page.services.us.ids.inputs.forEach(function (id) {
            let elem = element(by.id(id.toString()));

            it(`ID: ${id}`,  () => {
                if (id.toString() === "service_amount"){
                    elem.clear();
                    elem.sendKeys(page.services.amount);
                    expect(elem.getAttribute('value')).toEqual(page.services.amount.toString());

                } else  {
                    elem.clear();
                    elem.sendKeys(id);
                    expect(elem.getAttribute('value')).toEqual(id.toString());
                }
            });
        });
    }
};