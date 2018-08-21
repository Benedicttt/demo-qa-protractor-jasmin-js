const { client } = require('nightwatch-cucumber');
const { Given, Then } = require('cucumber');

Given(/^Go to page Sign up$/, () => {
    return client
        .url("http://localhost:3000/users/sign_up")
});

Then(/^\(Sign up\) the title is "SPOK"$/, () => {
    return client
        .assert.title("Регистрация | СПОК")
});

Then(/^\(Sign up\) find login and password inputs$/, () => {
    return client
        .assert.visible('#user_email')
        .assert.visible('#user_password')
        .assert.visible('#user_password_confirmation')
        .assert.visible('button[type=submit]')

    // .perform(function(done) {
    // console.log('elementValue', client.waitForElementVisible('#user_email', 1000));
    // done();
    // })

});



