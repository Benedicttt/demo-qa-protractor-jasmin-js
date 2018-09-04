describe('Sign up', function() {
    browser.waitForAngularEnabled(false);

    afterAll(function () {
        browser.manage().getCookies().then(function (cookie) {
            let data =
                `{
                    "user": { 
                        "email": "${user_email}", 
                        "password": "${password}"
                    },
                    "cookie": { 
                        "name": "${cookie[0].name}", 
                        "value": "${cookie[0].value}"
                    } 
                }`;
            helper.write_in_file(data)
        });
    });

    it('should a page title', function() {
        browser.get('/users/sign_up');
        expect(browser.getTitle()).toEqual('Регистрация | СПОК');
    });

    describe("Fill form", function() {
        browser.get('/users/sign_up');

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
            expect(element.all(by.css('.alert-success')).get(0).getText()).toEqual(registration_success);
        });

        it(`Assert sign_up`, function() {
            browser.manage().getCookie('_session_id').then(function(cookie) {
                expect(cookie.value.length).toEqual(32);
            }).then();
        });

        it(`Assert exit platform`, function() {
            element.all(by.css('.dropdown > a')).each(function(element, index) {
                element.getText().then(function (text) {
                    if (text === user_email.toLowerCase()){
                        element.click();
                    } else {
                        console.log(`Not found name link ${ user_email }`)
                    }
                });
            });
            element(by.cssContainingText("#exit", 'Выход')).click();
            expect(element(by.css('.alert-success')).getText()).toEqual(exit_success);
        });
    });
});
