const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const user_object = require('./spec/panel/page_object/user.js');
const helper = require('./spec/helpers/base.js');
const selectors = require('./spec/helpers/selectors.js');
const for_css = require('./spec/helpers/css_selectors.js');

const setting = yaml.safeLoad(fs.readFileSync('spec/support/settings.yml', 'utf8'));
const page = yaml.safeLoad(fs.readFileSync('spec/support/pages.yml', 'utf8'));
const form = yaml.safeLoad(fs.readFileSync('spec/support/forms.yml', 'utf8'));

const AllureReporter = require('jasmine-allure-reporter');
const { SpecReporter } = require('jasmine-spec-reporter');

const outputFilename = './spec/support/';

const demands_shared = require('./spec/shared/demands.js');
const services_shared = require('./spec/shared/services.js');
const receipts_shared = require('./spec/shared/receipts.js');
const conversion_shared = require('./spec/shared/conversion.js');

let user = JSON.parse(fs.readFileSync('./spec/support/user.json'));
let VideoReporter = require('protractor-video-reporter');


var addScreenShots = {
    specDone: function (result) {
        if (result.status === 'failed') {
            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screen', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
            });
        }
    }
};

VideoReporter.prototype.jasmineStarted = function () {
    var self = this;
    if (self.options.singleVideo) {
        var new_date = new Date().toString();
        var videoPath = path.join(self.options.baseDirectory, new_date.toString() + "protractor-specs.mpg");

        self._startScreencast(videoPath);

        if (self.options.createSubtitles) {
            self._subtitles = [];
            self._jasmineStartTime = new Date();
        }
    }
};

var videoReporter = new VideoReporter({
    baseDirectory: "/Users/benedict/work/binomo/smoke/video/",
    createSubtitles: true,
    singleVideo: true,
    ffmpegCmd: '/usr/local/bin/ffmpeg',
    ffmpegArgs: [
        '-f', 'avfoundation',
        '-i', '1',
        '-pix_fmt','yuv420p',
        '-r','24',
        '-video_size', 'woxga',
        '-q:v','10',
    ]
});

var getRandomString = function(length) {
    var string = '';
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (i = 0; i < length; i++) {
        string += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return string;
};

exports.config = {
    // seleniumAddress: 'http://localhost:9515',
    baseUrl: 'http://localhost:3000',
    // directConnect: true,
    capabilities: {
        browserName: 'firefox',
            'moz:firefoxOptions': {
                args: ['--headless']
            },

        browserName: 'chrome',
            chromeOptions: {
                args: [
                    "--no-sandbox",
                    "--disable-gpu",
                    "--window-size=1980,1080"
                ]
            },
        // shardTestFiles: true,
        // maxInstances: 2,

        browserName: 'phantomjs',
        'phantomjs.binary.path': require('phantomjs-prebuilt').path,
        'phantomjs.cli.args': ['--logfile=PATH', '--loglevel=DEBUG']  
    },
    specs: [
        "spec/panel/home_page.js",
        "spec/panel/sign_up.js",
        "spec/panel/sign_in.js",
        "spec/panel/user_access/set_user_access_full.js",
        "spec/panel/services/create.js",
        "spec/panel/**/*.js"
    ],
    allScriptsTimeout: 10000,
    getPageTimeout: 15000,

    files: [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery/dist/jquery.min.js'
    ],
    framework: 'jasmine',
    onPrepare() {
        global.getRandomString = getRandomString;

        global.admin           = 'user86@gmail.com';
        global.id_email        = 'user_email';
        global.id_pass         = 'user_password';
        global.id_pass_conf    = 'user_password_confirmation';
        global.password        = '123456';
        global.user_email      = 'spok_' + getRandomString(10) + '@gmail.com';
        global.EC              = protractor.ExpectedConditions;

        global.fs              = fs;
        global.user            = user;
        global.user_object     = user_object;
        global.setting         = setting;
        global.form            = form;
        global.page            = page;

        global.go              = helper.runner;
        global.set             = helper.runner;
        global.action          = helper.runner;

        global.helper          = helper;
        global.tag_selector    = selectors;
        global.for_css         = for_css;

        global.outputFilename  = outputFilename;

        global.demands_shared  = demands_shared;
        global.services_shared = services_shared;
        global.receipts_shared = receipts_shared;
        global.conversion_shared = conversion_shared;


        jasmine.getEnv().addReporter(addScreenShots);
        jasmine.getEnv().addReporter(new AllureReporter({
            allureReport: {
                resultsDir: './allure-results/'
            }
        }));
        jasmine.getEnv().addReporter(new SpecReporter( { displayStacktrace: 'all' } ));
        // console.log(process.env);
        process.env.recording_video === 'true' ? jasmine.getEnv().addReporter(videoReporter) : console.log("Video not recording")
    }

};
//
// arr = []
//     %w[operation demand service].each { |index| arr << index.classify }
// arr.each { |i| i.constantize.all.each { |i| i.delete } }

