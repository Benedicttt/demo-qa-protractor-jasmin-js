describe('Sign_in: User Failed,', function(){
    browser.waitForAngularEnabled(false);

    let invalid_email_input = [ 'user', '@gmail', 'user@gmail.co-', 'user@!@#!^*^@gmail.com', 'u-s-e-r@gmail-com' ];
    let invalid_pass_input = [ '1', '12345', '!@#$%*()_', '@@@@@@', 'QWESDDFC!@~@#$' ];

    let error_email_invalid = 'Пожалуйста, введите корректный адрес электронной почты.';
    let error_blank = 'Это поле необходимо заполнить.';

    describe('fill invalid value inputs', function() {
        it(`with ${ id_email }`, function() {
            browser.manage().deleteAllCookies();
            browser.get('/users/sign_in');

            helper.set_input_value(id_email, "");

            element(by.css("button[type=submit]")).click();
            expect(element.all(by.css('.error', 'text')).get(1).getText()).toEqual(error_blank);
            expect(element.all(by.css('.error', 'text')).get(3).getText()).toEqual(error_blank)
        });

        it(`with ${ id_pass }`, function() {
            helper.set_input_value(id_pass, "");
            element(by.css("button[type=submit]")).click();

            expect(element.all(by.css('.error', 'text')).get(3).getText()).toEqual(error_blank)
        });

        invalid_email_input.forEach(function (value_id) {
            it(`with ${ value_id }`, function() {
                helper.set_input_value(id_email, value_id);
                helper.set_input_value(id_pass, "");
                element(by.css("button[type=submit]")).click();

                expect(element.all(by.css('.error', 'text')).get(1).getText()).toEqual(error_email_invalid)
            })
        });

        invalid_pass_input.forEach(function (pass_value_id) {
            it(`with pass: ${ pass_value_id }`, function() {
                helper.set_input_value(id_email, "_)(*&^%$");
                helper.set_input_value(id_pass, pass_value_id);
                element(by.css("button[type=submit]")).click();

                expect(element.all(by.css('.error', 'text')).get(1).getText()).toEqual(error_email_invalid);
                expect(element.all(by.css('.error', 'text')).get(3).getText().isPresent()).toBeFalsy();
            })
        });
    });

    describe('User Success', function() {
        it(`with ${ id_email }`, function() {
            helper.set_input_value(id_email, user_email);
            expect(helper.get_input_attr(id_email, 'value')).toEqual(user_email)
        });

        it(`with ${ id_pass }`, function() {
            helper.set_input_value(id_pass, password);
            expect(helper.get_input_attr(id_pass, 'value')).toEqual(password);

            let remember_box = element(by.id("user_remember_me"));
            remember_box.click();
            expect(remember_box.getAttribute('checked') ).toBeTruthy();

        });

        it(`with check box`, function() {
            element(by.css("button[type=submit]")).click();

            browser.manage().getCookie('_session_id').then(function(cookie) {
                expect(cookie.value.length).toEqual(32);
            }).then();
        });
    });
});
