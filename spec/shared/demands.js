module.exports = {
    buttons: function() {
        it("click Save button",  () => {
            var btn = element.all(by.css("#new_demand > div.form-actions > button")).get(0);
            var EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            btn.click();
            // action(page.demands.click_submit);
        });

        it("click accept",  () => {
            var btn = element.all(by.css("button.btn-primary")).get(0);
            var EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            action(page.demands.click_submit);
        });

        it("assert create current demand",  () => {
            let expectedUrl = browser.baseUrl + '/demands';
            let EC = browser.ExpectedConditions;

            browser.wait(EC.urlContains(expectedUrl), 5000);
            browser.wait(EC.urlIs(expectedUrl), 5000);
            expect(browser.getCurrentUrl()).toEqual(expectedUrl);
        });
    },

    inputs_set: (id) => {
        let elem = element(by.id(id.toString()));

        if (id.toString() === "demand_amount"){
            elem.clear();
            elem.sendKeys(page.demands.amount);
            expect(elem.getAttribute('value')).toEqual(page.demands.amount.toString());
        } else if(id.toString() === "demand_purse_number") {
            elem.clear();
            elem.sendKeys(page.demands.purse_number);
            expect(elem.getAttribute('value')).toEqual(page.demands.purse_number.toString());
        } else if(id.toString() === "demand_refundable_service_id") {
            elem.clear();
            elem.sendKeys(page.demands.number_service);
            expect(elem.getAttribute('value')).toEqual(page.demands.number_service.toString());
        } else {
            elem.clear();
            elem.sendKeys(id.toString());
            expect(elem.getAttribute('value')).toEqual(id.toString());
        }
    },

    returns: function() {
        it('demand_is_payment_on_site',  () => {
            expect(element(by.id('demand_is_payment_on_site')).isDisplayed()).toBeTruthy();
        });

        page.demands.ids.return.selectors.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                tag_selector.click_id_on_option(id.toString(), 3, 2000);
            });
        });

        page.demands.ids.return.checkbox.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                let elem = element(by.id(id.toString()));

                elem.click();
                expect(elem.getAttribute('checked')).toBeTruthy();
            });
        });

        page.demands.ids.return.inputs.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                demands_shared.inputs_set(id);
            });
        });

        // it('is_advanced_payment', () => {
        //     for_css.wait_id('demand_is_advanced_payment', 5000);
        //     element(by.id('demand_is_advanced_payment')).click();
        //     expect(element(by.id('demand_is_advanced_payment')).getAttribute('checked')).toBeTruthy();
        //     for_css.wait_id('create_payment', 5000);
        //     element(by.id('create_payment')).click();
        //     for_css.wait_id('payment_amount', 5000);
        //     element(by.id('payment_amount')).sendKeys(page.demands.amount);
        //     action(page.demands.click_submit);
        // });

        it('fist click button save', () => {
            var btn = element.all(by.css("button.btn-primary")).get(0);

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
            action(page.demands.click_submit)
        });
    },

    services: function() {
        it('demand_is_payment_on_site',  () => {
            expect(element(by.id('demand_is_payment_on_site')).isDisplayed()).toBeTruthy();
        });

        page.demands.ids.service.selectors.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                tag_selector.click_id_on_option(id.toString(), 3, 2000);
            });
        });

        page.demands.ids.service.checkbox.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                let elem = element(by.id(id.toString()));

                elem.click();
                expect(elem.getAttribute('checked')).toBeTruthy();
            });
        });

        page.demands.ids.service.inputs.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                demands_shared.inputs_set(id);
            });
        });

        it('demand_is_distributed', () => {
            for_css.wait_id('demand_is_distributed', 5000);
            element(by.id('demand_is_distributed')).click();
            expect(element(by.id('demand_is_distributed')).getAttribute('checked')).toBeTruthy();
            for_css.wait_id('create_distribution', 5000);
            element(by.id('create_distribution')).click();
            for_css.wait_id('distribution_share', 5000);
            element(by.id('distribution_share')).sendKeys(1);
            action(page.demands.click_submit);
        });

        // it('is_advanced_payment', () => {
        //     for_css.wait_id('demand_is_advanced_payment', 5000);
        //     element(by.id('demand_is_advanced_payment')).click();
        //     expect(element(by.id('demand_is_advanced_payment')).getAttribute('checked')).toBeTruthy();
        //     for_css.wait_id('create_payment', 5000);
        //     element(by.id('create_payment')).click();
        //     for_css.wait_id('payment_amount', 5000);
        //     element(by.id('payment_amount')).sendKeys(page.demands.amount);
        //     action(page.demands.click_submit);
        // });
    }
};