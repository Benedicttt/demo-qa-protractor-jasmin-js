describe('Finances conversions', () => {
    describe('Create conversion not NDS', () => {
        beforeAll( () => {
            user_object.authorization(helper.user_email_last());
        });
        
        it(`Go to page and check title ${page.conversion.title}`,  () => {
            go(page.conversion.get);
            expect(browser.getTitle()).toEqual(page.conversion.title);
        });

        conversion_shared.fill_data();
        conversion_shared.buttons();
        conversion_shared.click_popup_info();

        conversion_shared.check_data_popup("SERVICE");
        conversion_shared.check_data_popup("DDS");
        conversion_shared.check_data_popup("DDS COMMISION");
    });

    describe('Create conversion from NDS', () => {
        beforeAll( () => {
            user_object.authorization(helper.user_email_last());
        });
        
        it(`Go to page and check title ${page.conversion.title}`,  () => {
            go(page.conversion.get);
            expect(browser.getTitle()).toEqual(page.conversion.title);
        });

        conversion_shared.fill_data();
        conversion_shared.fill_data_nds();
        conversion_shared.buttons();
        conversion_shared.click_popup_info();

        conversion_shared.check_data_popup("SERVICE");
        conversion_shared.check_data_popup("DDS");
        conversion_shared.check_data_popup("DDS COMMISION");
        conversion_shared.check_data_popup("NDS", "us");
        conversion_shared.check_data_popup("NDS", "we");
    });
});
