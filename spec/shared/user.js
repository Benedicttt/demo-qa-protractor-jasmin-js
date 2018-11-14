module.exports = {
    check_checkbox_in_block: (num, string) => {
        it(`check checkbox on => ${string}`, () => {
            let selector = `form > div:nth-child(${num}) input[type=checkbox]`;


            element.all(by.css(selector)).each(function(elem) {
                elem.getAttribute('checked').then(function(status) {
                    if (status) {
                        elem.getAttribute('id').then(function (id) {

                            elem = element(by.id(id));

                            if (string === true) {
                                expect(elem.getAttribute('checked')).toBeTruthy() ;
                            } else {
                                expect(elem.getAttribute('checked')).toBeFalsy() ;
                            }

                        });
                    }
                })
            })


        })
    },

    unchecked_access: (num) => {
        it('before click checkbox access => false', () => {
            let selector = `form > div:nth-child(${num})`;
            let xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" +
                helper.user_email_last().toLowerCase() +
                "\")]/..//i[@class=\'icon-lock\']";

            let btn_mini = element(by.xpath(xpath));

            user_object.authorization(admin);
            go(page.users.get);
            expect(browser.getTitle()).toEqual(page.users.title);

            btn_mini.click();

            for_css.wait_css(`${selector}  input[type=checkbox]`, globalTimeout);
            browser.executeScript("$('.action').not(this).prop('checked', false)")


            element(by.css(".btn-primary")).click();
            browser.navigate().refresh()

            user_shared.check_checkbox_in_block(num, false)
        });

    },

    checked_access: (num) => {
        it('after click checkbox access => true', () =>{
            let selector = `form > div:nth-child(${num})`;
            let xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" +
                helper.user_email_last().toLowerCase() +
                "\")]/..//i[@class=\'icon-lock\']";

            let btn_mini = element(by.xpath(xpath));

            user_object.authorization(admin);
            go(page.users.get);
            expect(browser.getTitle()).toEqual(page.users.title);

            btn_mini.click();
            browser.executeScript("$('.action').not(this).prop('checked', false)")

            for_css.wait_css(`${selector} input[type=checkbox]`, globalTimeout);
            browser.executeScript(`$('${selector} input[type=checkbox]').not(this).prop('checked', true);`);

            element(by.css(".btn-primary")).click();
            browser.navigate().refresh()

            user_shared.check_checkbox_in_block(num, true)
        });


    }

}