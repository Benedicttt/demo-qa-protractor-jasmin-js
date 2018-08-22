var request = require('request');

module.exports = {
    "Sign in page": function (client) {

        client
            .url(client.globals.base.host + "/users/sign_in")
            .assert.title("Вход в систему | СПОК")
            .assert.containsText(".brand > b", "СПОК")
            .assert.attributeContains('.brand', 'href', client.globals.base.host)
            .assert.attributeContains('.nav > li > a', 'href', client.globals.base.host + "/users/sign_in")
            .assert.attributeContains('.nav > li:nth-child(2) > a', 'href', client.globals.base.host + "/users/sign_up")
            .assert.attributeContains('#feedback > a', 'href', "mailto:a.petrov@404-group.com")
            .assert.visible('#user_email')
            .assert.visible('#user_password')
            .assert.visible('#user_remember_me')
            .assert.visible('button[type=submit]')
            .end();

        request(client.globals.base.host, function (error, response, body) {
            client.assert.equal(response.statusCode, 200);
        })

    },

    "Authorizations": function(client) {
        client
            .url(client.globals.base.host + "/users/sign_in")
            .setValue("#user_email", "user157@gmail.com")
            .setValue("#user_password", "12345q")
            .click("#user_remember_me")
            .click("button[type=submit]")
            client.expect.element('#user_email').text.to.not.equal("user157@gmail.com");
            client.expect.element('#user_password').text.to.not.equal("123456");
            client.end();
        // request(client.globals.base.host, function (error, response, body) {
        //     client.assert.equal(response.statusCode, 200);
        // })

    }
};

