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
            demands_shared.buttons();
            demands_shared.check_status_order_service();
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
        });
    });

    describe('Create service and returned with advance_payment', () => {
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
        });

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
        });
    });
});
