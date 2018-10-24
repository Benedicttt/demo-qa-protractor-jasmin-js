describe('User add full access on admin', function() {
    beforeAll(function () {
        user_object.authorization(admin);
        go(page.users.get);
        expect(browser.getTitle()).toEqual(page.users.title);

        let xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" + helper.user_email_last().toLowerCase() + "\")]/..//i[@class=\'icon-lock\']"
        let btn_mini = element(by.xpath(xpath))

        btn_mini.click()
        for_css.wait_css('.action', 5000)
    });

    describe('Set mid access in user `Заявки`', () => {
        it('click checkbox access', () =>{
            let selector = "form > div:nth-child(5)";

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            check_checkbox(selector)
        });

        it('check pages and access', () =>{ });
    });

    describe('Set mid access in user `Кадры`', () => {
        it('click checkbox access', () =>{
            let selector = "form > div:nth-child(6)";

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            check_checkbox(selector)
        });

        it('check pages and access', () =>{ });
    })

    describe('Set mid access in user `Система`', () => {
        it('click checkbox access', () =>{
            let selector = "form > div:nth-child(7)";

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            check_checkbox(selector)
        });

        it('check pages and access', () =>{ });
    })

    describe('Set mid access in user `Справочники`', () => {
        it('click checkbox access', () =>{
            let selector = "form > div:nth-child(8)";

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            check_checkbox(selector)
        });

        it('check pages and access', () =>{ });
    })

    describe('Set mid access in user `Услуги`', () => {
        it('check pages and access', () => {
            let selector = "form > div:nth-child(9)";

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            check_checkbox(selector)
        });
    })

    describe('Set mid access in user `Фин. операции`', () => {
        it('click checkbox access', () =>{
            let selector = "form > div:nth-child(10)";

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            check_checkbox(selector)
        });

        it('check pages and access', () =>{ });
    })

    describe('Set mid access in user `Фин. показатели`', () => {
        it('click checkbox access', () =>{
            let selector = "form > div:nth-child(12)";

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            check_checkbox(selector)
        });

        it('check pages and access', () =>{ });
    })

    describe('Set mid access in user `Техничка`', () => {
        it('click checkbox access', () =>{
            let selector = "form > div:nth-child(13)";

            browser.executeScript(`$('${selector}').find("input[type=\'checkbox\']").click()`);
            check_checkbox(selector)
        });

        it('check pages and access', () =>{ });
    })
});

function check_checkbox(css){
    element.all(by.css(css)).each(function (checkbox) {
        if (checkbox.getAttribute('class') == "checkbox") {

            checkbox.getAttribute('class').then(function (id) {
                elem = element(by.css(id));
                expect(elem.getAttribute('checked')).toBeTruthy();
            });
        }
    });
}