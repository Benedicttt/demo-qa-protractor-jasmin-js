let num = 11;
let alert_success = element.all(by.css('.alert-success'));
let registration_success = '×\nДобро пожаловать! Вы успешно зарегистрировались.';

for(let i = 1; i < num; i++) {
    let name_user = `user_test_${i}@gmail.com`;

    describe(`Create ${name_user} users`, () => {
        set(setting.angular_wait_false);

        it(`with ${ id_email }`, function() {
            go(page.sign_up.get);
            expect(browser.getTitle()).toEqual(page.sign_up.title);

            helper.set_input_value(id_email, name_user);
            expect(helper.get_input_attr(id_email, 'value')).toEqual(name_user)
        });

        arr = [];
        arr.push(id_pass);
        arr.push(id_pass_conf);

        arr.forEach(function (value_id) {
                it(`with ${ value_id }`, function() {
                    helper.set_input_value(value_id, password);

                    expect(helper.get_input_attr(value_id, 'value')).toEqual(password)
                })
            }
        );

        it(`click button`, function() {
            element(by.css('button[type=submit]')).click();

            expect(alert_success.get(0).getText()).toEqual(registration_success);
        });

        it(`assert sign_up`, function() {
            browser.manage().getCookie('_session_id').then(function(cookie) {
                expect(cookie.value.length).toEqual(32);
            }).then();

            set(setting.delete_all_cookies);
        });

        it('sign in admin', () => {
            user_object.authorization(admin);
            go(page.users.get);
            expect(browser.getTitle()).toEqual(page.users.title);
        });

        it('set access in user last', function () {
            let xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" + name_user + "\")]/..//i[@class=\'icon-lock\']";
            let btn_mini = element(by.xpath(xpath));

            btn_mini.click();

            browser.executeScript("$('.action').not(this).prop('checked', true)");

            browser.actions().mouseMove(element.all(by.css("button.btn")).get(0), {x: 10, y: 10,}).click().perform();

        });

        it("Find user '/system/users' and (go to modal/add) projects", function() {
            go(page.users.get);
            browser.sleep(500);

            let xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" + name_user + "\")]/..//i[@class=\'icon-list-alt\']";
            let icon_list_alt = element.all(by.xpath(xpath)).get(0);

            icon_list_alt.click()
        });

        it("add all projects", function() {
            let until = protractor.ExpectedConditions;
            let checkbox = element.all(by.css("label > input.project"));

            browser.wait(until.presenceOf(checkbox), globalTimeout, 'Element taking too long to appear in the DOM');
            browser.executeScript("$(\"label > input.project\").not(this).prop('checked', true)");

            element.all(by.css("button.btn")).get(0).click();
        });

        it("Add access signature for demands", function () {
            go(page.users.get);
            let xpath = "//*[@id=\"users\"]/tbody/tr/td[contains(text(),\"" + name_user + "\")]/..//i[@class=\'icon-lock\']";
            let btn_mini = element(by.xpath(xpath));

            btn_mini.click();

            for_css.wait_css('a.text-success', globalTimeout);
            element.all(by.css('a.text-success')).get(0).click();

            let arr = ['demands_visibility_mine', 'services_visibility_mine', 'fin_indicators_operations_visibility_mine'];

            arr.map((id) => {
                browser.executeScript(`$(${id}).not(this).prop('checked', true)`);
            });
            element(by.css(".btn-primary.submit")).click()
        });

        it("remove cookies", () => {
            set(setting.delete_all_cookies);
        })
    });
}
