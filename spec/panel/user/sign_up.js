let h = require("../../helpers/helpers.js");

describe('Sign up', function() {
    browser.waitForAngularEnabled(false);

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
        });

        it(`Assert sign_up`, function() {
            expect(element.all(by.css('.alert-success')).get(0).getText()).toEqual(registration_success)
        });
    });
});
