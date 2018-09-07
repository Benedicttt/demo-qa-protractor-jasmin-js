const arr = [];

describe('Demands', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
        go(page.demands.get);
        // browser.sleep(5000);
        // element(by.xpath("//*[@id=\"demands\"]/tbody/tr[1]")).getAttribute("data-id").then((e) => {
        //     arr.push(e);
        // });
    });

    afterAll( () => {
        // browser.sleep(10000);
        // element(by.xpath("//*[@id=\"demands\"]/tbody/tr[1]")).getAttribute("data-id").then((e) => {
        //     arr.push(e);
        //     arr.map(parseFloat);
        //     expect(arr[1] - arr[0]).toEqual(1);
        // });

    });

    it(`Go to page and check title ${page.demands.title}`,  () => {
        expect(browser.getTitle()).toEqual(page.demands.title);
    });

    it(`Go to page and check title ${page.demands_new.title}`,  () => {
        go(page.demands_new.get);
        expect(browser.getTitle()).toEqual(page.demands_new.title);
    });

    describe('Create service', () => {
        describe('Fill form inputs:', () => {
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
                    elem = element(by.id(id.toString()));
                    elem.click();
                    expect(elem.getAttribute('checked')).toBeTruthy();
                });
            });

            page.demands.ids.service.inputs.forEach(function (id) {
                it(`ID: ${id}`,  () => {
                    elem = element(by.id(id.toString()));

                    if (id.toString() === "demand_amount"){
                        elem.clear();
                        elem.sendKeys(page.demands.amount);
                        expect(elem.getAttribute('value')).toEqual(page.demands.amount);
                    } else {
                        elem.clear();
                        elem.sendKeys(id.toString());
                        expect(elem.getAttribute('value')).toEqual(id.toString());
                    }
                });
            });

            it('', () => {
                browser.sleep(3000);
            });

        });
    })
});
