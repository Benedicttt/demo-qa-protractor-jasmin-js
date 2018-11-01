const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/services/test_case.yml', 'utf8');
const scenarios = yaml.safeLoad(file).service;

module.exports = {
    run_test_case: function(name_case) {
        scenarios[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                browser.sleep(500)
                tag_selector.selectOption(key, value);
            })
        });

        scenarios[`${name_case}`].checkbox.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            if (Object.values(id)[0] === true) {
                it(`{ ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click();
                })
            }
        });

        scenarios[`${name_case}`].input.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();
                element(by.id(`${key}`)).sendKeys(`${value}`)
            })
        });


        it("click Save button",  () => {
            let btn = element.all(by.css("button.btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 2000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 2000);
            btn.click()
        });

        it("click accept",  () => {
            let btn = element.all(by.css("button.btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 2000);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 2000);
            btn.click()
        });

        it("assert create current service",  () => {
            browser.sleep(1000)
            let expectedUrl = browser.baseUrl + '/services';
            let EC = browser.ExpectedConditions;

            browser.wait(EC.urlContains(expectedUrl), 5000);
            browser.wait(EC.urlIs(expectedUrl), 5000);

            expect(browser.getCurrentUrl()).toEqual(expectedUrl);
        });

        it('click `filter_all`', () => {
            for_css.wait_css("#filter_all", 2000);
            for_css.wait_css(".btn.btn-primary", 2000);

            element(by.id("filter_all")).click();

            element(by.css(".btn.btn-primary")).click();
            element(by.css(".btn.btn-primary")).click()
        })

        it('sign', () => {
            for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 2000);
            helper.sign_order_xpath('//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]', 0, 1);
        });

        it('check success sign', () => {
            browser.sleep(1500);
            helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
        });
    },

    write_after_ids_service: function(params) {
        if (params = true) {
            it("write in file id`s services",  () => {
                for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[1]", 2000);
                element(by.xpath("//*[@id=\"services\"]/tbody/tr[1]/td[1]")).getText().then(function (text) {
                    let data = ` { 
                                    "service": { 
                                        "us": { 
                                            "number": ${text} 
                                            }, 
                                        "we": { 
                                            "number": ${parseInt(text) + 1 }
                                             } 
                                    }
                                 }`;

                    helper.write_in_file('service.json', data)
                });
            });
        }
    }
};