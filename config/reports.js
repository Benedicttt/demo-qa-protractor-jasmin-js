const AllureReporter   = require('jasmine-allure-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');
const errors_count     = [];

const addScreenShots = {
    specDone: function (result) {
        if (result.status === 'failed') {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screen', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
            });
        }

        if (result.failedExpectations.length > 0) {
            errors_count.push(1);
        }

        if (errors_count.length > parseInt(process.env.FailFast)) {
            console.log(`\nKill proccess ${process.pid}, because ${errors_count.length} tests is failed`);
            process.kill(process.pid)
        }
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