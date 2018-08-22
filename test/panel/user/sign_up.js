var request = require('request');

module.exports = {
    "Sign up": function (client) {
        // client
        //     .url(client.globals.base.host + "/users/sign_up")
        //     .assert.containsText(".brand > b", "СПОК")
        //     .assert.attributeContains('.brand', 'href', client.globals.base.host)
        //     .assert.attributeContains('.nav > li > a', 'href', client.globals.base.host + "/users/sign_in")
        //     .assert.attributeContains('.nav > li:nth-child(2) > a', 'href', client.globals.base.host + "/users/sign_up")
        //     .assert.attributeContains('#feedback > a', 'href', "mailto:a.petrov@404-group.com")
        //     .assert.title("Регистрация | СПОК")
        //     .assert.visible('#user_email')
        //     .assert.visible('#user_password')
        //     .assert.visible('#user_password_confirmation')
        //     .assert.visible('button[type=submit]')
        //     .end();
        //
        // request(client.globals.base.host, function (error, response, body) {
        //     client.assert.equal(response.statusCode, 200);
        // })
    },

    "Registration": function(client) {
        var reg = client.page.user.sign_up();

        reg.navigate(client.globals.base.host + "/users/sign_up")
            .setValue("@id_email", "user157@gmail.com")
            .setValue("@id_password", "123456")
            .setValue("@id_password_confirmation", "123456")
            .click("@submit")
            .findText("@error", "Ошибка: сохранение не удалось из-за 1 ошибки")

            .click(".color-333")
            .assert.urlEquals(client.globals.base.host + "/users/password/new");

            client.url(function (response) {
                request(response.value, function (error, response, body) {
                    client.assert.equal(response.statusCode, 200);
                })
            })

            .back()
            .end();
        }

};

