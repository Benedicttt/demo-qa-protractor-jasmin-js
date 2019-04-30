describe('Sign_in:', function(){
    set(setting.angular_wait_false);
    set(setting.delete_all_cookies);

    let remember_box = element(by.id("user_remember_me"));
    let error = element.all(by.css('.error', 'text'));
    let error_blank = form.authorization.error.blank;
    let error_email = form.authorization.error.email_invalid;
    let authorization_success ='×\nВход в систему выполнен.';
    let alert_success = element(by.css('.alert-success'));

    describe('Failed', function() {
        it(`fill with ${ id_email }`, function() {
            go(page.sign_in.get);

            helper.set_input_value(id_email, "");
            action(form.authorization.click_submit);

            expect(error.get(1).getText()).toEqual(error_blank);
            expect(error.get(3).getText()).toEqual(error_blank);
        });

        it(`fill with ${ id_pass }`, function() {
            helper.set_input_value(id_pass, "");
            action(form.authorization.click_submit);

            expect(error.get(1).getText()).toEqual(error_blank);
            expect(error.get(3).getText()).toEqual(error_blank)
        });

        form.authorization.error.input_invalid_email.forEach(function (value_id) {
            it(`fill with email: ${ value_id }`, function() {
                helper.set_input_value(id_email, value_id);
                helper.set_input_value(id_pass, "");
                action(form.authorization.click_submit);

                expect(error.get(1).getText()).toEqual(error_email)
            })
        });

        form.authorization.error.input_invalid_pass.forEach(function (pass_value_id) {
            it(`fill with pass: ${ pass_value_id }`, function() {
                helper.set_input_value(id_email, "_)(*&^%$");
                helper.set_input_value(id_pass, pass_value_id);
                action(form.authorization.click_submit);

                expect(error.get(1).getText()).toEqual(error_email);
                expect(error.get(3).getText().isPresent()).toBeFalsy();
            })
        });
    });

    describe('Success', function() {
        it(`fill with email: ${ id_email }`, function() {
            go(page.sign_in.get);
            helper.set_input_value(id_email, helper.user_email_last());

            expect(browser.getTitle()).toEqual(page.sign_in.title);
            expect(helper.get_input_attr(id_email, 'value')).toEqual(helper.user_email_last())
        });

        it(`fill with pass: ${ id_pass }`, function() {
            helper.set_input_value(id_pass, helper.user_password_last());
            expect(helper.get_input_attr(id_pass, 'value')).toEqual(helper.user_password_last());
        });

        it("fill with check box", function() {
            remember_box.click();
            expect(remember_box.getAttribute('checked') ).toBeTruthy();

        });

        it("click button", function() {
            action(form.authorization.click_submit);

            browser.manage().getCookie('_session_id').then(function(cookie) {
                expect(cookie.value.length).toEqual(32);
            });
            expect(alert_success.getText()).toEqual(authorization_success);
        });

        it("remove cookies", () => {
            set(setting.delete_all_cookies);
        })
    });
});
