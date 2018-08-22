var request = require('request');

module.exports = {
    "Sign up": function (client) {
        var reg = client.page.user();

        reg.navigate(client.globals.base.host + "/users/sign_up")
            .assert.containsText(".brand > b", "СПОК")
            .assert.attributeContains('.brand', 'href', client.globals.base.host)
            .assert.attributeContains('.nav > li > a', 'href', client.globals.base.host + "/users/sign_in")
            .assert.attributeContains('.nav > li:nth-child(2) > a', 'href', client.globals.base.host + "/users/sign_up")
            .assert.attributeContains('#feedback > a', 'href', "mailto:a.petrov@404-group.com")
            .assert.title("Регистрация | СПОК")
            .assert.visible('@id_email')
            .assert.visible('@id_password')
            .assert.visible('@id_password_confirmation')
            .assert.visible('@submit');

            client.url(function (response) {
                request(response.value, function (error, response, body) {
                    client.assert.equal(response.statusCode, 200);
                })
            })
            .end();
    },

    "Registration": function(client) {
        var reg = client.page.user();

        reg.navigate(client.globals.base.host + "/users/sign_up")
            .setValue("@id_email", client.globals.user_email)
            .setValue("@id_password", client.globals.user_pass)
            .setValue("@id_password_confirmation", client.globals.user_pass)
            .click("@submit");

        // .findText("@error", "Ошибка: сохранение не удалось из-за 1 ошибки")
        // .click(".color-333")
        // .assert.urlEquals(client.globals.base.host + "/users/password/new");

        client.url(function (response) {
            request(response.value, function (error, response, body) {
                client.assert.equal(response.statusCode, 200);
            })
        })

        .back()
        .end();
    },

    "Sign in page": function (client) {
        var auth = client.page.user();

        auth.navigate(client.globals.base.host + "/users/sign_in")
            .assert.title("Вход в систему | СПОК")
            .assert.containsText(".brand > b", "СПОК")
            .assert.attributeContains('.brand', 'href', client.globals.base.host)
            .assert.attributeContains('.nav > li > a', 'href', client.globals.base.host + "/users/sign_in")
            .assert.attributeContains('.nav > li:nth-child(2) > a', 'href', client.globals.base.host + "/users/sign_up")
            .assert.attributeContains('#feedback > a', 'href', "mailto:a.petrov@404-group.com")
            .assert.visible('@id_email')
            .assert.visible('@id_password')
            .assert.visible('@id_remember_me')
            .assert.visible('@submit');

            client.url(function (response) {
                request(response.value, function (error, response, body) {
                    client.assert.equal(response.statusCode, 200);
                })
            })
            .end();
    },

    "Authorizations": function(client) {
        var auth = client.page.user();

        auth.navigate(client.globals.base.host + "/users/sign_in")
            .setValue("@id_email", client.globals.user_email)
            .setValue("@id_password", client.globals.user_pass)
            .click("@id_remember_me")
            .click("@submit")
            .assert.urlEquals(client.globals.base.host + "/");

            client.url(function (response) {
                request(response.value, function (error, response, body) {
                    client.assert.equal(response.statusCode, 200);
                })
            })
            .end();
    }
};


