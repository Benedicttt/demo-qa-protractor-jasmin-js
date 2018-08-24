describe('Sign in', function() {
    browser.waitForAngularEnabled(false);

    it(`with ${ id_email }`, function() {
        browser.get('/users/sign_in');

        helper.set_input_value(id_email, user_email);
        expect(helper.get_input_attr(id_email, 'value')).toEqual(user_email)
    });


});