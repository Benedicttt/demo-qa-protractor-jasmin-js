module.exports =
{
    browserName: 'chrome',
    chromeOptions: {
        prefs: { 'credentials_enable_service': false },
        args: [ "--disable-gpu", "--window-size=1920x1080" ]
    }
    // shardTestFiles: false,     // allows specs to be executed in parallel.
    // maxInstances: 1,
};