describe('Services new', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
    });

    it(`Go to page and check title ${page.services.title}`,  () => {
        go(page.services.get);
        expect(browser.getTitle()).toEqual(page.services.title);

        go(page.services.new.get);
        expect(browser.getTitle()).toEqual(page.services.new.title);
    });

    describe('Fill form inputs for type US:', () => {

        services_shared.run_test_case("base_us")
        // it('fill page', () => {
        //     tag_selector.selectOption("service_service_source_id", "Мы")
        //     tag_selector.selectOption("service_project_id", "Админ")
        //
        //     tag_selector.selectOption("service_contractor_type_id", " Покупатель")
        //     tag_selector.selectOption("service_contractor_id", " Контекст")
        //     tag_selector.selectOption("service_nomenclature_id", " Входящий НДС")
        // })
        //
        // it('service_service_source_id',  () => {
        //     expect(element(by.id('service_service_source_id')).isDisplayed()).toBeTruthy();
        // });
        //
        // page.services.us.ids.checkbox.forEach(function (id) {
        //     let elem = element(by.id(id.toString()));
        //
        //     it(`ID: ${id}`,  () => {
        //         elem.click();
        //         expect(elem.getAttribute('checked')).toBeTruthy();
        //     });
        // });
        //
        // page.services.us.ids.inputs.forEach(function (id) {
        //     let elem = element(by.id(id.toString()));
        //
        //     it(`ID: ${id}`,  () => {
        //         if (id.toString() === "service_amount"){
        //             elem.clear();
        //             elem.sendKeys(page.services.amount);
        //             expect(elem.getAttribute('value')).toEqual(page.services.amount.toString());
        //
        //         } else  {
        //             elem.clear();
        //             elem.sendKeys(id);
        //             expect(elem.getAttribute('value')).toEqual(id.toString());
        //         }
        //     });
        // });


    });
});
