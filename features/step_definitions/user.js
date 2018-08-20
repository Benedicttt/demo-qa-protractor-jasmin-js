  const { client } = require('nightwatch-cucumber');
  const { Given, Then, When } = require('cucumber');

  Given(/^I open in Google page Spok project$/, () => {
    return client
      .url('http://localhost:3000')
      
      // .getLog('browser', function(result) {
      //   console.log(result);
      // })

    });

  Then(/^the title is "SPOK"$/, () => {
    return client.assert.title('СПОК')
  });

  Then(/^find login and password inputs$/, () => {
    return client
      .url('http://localhost:3000/users/sign_up')
      
      .waitForElementVisible('#user_email', 1000)
      .waitForElementVisible('#user_password', 1000)
      .waitForElementVisible('#user_password_confirmation', 1000)

      .assert.visible('#user_email')
      .assert.visible('#user_password')
      .assert.visible('#user_password_confirmation')

      // .perform(function(done) {
        // console.log('elementValue', client.waitForElementVisible('#user_email', 1000));
        // done();
      // })

  });



