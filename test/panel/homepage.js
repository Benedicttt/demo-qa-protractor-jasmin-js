module.exports = {
    "Home page start": function(client) {
        var request = require('request');

        client
            .url(client.globals.base.host)
            .assert.attributeContains('.brand', 'href', client.globals.base.host)
            .assert.attributeContains('.nav > li > a', 'href', client.globals.base.host + "/users/sign_in")
            .assert.attributeContains('.nav > li:nth-child(2) > a', 'href', client.globals.base.host + "/users/sign_up")
            .assert.attributeContains('#feedback > a', 'href', "mailto:a.petrov@404-group.com")
            .assert.containsText(".brand > b", "СПОК")
            .assert.title("СПОК")
            .end();

        request(client.globals.base.host, function (error, response, body) {
            client.assert.equal(response.statusCode, 200);
        })
    }
};
