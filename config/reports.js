const AllureReporter   = require('jasmine-allure-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');

const addScreenShots = {
    specDone: function (result) {
        // if (result.status === 'failed') {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screen', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
            });
        // }
    }
};

module.exports = {
    call_settings: function() {
        jasmine.getEnv().addReporter(addScreenShots);
        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: './allure-results/'
        }));

        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
    }
}