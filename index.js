// node index.js -s ./step-definitions  # create html report
var reporter = require('cucumber-html-reporter');
 
var options = {
        theme: 'bootstrap',
        jsonFile: './reports/cucumber-report.json',
        output: './reports/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true,
        metadata: {
            "App Version":"0.0.1",
            "Test Environment": "LOCALHOST",
            "Browser": "Chrome 68.0.3440.106",
            "ChromeDriver": "2.41.578706 (5f725d1b4f0a4acbf5259df887244095596231db)",
            "Platform": "MacOS X Sierra",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };
 
    reporter.generate(options);