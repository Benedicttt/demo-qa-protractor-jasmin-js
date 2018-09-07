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
            go(page.demands_new.get);
            expect(browser.getTitle()).toEqual(page.demands_new.title);
        });

        afterAll( () => {
        });

        describe('Fill form inputs, select, checkbox:', () => {
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
                    shared.inputs_set(id);
                });
            });

            shared.demands_buttons();
        });
    });

    describe('Create returned', () => {
        beforeAll( () => {
            go(page.demands_new.get);
            expect(browser.getTitle()).toEqual(page.demands_new.title);
        });

        afterAll( () => {
        });

        describe('Fill form inputs, select, checkbox:', () => {
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
                    shared.inputs_set(id);
                });
            });

            it('fist click button save', () => {
                var btn = element.all(by.css("button.btn-primary")).get(0);
                browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 6000);
                action(page.demands.click_submit)
            });

            shared.demands_buttons();
        });
    })
});
