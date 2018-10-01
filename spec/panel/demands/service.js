describe('Demands', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    it(`Go to page and check title ${page.demands.title}`,  () => {
        go(page.demands.get);
        expect(browser.getTitle()).toEqual(page.demands.title);
    });

    describe('Create service', () => {
        describe('Fill form inputs, select, checkbox:', () => {
            beforeAll( () => {
                browser.driver.manage().window().maximize();
                go(page.demands.new.get);
                expect(browser.getTitle()).toEqual(page.demands.new.title);
            });
    
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

                for_css.wait_id('create_distribution', 5000);
                element(by.id('create_distribution')).click();
                for_css.wait_id('distribution_share', 5000);
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

    describe('Create service with advance_payment', () => {
        describe('Fill form inputs, select, checkbox:', () => {
            beforeAll( () => {
                browser.driver.manage().window().maximize();
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

    describe('Copy service demand, click btn copy and check', () => {
        beforeAll( () => {
            browser.driver.manage().window().maximize();
            go(page.demands.get);
        });
        
        it('copy service document', () => {
            helper.click_is_paid_and_filter_all()
                
            for_css.wait_css(".btn.btn-primary", 5000)
            element(by.css(".btn.btn-primary")).click()
            browser.sleep(1000)
            element(by.css(".btn.btn-primary")).click()
            browser.sleep(1000)
            
            var until = protractor.ExpectedConditions;
            signed = element.all(by.css('td.no-wrap > a, td.no-wrap > span')).get(0)
            browser.wait(until.presenceOf(signed.getText()), 5000, 'Element taking too long to appear in the DOM');
            browser.wait(EC.textToBePresentInElement(signed, "Подписана"), 5000);
                
            
            for_css.wait_css('.icon-file', 5000)
            element.all(by.css('.icon-file')).get(0).click()
        })

        demands_shared.buttons();
        demands_shared.check_status_order_service();
        
        demands_shared.check_data_popup("SERVICE");
        demands_shared.check_data_popup("DDS");
        demands_shared.check_data_popup("DEMANDS");
    });
});
