const arr = [];

describe('Demands', () => {
    beforeAll( () => {
        user_object.authorization(user.user.email);
        go(page.demands.get);

        element(by.xpath("//*[@id=\"demands\"]/tbody/tr[1]")).getAttribute("data-id").then((e) => {
            arr.push(e);
        });
    });

    afterAll( () => {
        browser.sleep(10000);
        element(by.xpath("//*[@id=\"demands\"]/tbody/tr[1]")).getAttribute("data-id").then((e) => {
            arr.push(e);
            arr.map(parseFloat);
            expect(arr[1] - arr[0]).toEqual(1);
        });

    });

    it(`Go to page and check title ${page.demands.title}`,  () => {
        expect(browser.getTitle()).toEqual(page.demands.title);
    });

    it(`Go to page and check title ${page.demands_new.title}`,  () => {
        go(page.demands_new.get);
        expect(browser.getTitle()).toEqual(page.demands_new.title);
    });

    describe('Create', () => {
        describe('Fill form inputs:', () => {
            it('demand_is_payment_on_site',  () => {
                expect(element(by.id('demand_is_payment_on_site')).isDisplayed()).toBeTruthy();
            });

            it('demand_project_id',  () => {
                tag_selector.click_id_on_option('demand_project_id', 2, 500);
            });

            it('demand_account_id',  () => {
                tag_selector.click_id_on_option('demand_account_id', 2, 1500);
            });
            it('demand_contractor_type_id',  () => {
                tag_selector.click_id_on_option('demand_contractor_type_id', 3, 1500);
            });

            it('demand_contractor_id',  () => {
                tag_selector.click_id_on_option('demand_contractor_id', 2, 1500);
            });

            it('demand_expenditure_type_id',  () => {
                tag_selector.click_id_on_option('demand_expenditure_type_id', 2, 500);
            });

            it('demand_expenditure_id',  () => {
                tag_selector.click_id_on_option('demand_expenditure_id', 2, 1500);
            });

            it('demand_purse_number',  () => {
                elem = element(by.id('demand_purse_number'));
                elem.sendKeys(page.demands.purse_number);

                expect(elem.getAttribute('value')).toEqual(page.demands.purse_number)
            });
            it('demand_purpose',  () => {
                elem = element(by.id('demand_purpose'));
                elem.sendKeys(page.demands.purpose);

                expect(elem.getAttribute('value')).toEqual(page.demands.purpose)
            });

            it('demand_amount',  () => {
                elem = element(by.id('demand_amount'));
                elem.clear();
                elem.sendKeys(page.demands.amount);

                expect(elem.getAttribute('value')).toEqual(page.demands.amount.toString())
            });

            it('demand_comment',  () => {
                elem = element(by.id('demand_comment'));
                elem.sendKeys(page.demands.comment);

                expect(elem.getAttribute('value')).toEqual(page.demands.comment)
            });

            it("click Save button",  () => {
                btn = element(by.css("button.btn-primary"));
                btn.isEnabled() === true ? action(page.demands.click_submit) : browser.sleep(1000); action(page.demands.click_submit)
            });

            it("click accept",  () => {
                btn = element(by.css("button.btn-primary"));
                btn.isEnabled() === true ? action(page.demands.click_submit) : browser.sleep(1000); action(page.demands.click_submit)
            });

            it("assert create current demand",  () => {
                browser.manage().timeouts().implicitlyWait(5000);
                urlExpected = browser.baseUrl + '/demands';
                btn = element.all(by.css('.btn-small')).get(0);
                browser.getCurrentUrl() !== urlExpected ? expect(btn.isPresent()).toBe(true) : expect(browser.getCurrentUrl()).toEqual(urlExpected);

            });

        });
    })
});
