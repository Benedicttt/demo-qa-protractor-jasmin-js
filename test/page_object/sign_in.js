var request = require('request');

var sign_in = {
    validateForm: function(client, url) {
        return this.waitForElementVisible('body', 1000)
            .assert.title("Вход в систему | СПОК")
            .assert.containsText(".brand > b", "СПОК")
            .assert.attributeContains('.brand', 'href', url)
            .assert.attributeContains('.nav > li > a', 'href', url + "/users/sign_in")
            .assert.attributeContains('.nav > li:nth-child(2) > a', 'href', url + "/users/sign_up")
            .assert.attributeContains('#feedback > a', 'href', "mailto:a.petrov@404-group.com")
            .assert.visible('@id_email')
            .assert.visible('@id_password')
            .assert.visible('@id_remember_me')
            .assert.visible('@submit', 'Войти');

    },
    fillInForm: function(username, password) {
        return this.waitForElementVisible('body', 1000)
            .setValue("@id_email", username)
            .setValue("@id_password", password)
            .click("@id_remember_me")
    },
    submit: function() {
        return this.verify.value('@submit', '')
            .click('@submit')
    },
    responsePage: function(client, code) {
        this
        client.url(function (response) {
            request(response.value, function (error, response, body) {
                client.assert.equal(response.statusCode, code);
            })
        });
        return this;
    },
    validateError: function(errorMessage) {
        return this.verify.visible('@error')
            .verify.containsText('@error', errorMessage)
            .verify.valueContains('@username', '')
            .verify.valueContains('@password', '')
    },

    setCookies: function (client, url, path = null, params) {
        var url = 'http://' + url +'/' + path;

        client
            .setCookie({
                params //hash
            })
            .url(url)
            .waitForElementVisible('body', 1000)
            .end();
    },
    closePage: function(client) {
        client
            .end()
    }
};

module.exports = {
    commands: [sign_in],
    elements: {
        id_email: {
            selector: '#user_email'
        },
        id_password: {
            selector: '#user_password'
        },
        id_remember_me: {
            selector: "#user_remember_me"
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
