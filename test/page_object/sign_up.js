let request = require('request');

let sign_up = {
    closePage: function(client) {
        client
            .end()
    },
    validateForm: function(client, url) {
        return this.waitForElementVisible('body', 1000)
            .assert.title("Регистрация | СПОК")
            .assert.containsText(".brand > b", "СПОК")
            .assert.attributeContains('.brand', 'href', url)
            .assert.attributeContains('.nav > li > a', 'href', url + "/users/sign_in")
            .assert.attributeContains('.nav > li:nth-child(2) > a', 'href', url + "/users/sign_up")
            .assert.attributeContains('#feedback > a', 'href', "mailto:a.petrov@404-group.com")
            .assert.visible('@id_email')
            .assert.visible('@id_password')
            .assert.visible('@id_password_confirmation')
            .assert.visible('@submit', "Зарегистрироваться");

    },
    fillInForm: function(username, password) {
        return this.waitForElementVisible('body', 1000)
            .clearValue("@id_email")
            .clearValue("@id_password")
            .clearValue("@id_password_confirmation")

            .setValue("@id_email", username)
            .setValue("@id_password", password)
            .setValue("@id_password_confirmation", password)
    },
    submit: function() {
        return this.verify.value('@submit', '')
            .click('@submit')
    },
    responsePage: function(client, code) {
        client.url(function (response) {
            request(response.value, function (error, response, body) {
                client.assert.equal(response.statusCode, code);
            })
        });
        return this;
    },
    search_text_in_classes: function(client, name_attribute, selector, text) {
        client.elements(name_attribute, selector, function (resultValues) {
            resultValues.value.forEach(function (element, index) {
                client.elementIdText(element.ELEMENT, function (result) {
                    if (result.value === text && result.value.length > 0) {
                        client.assert.ok(result.value === text);
                    }
                });
            });
        });
        return this;
    },
    exitPage: function() {
        return this.waitForElementVisible('.dropdown', 1000)
            .click(".dropdown")
            .click("#exit");
        return this
    }
};

module.exports = {
    commands: [sign_up],
    elements: {
        id_email: {
            selector: '#user_email'
        },
        id_password: {
            selector: '#user_password'
        },
        id_password_confirmation: {
            selector: '#user_password_confirmation'
        },
        submit: {
            selector: 'button[type=submit]'
        },
        error: {
            selector: '.alert.alert-error > h4'
        },
        error_message: {
            selector: "Ошибка: сохранение не удалось из-за 1 ошибки"
        }
    }
};
