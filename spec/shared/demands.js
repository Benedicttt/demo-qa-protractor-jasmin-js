module.exports = {
    returns: function() {
        it('demand_is_payment_on_site',  () => {
            expect(element(by.id('demand_is_payment_on_site')).isDisplayed()).toBeTruthy();
        });

        page.demands.ids.return.selectors.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                tag_selector.click_id_on_option(id.toString(), 3, 5000);
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
                tag_selector.click_id_on_option(id.toString(), 3, 5000);
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
            elem.sendKeys(helper.last_number_service());
            expect(elem.getAttribute('value')).toEqual(helper.last_number_service().toString());
        } else {
            elem.clear();
            elem.sendKeys(id.toString());
            expect(elem.getAttribute('value')).toEqual(id.toString());
        }
    },

    buttons: function() {
        it("click Save button",  () => {
            var btn = element.all(by.css("#new_demand > div.form-actions > button")).get(0);
            var EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            btn.click();
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

    advance_payment: function() {
        it('is_advanced_payment', () => {
            for_css.wait_id('demand_is_advanced_payment', 5000);
            element(by.id('demand_is_advanced_payment')).click();
            expect(element(by.id('demand_is_advanced_payment')).getAttribute('checked')).toBeTruthy();
            for_css.wait_id('create_payment', 5000);
            element(by.id('create_payment')).click();
            for_css.wait_id('payment_amount', 5000);
            element(by.id('payment_amount')).sendKeys(page.demands.amount);
            action(page.demands.click_submit);
        });
    },

    check_notify_for_demand: function() {
        describe('check notify', () => {
            it('click `delete` in link', () => {
                var notify = element.all(by.css('#queue_regular_payment_notification > span > a'));
                expect(notify.get(0).isPresent()).toBe(true);

                notify.count().then(function (n) {
                    for(var a = 0; a < n; a++){
                        element.all(by.css('#queue_regular_payment_notification > span > a')).get(0).click();
                        browser.sleep(500);
                    }
                    first_notify = element(by.css('#queue_regular_payment_notification > span > a'));
                    first_notify.isPresent() === true ? first_notify.click() : expect(first_notify.isPresent()).toBe(false);
                });
            });
        });
    },

    check_status_order_service: function() {
        describe('Check order signed and order payed `services`', () => {
            it('sign and pay', () => {
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 1, 0);
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 2, 0);
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[13]/a", 3, 1);
            });

            it('check success sign', () => {
                for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 5000);

                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 3, "Подписана");
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 4, "Оплачена");
            });
        });
    },

    check_status_order_returned: function() {
        describe('Check order signed and order payed `returned`', () => {
            it('sign and pay', () => {
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[12]/a[2]", 1, 0);    
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[13]/a", 2, 1);
            });

            it('unchecked is_paid in filter', () => {
                go(page.demands.get);

                for_css.wait_css("#filter_is_paid > label", 5000);
                element(by.css("#filter_is_paid > label")).click();
                element(by.id('filter_all')).click()

                browser.sleep(1000);
                browser.actions().mouseMove(element.all(by.css("button.btn-primary")).get(0), {x: 10, y: 10,}).click().perform();
               
                element.all(by.css('td.no-wrap > a, td.no-wrap > span')).get(0).getText().then((text) => {
                    if ( text === '. . . . . .' ) { 
                        browser.sleep(3000)      
                    }
                });
            });
        });
    },

    check_data_popup: function(name) {
        it('Find popup', () => {
            for_css.wait_css(".btn-group .icon-info-sign", 5000);
            current_popup = element.all(by.css(".btn-group i.icon-info-sign")).get(0)
            current_popup.click();
            current_popup.isDisplayed();
        });

        if ( name == "DEMANDS" ){
            it('check DEMANDS document', () => {
                elem = element.all(by.css(".show_entities > a")).get(1);
                for_css.wait_css(".show_entities > a", 5000, 1);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g)[1];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(page.app_host + query + id);
                })
            });
        }

        if ( name == "SERVICE" ){
            it('check SERVICE document', () => {
                elem = element.all(by.css(".show_entities > a")).get(1);
                for_css.wait_css(".show_entities > a", 5000, 1);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g)[1];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(page.app_host + query + id);
                })
            });
        }

        if ( name == "DDS" ){
            it('check DDS document', () => {
                elem = element.all(by.css(".show_entities > a")).get(2);
                for_css.wait_css(".show_entities > a", 5000, 2);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g)[1];
                    let query = "/fin_indicators/operations/highlight_operation?operation_id=";
                    expect(value).toEqual(page.app_host + query + id);
                })
            });

        }
    }
};
