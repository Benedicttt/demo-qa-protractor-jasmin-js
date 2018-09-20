describe('Finances receipts', () => {
    // describe('Create receipt low', () => {
    //     beforeAll( () => {
    //         user_object.authorization(helper.user_email_last());
    //     });
        
    //     it(`Go to page and check title ${page.receipts.title}`,  () => {
    //         go(page.receipts.get);
    //         expect(browser.getTitle()).toEqual(page.receipts.title);
    //     });
    
    
    //     receipts_shared.fill_data();
    //     receipts_shared.buttons();
    //     receipts_shared.check_data_popup("SERVICE");
    //     receipts_shared.check_data_popup("DDS");
    // });

    // describe('Create receipt plus `return`', () => {
    //     beforeAll( () => {
    //         user_object.authorization(helper.user_email_last());
    //     });
        
    //     it(`Go to page and check title ${page.receipts.title}`,  () => {
    //         go(page.receipts.get);
    //         expect(browser.getTitle()).toEqual(page.receipts.title);
    //     });
    
    //     receipts_shared.fill_data();
    //     receipts_shared.fill_data_return();
    //     receipts_shared.buttons();
    //     receipts_shared.check_data_popup("DDS", 0);
    // });

    describe('Create receipt plus `NDS`', () => {
        beforeAll( () => {
            user_object.authorization(helper.user_email_last());
        });
        
        it(`Go to page and check title ${page.receipts.title}`,  () => {
            go(page.receipts.get);
            expect(browser.getTitle()).toEqual(page.receipts.title);
        });
    
        receipts_shared.fill_data()
        receipts_shared.fill_data_nds()
        receipts_shared.buttons()
        receipts_shared.click_popup_info()
        receipts_shared.check_data_popup("SERVICE")
        receipts_shared.check_data_popup("DDS")
        receipts_shared.check_data_popup("NDS", "us")
        receipts_shared.check_data_popup("NDS", "we")
        
    });
});

