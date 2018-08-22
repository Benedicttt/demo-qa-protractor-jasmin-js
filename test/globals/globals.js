var HtmlReporter = require('nightwatch-html-reporter');
const chromedriver = require('chromedriver');
const uuidv1 = require('uuid/v1');

var reporter = new HtmlReporter({
    openBrowser: false,
    reportsDirectory: 'reports',
    themeName: 'cover'
});

var user_email = "user_" + uuidv1() + "@yopmail.com";
var user_pass = "123456";
var base = { host: 'http://localhost:3000' };

module.exports = {
    base: base,
    user_email: user_email,
    user_pass: user_pass,


    reporter: reporter.fn,
    environment: undefined,
    beforeEach: function (browser, done) {
        browser.execute(function(data) {
            return window.navigator.userAgent;
        }, [], function(result) {
            browser.globals.environment = result.value;
            done();
        });
    },

    before: function(done) {
        chromedriver.start();

        done();
    },

    after: function(done) {
        chromedriver.stop();

        done();
    }
};