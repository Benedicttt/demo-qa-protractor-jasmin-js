module.exports = {
    buttons: function() {
        it("click Save button",  () => {
            let EC = protractor.ExpectedConditions;
            let btn = element(by.css(".form-actions > .btn-primary"));
            
            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), globalTimeout);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), globalTimeout);
            btn.click();

            let btn_nds = element(by.id("repeat-confirm"));
            
            browser.wait(protractor.ExpectedConditions.visibilityOf(btn_nds), globalTimeout);
            browser.wait(EC.elementToBeClickable(btn_nds.isEnabled()), globalTimeout);
            btn_nds.click();

        });

        it("click YES",  () => {
            let btn = element(by.css(".confirm-convertion"));
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), globalTimeout);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), globalTimeout);
            btn.click();
        });

        it("assert create current DDS",  () => {
            let expectedUrl = browser.baseUrl + '/fin_indicators/operations';
            let EC = browser.ExpectedConditions;

            browser.wait(EC.urlContains(expectedUrl), globalTimeout);
            browser.wait(EC.urlIs(expectedUrl), globalTimeout);
            expect(browser.getCurrentUrl()).toEqual(expectedUrl);
        });
    },

    fill_data: function() {
        page.conversion.ids.selectors.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                if (id == "money_transfer_receiver_account_id" || id == "money_transfer_sender_account_id") {
                    tag_selector.click_id_on_option(id.toString(), 0, globalTimeout);
                } else {
                    tag_selector.click_id_on_option(id.toString(), 2, globalTimeout);
                }
            });
        });

        page.conversion.ids.checkboxes.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                let elem = element(by.id(id.toString()));

                elem.click();
                expect(elem.getAttribute('checked')).toBeTruthy();
            });
        });

        page.conversion.ids.inputs.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                let elem = element(by.id(id.toString()));

                elem.clear();
                elem.sendKeys(page.conversion.amount);
                expect(elem.getAttribute('value')).toEqual(`${page.conversion.amount}`);

                summ = parseInt(page.conversion.amount) / 10
                id === "money_transfer_commission" ? (elem.clear(), elem.sendKeys(summ)) : '' 
            });
        });
    },

    fill_data_nds: function() {
        it(`click conversion_is_nds`,  () => {
            element(by.id('money_transfer_is_nds')).click();
            expect(elem.getAttribute('checked')).toBeTruthy();
        });
 
        it(`fill conversion_is_nds`,  () => {
            page.conversion.ids.selectors_nds.forEach(function (id) {
                it(`ID: ${id}`,  () => {
                    tag_selector.click_id_on_option(id.toString(), 2, globalTimeout);
                });
            });

            let input_amount = element(by.id('money_transfer_nds_amount'));

            input_amount.clear();
            input_amount.sendKeys("15.25555");
            expect(input_amount.getAttribute('value')).toEqual("15.25555");
        });

        it(`ID: conversion_nds_is_rendered_during_period`,  () => {
            let elem = element(by.id('money_transfer_nds_is_rendered_during_period'));
            elem.click();
            expect(elem.getAttribute('checked')).toBeTruthy();
        });
    },

    click_popup_info: function() {
        it('Find popup', () => {
            for_css.wait_css(".btn-group .icon-info-sign", globalTimeout);
            let current_popup = element.all(by.css(".btn-group i.icon-info-sign")).get(0)
            current_popup.click();
            current_popup.isDisplayed();
            for_css.wait_css(".popover-title", globalTimeout, 0)
            browser.sleep(3000)

        });
    },

    check_data_popup: function(name, index_name = null) {
        if ( name === "SERVICE" ){
            it('check SERVICE document', () => {

                let elem = element.all(by.css(".show_entities > a"));

                index_name == null ? for_css.wait_css(".show_entities > a", globalTimeout, 0) : for_css.wait_css(".show_entities > a", globalTimeout, index_name)
                index_name == null ? find_elem = elem.get(0) : find_elem = elem.get(index_name)

                find_elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

        if ( name === "DDS" ){
            it('check DDS document', () => {
                let elem = element.all(by.css(".show_entities > a"));

                index_name == null ? for_css.wait_css(".show_entities > a", globalTimeout, 0) : for_css.wait_css(".show_entities > a", globalTimeout, index_name)
                index_name == null ? find_elem = elem.get(0) : find_elem = elem.get(index_name) 

                find_elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/fin_indicators/operations/highlight_operation?operation_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

        if ( name === "DDS COMMISION" ){
            it('check DDS document for commision', () => {
                let elem = element.all(by.css(".show_entities > a"));

                index_name == null ? for_css.wait_css(".show_entities > a", globalTimeout, 2) : for_css.wait_css(".show_entities > a", globalTimeout, index_name)
                index_name == null ? find_elem = elem.get(2) : find_elem = elem.get(index_name) 

                find_elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/fin_indicators/operations/highlight_operation?operation_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

        if ( name === "NDS" && index_name === "we" ){
            it('check NDS document WE', () => {
                let elem = element.all(by.css(".show_entities > a")).get(4);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

        if ( name === "NDS" && index_name === "us" ){
            it('check NDS document US', () => {
                let elem = element.all(by.css(".show_entities > a")).get(3);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g).slice(-1)[0];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(browser.baseUrl + query + id);
                })
            });
        }

    },
};