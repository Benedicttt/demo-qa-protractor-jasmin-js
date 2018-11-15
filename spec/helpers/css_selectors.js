module.exports = {
    wait_id: function(id, ms){
        let until = protractor.ExpectedConditions;
        let elem = element(by.id(id));
        browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
    },

    wait_css: function(css, ms, index = null){
        let until = protractor.ExpectedConditions;

        if ( index !== null ){
            elem = element.all(by.css(css)).get(index);
        } else {
            elem = element(by.css(css));
        }

        browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
    },

    wait_xpath: function(xpath, ms, index = null){
        let until = protractor.ExpectedConditions;

        if ( index !== null ){
            let elem = element.all(by.xpath(xpath)).get(index);
            browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
        } else {
            let elem = element(by.xpath(xpath));
            browser.wait(until.presenceOf(elem), ms, 'Element taking too long to appear in the DOM');
        }
    }
};