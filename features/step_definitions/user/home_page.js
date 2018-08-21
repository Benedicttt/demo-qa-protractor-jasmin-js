const { client } = require('nightwatch-cucumber');
const { Given } = require('cucumber');

Given(/^I open in Google page Spok project$/, () => {
    return client
        .url(client.globals.base_url)

});
