var request = require('request');

var home = {
    validatePage: function(client, url) {
        return this.waitForElementVisible('body', 1000)
            .assert.attributeContains('.brand', 'href', url)
            .assert.attributeContains('.nav > li > a', 'href', url + "/users/sign_in")
            .assert.attributeContains('.nav > li:nth-child(2) > a', 'href', url + "/users/sign_up")
            .assert.attributeContains('#feedback > a', 'href', "mailto:a.petrov@404-group.com")
            .assert.containsText(".brand > b", "СПОК")
            .assert.title("СПОК")
    },
    responsePage: function(client, code) {
        client.url(function (response) {
            request(response.value, function (error, response, body) {
                client.assert.equal(response.statusCode, code);
            })
        })
    }
};

module.exports = {
    commands: [home],
    elements: {}
};
