const { client } = require('nightwatch-cucumber');
const { Given, Then } = require('cucumber');

Given(/^Go to page Sign in$/, () => {
    return client
        .url("http://localhost:3000/users/sign_in")
});

Then(/^\(Sign in\) the title is "SPOK"$/, () => {
    return client
        .assert.title("Вход в систему | СПОК")
});

Then(/^\(Sign in\) find login and password inputs$/, () => {
    return client
        .assert.visible('#user_email')
        .assert.visible('#user_password')
        .assert.visible('#user_remember_me')
        .assert.visible('button[type=submit]')

    // .perform(function(done) {
    // console.log('elementValue', client.waitForElementVisible('#user_email', 1000));
    // done();
    // })

});



