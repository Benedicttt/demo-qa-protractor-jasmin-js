const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');
let host = client.globals.base.host;

Given(/^I open in Google page Spok project$/, () => {
    return client
        .url(host)
        .assert.title("СПОК")

});
