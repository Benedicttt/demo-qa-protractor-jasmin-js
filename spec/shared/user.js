module.exports = {
    check_checkbox_in_block: (num, string) => {
        it(`check checkbox on => ${string}`, () => {
            let selector = `form > div:nth-child(${num})`;


            element.all(by.css(selector)).map(function (tags) {

                tags.getAttribute().then(function(text) {
                    console.log(text.getTagName());
                });
                // if (checkbox.getAttribute('class') === 'checkbox') {
                //     checkbox.getAttribute('class').then(function (id) {
                //         elem = element(by.css(id));
                //
                //         if (string === true) {
                //             console.log("true")
                //             expect(elem.getAttribute('checked')).toBeTruthy();
                //
                //         } else {
                //             console.log("false")
                //             expect(elem.getAttribute('checked')).toBeD = Falsy();
                //         }
                //     });
                // }

            })
        })
    },

    checked_access: (num) => {
        it('before click checkbox access', () =>{
            let selector = `form > div:nth-child(${num})`;
            let xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" +
                helper.user_email_last().toLowerCase() +
                "\")]/..//i[@class=\'icon-lock\']"

            let btn_mini = element(by.xpath(xpath))


            user_object.authorization(admin);
            go(page.users.get);
            expect(browser.getTitle()).toEqual(page.users.title);

            btn_mini.click()
            for_css.wait_css('.action', 5000)

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            element(by.css(".btn-primary")).click()

            browser.navigate().refresh()
        });

        user_shared.check_checkbox_in_block(5, false)

    },

    unchecked_access: (num) => {
        it('after click checkbox access', () => {
            let xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" +
                helper.user_email_last().toLowerCase() +
                "\")]/..//i[@class=\'icon-lock\']"

            let btn_mini = element(by.xpath(xpath))
            let selector = `form > div:nth-child(${num})`;


            user_object.authorization(admin);
            go(page.users.get);
            expect(browser.getTitle()).toEqual(page.users.title);

            btn_mini.click()
            for_css.wait_css('.action', 5000)

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            element(by.css(".btn-primary")).click()

            browser.navigate().refresh()
        });

        user_shared.check_checkbox_in_block(5, false)

    }
}