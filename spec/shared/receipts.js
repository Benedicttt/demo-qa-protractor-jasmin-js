module.exports = {
    buttons: function() {
        it("click Save button",  () => {

            let EC = protractor.ExpectedConditions;
            let btn = element.all(by.css("#new_receipt > div.form-actions > button")).get(0);
            
            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            btn.click();
        });

        it("click accept NDS",  () => {
            let btn = element(by.css("#repeat-confirm"));
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            btn.click();
        });

        it("click YES",  () => {
            let btn = element.all(by.css(".btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 5000);
            btn.click();
        });

        it("assert create current DDS",  () => {
            let expectedUrl = browser.baseUrl + '/fin_indicators/operations';
            let EC = browser.ExpectedConditions;

            browser.wait(EC.urlContains(expectedUrl), 5000);
            browser.wait(EC.urlIs(expectedUrl), 5000);
            expect(browser.getCurrentUrl()).toEqual(expectedUrl);
        });
    },

    fill_data: function() {
        page.receipts.ids.selectors.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                if (id == "receipt_account_id"){
                    tag_selector.click_id_on_option(id.toString(), 0, 5000);
                } else {
                    tag_selector.click_id_on_option(id.toString(), 3, 5000);
                }
            });
        });

        page.receipts.ids.checkboxes.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                let elem = element(by.id(id.toString()));

                elem.click();
                expect(elem.getAttribute('checked')).toBeTruthy();
            });
        });

        page.receipts.ids.inputs.forEach(function (id) {
            it(`ID: ${id}`,  () => {
                let elem = element(by.id(id.toString()));

                elem.clear();
                elem.sendKeys("101");
                expect(elem.getAttribute('value')).toEqual("101");
            });
        });
    },

     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! - точка входы в дермище
    fill_data_return: function() {
        it(`click receipt_is_refund`,  () => {
            element(by.id('receipt_is_refund')).click();
            expect(elem.getAttribute('checked')).toBeTruthy();
        });
 
        it(`fill receipt_is_refund`,  () => {
            elem = element(by.id('receipt_refundable_service_id'))
            elem.clear();
            elem.sendKeys(helper.first_number_service())

            let elm = element(by.id('refund_service_contractor_type_id'));
            let EC = protractor.ExpectedConditions;
            browser.wait(EC.invisibilityOf(elm), 5000);

            element(by.css('.btn-primary')).click();
        });
     },

     fill_data_nds: function() {
        it(`click receipt_is_nds`,  () => {
            element(by.id('receipt_is_nds')).click();
            expect(elem.getAttribute('checked')).toBeTruthy();
        });
 
        it(`fill receipt_is_nds`,  () => {
            page.receipts.ids.selectors_nds.forEach(function (id) {
                it(`ID: ${id}`,  () => {
                    tag_selector.click_id_on_option(id.toString(), 2, 5000);
                });
            });

            let input_amount = element(by.id('receipt_nds_amount'));

            input_amount.clear();
            input_amount.sendKeys("15.25555");
            expect(input_amount.getAttribute('value')).toEqual("15.25555");
        });

        it(`ID: receipt_nds_is_rendered_during_period`,  () => {
            let elem = element(by.id('receipt_nds_is_rendered_during_period'));
            elem.click();
            expect(elem.getAttribute('checked')).toBeTruthy();
        });
    },

    click_popup_info: function() {
        it('Find popup', () => {
            for_css.wait_css(".btn-group .icon-info-sign", 5000);
            current_popup = element.all(by.css(".btn-group i.icon-info-sign")).get(0)
            current_popup.click();
            current_popup.isDisplayed();
        });
    },

    check_data_popup: function(name, index_name = null) {
        if ( name == "SERVICE" ){
            it('check SERVICE document', () => {
                browser.sleep(1500)
                let elem = element.all(by.css(".show_entities > a")).get(0);
                for_css.wait_css(".show_entities > a", 5000, 0);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g)[1];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(page.app_host + query + id);
                })
            });
        }

        if ( name == "DDS" ){
            it('check DDS document', () => {
                browser.sleep(1500)
                let elem = element.all(by.css(".show_entities > a"));

                index_name == null ? for_css.wait_css(".show_entities > a", 5000, 1) : for_css.wait_css(".show_entities > a", 5000, index_name)
                index_name == null ? find_elem = elem.get(1) : find_elem = elem.get(index_name) 

                find_elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g)[1];
                    let query = "/fin_indicators/operations/highlight_operation?operation_id=";
                    expect(value).toEqual(page.app_host + query + id);
                })
            });
        }

        if ( name === "NDS" && index_name === "we" ){
            it('check NDS document WE', () => {
                browser.sleep(1500)
                let elem = element.all(by.css(".show_entities > a")).get(2);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g)[1];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(page.app_host + query + id);
                })
            });
        }

        if ( name === "NDS" && index_name === "us" ){
            it('check NDS document US', () => {
                browser.sleep(1500)
                let elem = element.all(by.css(".show_entities > a")).get(3);

                elem.getAttribute('href').then(function (value) {
                    let id = value.match(/\d+/g)[1];
                    let query = "/services/highlight_service?service_id=";
                    expect(value).toEqual(page.app_host + query + id);
                })
            });
        }

    },
};