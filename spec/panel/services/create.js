describe('Services', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    it(`Go to page and check title ${page.services.title}`,  () => {
        go(page.services.get);
        expect(browser.getTitle()).toEqual(page.services.title);
    });

    describe('Create service', () => {
        describe('Fill form inputs for US, select, checkbox:', () => {

            beforeAll( () => {
                go(page.services.new.get);
                expect(browser.getTitle()).toEqual(page.services.new.title);
            });

            afterAll( () => {
                for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[1]", 5000);
                element(by.xpath("//*[@id=\"services\"]/tbody/tr[1]/td[1]")).getText().then(function (text) {
                    let data = `{ "service": { "us": { "number": ${text} }, "we": { "number": ${parseInt(text) + 1 } } } }`;
                    helper.write_in_file('service.json', data)
                });
            });


            it('fill page', () => {
                tag_selector.selectOption("service_service_source_id", "Мы")
                tag_selector.selectOption("service_project_id", "Админ")

                tag_selector.selectOption("service_contractor_type_id", " Покупатель")
                tag_selector.selectOption("service_contractor_id", " Контекст")
                tag_selector.selectOption("service_nomenclature_id", " Входящий НДС")
            })

            services_shared.service_frame();    
            services_shared.buttons();
            
            it('click `filter_all`', () => {
                for_css.wait_css("#filter_all", 5000);
                for_css.wait_css(".btn.btn-primary", 5000)
                
                element(by.id("filter_all")).click();

                element(by.css(".btn.btn-primary")).click()
                element(by.css(".btn.btn-primary")).click()
            })

            it('sign', () => {
                for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 3000);
                helper.sign_order_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 0, 1);
            });

            it('check success sign', () => {
                browser.sleep(1500)
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
            });
        });

        describe('Fill form inputs for WE, select, checkbox:', () => {

            beforeAll( () => {
                go(page.services.new.get);
                expect(browser.getTitle()).toEqual(page.services.new.title);
            });

            it('fill page', () => {
                tag_selector.selectOption("service_service_source_id", "Нам")
                tag_selector.selectOption("service_project_id", "Админ")

                tag_selector.selectOption("service_expenditure_type_id", " Арендные платежи")
                tag_selector.selectOption("service_expenditure_id", " Аренда")
                
                tag_selector.selectOption("service_contractor_type_id", " Покупатель")
                tag_selector.selectOption("service_contractor_id", " Контекст")
                
                browser.sleep(2000)
            })

            services_shared.service_frame();
            services_shared.buttons();
            
            it('click `filter_all`', () => {
                for_css.wait_css("#filter_all", 5000);
                for_css.wait_css(".btn.btn-primary", 5000)
                
                element(by.id("filter_all")).click();

                element(by.css(".btn.btn-primary")).click()
                element(by.css(".btn.btn-primary")).click()
            })
            
            it('sign', () => {
                for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 3000);
                helper.sign_order_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 0, 1);
            });

            it('check success sign', () => {
                helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
            });
        });
    });
});
