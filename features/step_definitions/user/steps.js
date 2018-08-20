// var http = require("http");
// var request = require('request');

// module.exports = {
//   "Check Response Code" : function (client) {
//       var request = http.request({
//         host: "www.google.com",
//         port: 80,
//         path: "/images/srpr/logo11w.png",
//         method: "HEAD"
//       }, function (response) {
//         client
//         .assert.equal(response.statusCode, 200, 'Check status');
//         client.end();
//       }).on("error", function (err) {
//         console.log(err);
//         client.end();
//       }).end();
//      }
//    };
//    request('http://localhost:3000', function (error, response, body) {
//     browser.assert.equal(response.statusCode, 200);
//     console.log('Status code HTTP 200'); 
//   });

var clc = require('cli-color');

const { client } = require('nightwatch-cucumber');
const { Given, Then, When } = require('cucumber');

Given(/^I open in Google page Spok project$/, () => {
  return client
    .url('http://localhost:3000')
    
    .getLog('browser', function(result) {
      console.log(result);
    })

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

    .perform(function(done) {
      // console.log('elementValue', client.waitForElementVisible('#user_email', 1000));
      done();
    })

});



