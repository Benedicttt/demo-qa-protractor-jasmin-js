// describe('Expenditure budget', () => {
//     beforeAll( () => {
//         user_object.authorization(helper.user_email_last());
//         browser.get("/fin_operations/routine/expenditure_budget")
//         expect(browser.getTitle()).toEqual("Бюджетирование | Б.СПОК");
//     });
//
//     describe('Set filter.', () => {
//         it('set project', () => {
//
//             browser.get(browser.getCurrentUrl() + "&per_page=5")
//             // let checkbox = element.all(by.css("label > input.project"));
//             //
//             // for_css.wait_css('.btn-small', globalTimeout)
//             // element(by.css(".btn-small")).click()
//             // for_css.wait_css("label > input.project", globalTimeout)
//             //
//             // checkbox.each(function (box) {
//             //     browser.actions().mouseMove(box, {x: 10, y: 10,}).click().perform();
//             //     expect(box.getAttribute('checked')).toBeTruthy();
//             // });
//             // element.all(by.css("button.btn")).get(1).click()
//
//         })
//
//         it('click checkboxes', () => {
//             element(by.css('input[name="filters[show_unsigned]"]')).click();
//             element(by.css('input[name="filters[expenditures_order_by_type]"]')).click()
//             element(by.css(".form-actions > .btn-primary")).click();
//             for_css.wait_css(".table.table-striped.table-condensed.treeview a.btn.btn-mini", globalTimeout)
//         })
//
//         let random_number = Math.floor(Math.random() * 100);
//         let random_number_index = Math.floor(Math.random() * 10);
//
//         it('click btn`s, fill data', () => {
//             path_from_button = "//td[5]/span[contains(text(), '—')]/../..//parent::*/a[@title='Создать']"
//             element.all(by.xpath(path_from_button)).get(random_number_index).click()
//                 for_css.wait_id('budget_amount', globalTimeout)
//                 element(by.id('budget_amount')).clear();
//                 element(by.id('budget_amount')).sendKeys(random_number);
//                 element(by.id("create-confirm")).click();
//         })
//
//         it('check budget', () => {
//             result_in_table = `//td[3]/span[contains(text(), '${random_number}.0')]`
//             for_css.wait_xpath(result_in_table, globalTimeout);
//
//             let expected = element.all(by.xpath(result_in_table)).get(0)
//             expect(expected.getAttribute('title')).toEqual("Сумма бюджетов за выбранный период")
//             expect(expected.getText()).toEqual(random_number.toString() + ".0" )
//         })
//     })
// });
