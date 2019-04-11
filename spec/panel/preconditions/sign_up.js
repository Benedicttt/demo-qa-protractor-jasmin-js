describe('Sign up', function() {
    set(setting.angular_wait_false);
    let alert_success = element.all(by.css('.alert-success'));
    let registration_success = '×\nДобро пожаловать! Вы успешно зарегистрировались.';
    let exit_success ='×\nВыход из системы выполнен.';

    afterAll(function () {
        browser.manage().getCookies().then(function (cookie) {

            let file = editJsonFile("./spec/support/user.json");
            let set_params  = file.get();
            set_params["user"] = {}
            set_params["cookie"] = {}

            set_params["user"]["email"] = user_email;
            set_params["user"]["password"] = password;
            set_params["cookie"]["name"] = cookie[0].name;
            set_params["cookie"]["value"] = cookie[0].value;
            file.save()
        });
    });

    it('should a page title', function() {
        go(page.sign_up.get);
        expect(browser.getTitle()).toEqual(page.sign_up.title);
    });

    describe("Fill form", function() {
        it(`with ${ id_email }`, function() {
            helper.set_input_value(id_email, user_email);
            expect(helper.get_input_attr(id_email, 'value')).toEqual(user_email)
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
        });

        it(`assert exit platform`, function() {
            element.all(by.css('.dropdown > a')).each(function(element) {
                element.getText().then(function (text) {
                    if (text === user_email.toLowerCase()){
                        element.click();
                    } else {
                        console.log(`Not found name link ${ user_email }`)
                    }
                });
            });

            element(by.cssContainingText("#exit", 'Выход')).click();
            expect(alert_success.get(0).getText()).toEqual(exit_success);
        });

    });
});
