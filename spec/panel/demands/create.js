describe('Demands', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    it(`Go to page and check title ${page.demands.title}`,  () => {
        go(page.demands.get);
        expect(browser.getTitle()).toEqual(page.demands.title);
    });

    describe('Create service', () => {
        beforeAll( () => {
            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        describe('Fill form inputs, select, checkbox:', () => {
            demands_shared.services();

            it('add inventory', () => {
                tag_selector.from_text('css', '#demand_contractor_type_id > option', "--  На имущество")

                for_css.wait_id('link_service_properties', 5000)
                element(by.id('link_service_properties')).click()

                for_css.wait_id('service_properties_amount', 3000)
                element(by.id('service_properties_amount')).sendKeys('1');

                element(by.id('service_properties_name')).sendKeys('--  На имущество');
                element.all(by.css('.btn-primary')).get(0).click()
                tag_selector.from_text('css', '#demand_contractor_id > option', " Vendor Properties : Контрагент #50")

                for_css.wait_id('create_distribution', 2000);
                element(by.id('create_distribution')).click();
                for_css.wait_id('distribution_share', 2000);
                element(by.id('distribution_share')).sendKeys(1);
                action(page.demands.click_submit);
            })

            demands_shared.buttons();

            it('confirmed sign', () => {
                helper.sign_order_xpath("//*[@id=\"demands\"]/tbody/tr[1]/td[11]/a[2]", 1, 0);
            })
            
            demands_shared.check_status_order_service();

            demands_shared.check_data_popup("SERVICE");
            demands_shared.check_data_popup("DDS");
            demands_shared.check_data_popup("DEMANDS");

            it('check inventori in page `/fin_operations/inventory`', () => {
               browser.get('/fin_operations/inventory')
               order = element(by.xpath('//*[@id="operations"]/tbody/tr[1]/td[5]/span')).getText();
               agent = element(by.xpath('//*[@id="operations"]/tbody/tr[1]/td[6]')).getText();     

               expect(order).toEqual("Поставлено в рамках услуг")
               expect(agent).toEqual(helper.user_email_last().toLowerCase())
            })
        });
    });

    describe('Create returned', () => {
        beforeAll( () => {
            go(page.demands.new.get);
            expect(browser.getTitle()).toEqual(page.demands.new.title);
        });

        describe('Fill form inputs, select, checkbox:', () => {
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

    describe('Create service with advance_payment', () => {
        describe('Fill form inputs, select, checkbox:', () => {
            beforeAll( () => {
                go(page.demands.new.get);
                expect(browser.getTitle()).toEqual(page.demands.new.title);
            });

            demands_shared.services();
            demands_shared.advance_payment();
            demands_shared.buttons();
            demands_shared.check_status_order_service();
            demands_shared.check_notify_for_demand();
            
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
});
