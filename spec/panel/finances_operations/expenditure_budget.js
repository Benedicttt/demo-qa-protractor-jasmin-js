describe('Expenditure budget', () => {
    beforeAll( () => {
        user_object.authorization(helper.user_email_last());
        browser.get("/fin_operations/routine/expenditure_budget")
        expect(browser.getTitle()).toEqual("Бюджетирование | СПОК");
    });
    
    describe('Set filter', () => {
        it('set project', () => {
            let checkbox = element.all(by.css("label > input.project"));
            
            for_css.wait_css('.btn-small', 5000)
            element(by.css(".btn-small")).click()
            for_css.wait_css("label > input.project", 5000)

            checkbox.each(function (box) {
                browser.actions().mouseMove(box, {x: 10, y: 10,}).click().perform();
                expect(box.getAttribute('checked')).toBeTruthy();
            });
            element.all(by.css("button.btn")).get(1).click()

        })

        it('click checkboxes', () => {
            element(by.css('input[name="filters[show_unsigned]"]')).click();
            element(by.css('input[name="filters[expenditures_order_by_type]"]')).click()
            element(by.css(".form-actions > .btn-primary")).click();
            for_css.wait_css(".table.table-striped.table-condensed.treeview a.btn.btn-mini", 5000)
        })

        it('click btn`s', () => {

            element.all(by.xpath("/html/body/div[3]/table")).each((table)=> {
                table(by.xpath("/tbody/tr")).each((tr)=> {
                    console.log(tr)

                })
            })
            // element.all(by.css(".table.table-striped.table-condensed.treeview a.btn.btn-mini")).get(1).click()
            // for_css.wait_id('budget_amount', 5000)
            // element(by.id('budget_amount')).clear();
            // element(by.id('budget_amount')).sendKeys('11');
            // element(by.id("create-confirm")).click();
            browser.sleep(5000)
        })
    })
})
