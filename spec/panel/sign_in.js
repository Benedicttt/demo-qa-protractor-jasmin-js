describe('Sign_in: User Failed,', function(){
    runner(command.set.angular_wait_false);
    runner(command.set.delete_all_cookies);

    let remember_box = element(by.id("user_remember_me"));
    let error = element.all(by.css('.error', 'text'));
    let error_blank = form.authorization.error.blank;
    let error_email = form.authorization.error.email_invalid;
    let authorization_success ='×\nВход в систему выполнен.';
    let alert_success = element(by.css('.alert-success'));

    describe('fill invalid value inputs', function() {

        it(`with ${ id_email }`, function() {
            runner(command.page.sign_in);

            helper.set_input_value(id_email, "");
            runner(form.authorization.click_submit);

            expect(error.get(1).getText()).toEqual(error_blank);
            expect(error.get(3).getText()).toEqual(error_blank);
        });

        it(`with ${ id_pass }`, function() {
            helper.set_input_value(id_pass, "");
            runner(form.authorization.click_submit);

            expect(error.get(3).getText()).toEqual(error_blank)
        });

        form.authorization.error.input_invalid_email.forEach(function (value_id) {
            it(`with email: ${ value_id }`, function() {
                helper.set_input_value(id_email, value_id);
                helper.set_input_value(id_pass, "");
                runner(form.authorization.click_submit);

                expect(error.get(1).getText()).toEqual(error_email)
            })
        });

        form.authorization.error.input_invalid_pass.forEach(function (pass_value_id) {
            it(`with pass: ${ pass_value_id }`, function() {
                helper.set_input_value(id_email, "_)(*&^%$");
                helper.set_input_value(id_pass, pass_value_id);
                runner(form.authorization.click_submit);

                expect(error.get(1).getText()).toEqual(error_email);
                expect(error.get(3).getText().isPresent()).toBeFalsy();
            })
        });

        describe('User Success', function() {
            it(`with email: ${ id_email }`, function() {
                helper.set_input_value(id_email, user_email);
                expect(helper.get_input_attr(id_email, 'value')).toEqual(user_email)
            });

            it(`with pass: ${ id_pass }`, function() {
                helper.set_input_value(id_pass, password);
                expect(helper.get_input_attr(id_pass, 'value')).toEqual(password);
            });

            it("with check box", function() {
                remember_box.click();
                expect(remember_box.getAttribute('checked') ).toBeTruthy();

            });

            it("click button", function() {
                runner(form.authorization.click_submit);

                browser.manage().getCookie('_session_id').then(function(cookie) {
                    expect(cookie.value.length).toEqual(32);
                });
                expect(alert_success.getText()).toEqual(authorization_success);
            });

        });
    });
});
