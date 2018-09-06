module.exports = {
    wait_id: function(id, ms){
        let until = protractor.ExpectedConditions;
        elem = element(by.id(id));
        browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
    } ,

    wait_css: function(css, ms){
        let until = protractor.ExpectedConditions;
        elem = element(by.css(css));
        browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
    } ,

    wait_xpath: function(xpath, ms){
        let until = protractor.ExpectedConditions;
        elem = element(by.xpath(xpath));
        browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
    }
};