module.exports = {
    check_checkbox_in_block: (num, string) => {
        it(`check checkbox on => ${string}`, () => {
            let selector = `form > div:nth-child(${num})`;

            browser.findElement(protractor.By.tagName(selector)).findElements(protractor.By.tagName("input")).then(function(rows){
                rows.forEach(function(row){ row.getAttribute('id').then((e) => { console.log(e) }) })
            });
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