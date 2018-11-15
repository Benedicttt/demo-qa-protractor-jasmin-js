// describe('Add cashier to Admin project', () => {
//     it(`Go to page and check title ${page.references.title}`,  () => {
//         user_object.authorization(helper.user_email_last());
//
//         go(page.references.get);
//         expect(browser.getTitle()).toEqual(page.references.title);
//     });
//
//     ["Админ", "Promotion", "Development"].map(function(name){
//         it(`\nEdit cashier in ${name}`, () => {
//             for_css.wait_xpath(`//td[contains(text(), "${name}")]/following::*//i[@class='icon-book']`, globalTimeout, 0)
//             element.all(by.xpath(`//td[contains(text(), "${name}")]/following::*//i[@class='icon-book']`)).get(0).click()
//         });
//
//         it(`Delete all cashier`,  () => {
//             for_css.wait_css("td:nth-child(6) > div > a.btn.btn-mini.btn-danger > i");
//
//             element.all(by.css("td:nth-child(6) > div > a.btn.btn-mini.btn-danger > i")).map(function(el){
//                 el.click()
//
//                 for_css.wait_css(".btn-primary", globalTimeout)
//                 element(by.css(".btn-primary")).click()
//             })
//
//         });
//     });
//
// });
