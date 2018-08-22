
module.exports = {
    "Sign up": function (client) {
        var request = require('request');

        client
            .url(client.globals.base.host + "/users/sign_up")
            .assert.containsText(".brand > b", "СПОК")
            .assert.attributeContains('.brand', 'href', client.globals.base.host)
            .assert.attributeContains('.nav > li > a', 'href', client.globals.base.host + "/users/sign_in")
            .assert.attributeContains('.nav > li:nth-child(2) > a', 'href', client.globals.base.host + "/users/sign_up")
            .assert.attributeContains('#feedback > a', 'href', "mailto:a.petrov@404-group.com")
            .assert.title("Регистрация | СПОК")
            .assert.visible('#user_email')
            .assert.visible('#user_password')
            .assert.visible('#user_password_confirmation')
            .assert.visible('button[type=submit]')
            .end();

        request(client.globals.base.host, function (error, response, body) {
            client.assert.equal(response.statusCode, 200);
        })
    }
};

