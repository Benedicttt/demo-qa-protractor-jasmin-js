describe('Demands', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
        browser.driver.manage().window().maximize();
    });

    it(`Go to page and check title ${page.demands.title}`,  () => {
        go(page.demands.get);
        expect(browser.getTitle()).toEqual(page.demands.title);
    });

    describe('Create returned', () => {
        describe('Fill form inputs, select, checkbox:', () => {
            beforeAll( () => {
                go(page.demands.new.get);
                expect(browser.getTitle()).toEqual(page.demands.new.title);
            });
    
            demands_shared.returns();
            demands_shared.buttons();
            demands_shared.check_status_order_returned();

            it('check success sign', () => {
                for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr/td[13]", 5000);
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Оплачена");
            });

            demands_shared.check_data_popup("SERVICE");
            demands_shared.check_data_popup("DDS");
            demands_shared.check_data_popup("DEMANDS");
        });
    });

    describe('Create return with advance_payment.', () => {
        describe('Fill form inputs, select, checkbox:', () => {
            beforeAll( () => {
                go(page.demands.new.get);
                expect(browser.getTitle()).toEqual(page.demands.new.title);
            });
            
            demands_shared.returns();
            demands_shared.advance_payment();
            demands_shared.buttons();
            demands_shared.check_status_order_returned();
            demands_shared.check_notify_for_demand();

            it('check success sign', () => {
                for_css.wait_xpath("//*[@id=\"demands\"]/tbody/tr/td[13]", 5000);
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 1, "Оплачена");
            });

            demands_shared.check_data_popup("SERVICE");
            demands_shared.check_data_popup("DDS");
            demands_shared.check_data_popup("DEMANDS");
        });
    });

    describe('Copy return demand', () => {
        describe('Click btn copy and check', () => {
            beforeAll( () => {
                go(page.demands.get);
            });
            
            it('copy return document', () => {
                for_css.wait_css("#filter_is_paid > label", 5000);
                element(by.css("#filter_is_paid > label")).click();
     
                for_css.wait_css('.icon-file', 5000)
                element.all(by.css('.icon-file')).get(0).click()
                for_css.wait_id('demand_is_refund', 5000)

                expect(element(by.id('demand_is_refund')).getAttribute('checked')).toBeTruthy();
                element(by.id('demand_is_refund')).click()
                
                expect(element(by.id('demand_is_refund')).getAttribute('checked')).toBeFalsy();
                element(by.id('demand_is_refund')).click()

                elem = element(by.id('demand_refundable_service_id'))
                elem.clear();
                elem.sendKeys(helper.last_number_service());
                expect(elem.getAttribute('value')).toEqual(helper.last_number_service().toString());
               
                for_css.wait_css(".btn.btn-primary", 5000)
                element(by.css(".btn.btn-primary")).click()
            })

            demands_shared.buttons();
            demands_shared.check_status_order_returned();
            
            demands_shared.check_data_popup("SERVICE");
            demands_shared.check_data_popup("DDS");
            demands_shared.check_data_popup("DEMANDS");
        });
    });
});
