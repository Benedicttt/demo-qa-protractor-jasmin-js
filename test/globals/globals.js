var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: false,
    reportsDirectory: 'reports',
    themeName: 'cover'
});

var base = {
    host: 'http://localhost:3000'
};

module.exports = {
    reporter: reporter.fn,
    base: base,
    environment: undefined,
    beforeEach: function (browser, done) {
        browser.execute(function(data) {
            return window.navigator.userAgent;
        }, [], function(result) {
            browser.globals.environment = result.value;
            done();
        });
    }
};

