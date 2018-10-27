const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/services/test_case.yml', 'utf8')
const scenarios = yaml.safeLoad(file).service;

module.exports = {
    run_test_case: function(name_case) {
        scenarios[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`
            let key = `${Object.keys(id)[0]}`

            it(`{ ${key}: ${value} }`, () => {
                tag_selector.selectOption(key, value)
            })
        });

        scenarios[`${name_case}`].checkbox.map(function(id) {
            let value = `${Object.values(id)[0]}`
            let key = `${Object.keys(id)[0]}`

            if (Object.values(id)[0] === true) {
                it(`{ ${key}: ${value} }`, () => {
                    element(by.id(`${key}`)).click()
                    browser.sleep(100)
                })
            }
        });

        scenarios[`${name_case}`].input.map(function(id) {
            let value = `${Object.values(id)[0]}`
            let key = `${Object.keys(id)[0]}`

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear()
                element(by.id(`${key}`)).sendKeys(`${value}`)
            })
        });


        services_shared.buttons();

        it('click `filter_all`', () => {
            for_css.wait_css("#filter_all", 2300);
            for_css.wait_css(".btn.btn-primary", 2300)

            element(by.id("filter_all")).click();

            element(by.css(".btn.btn-primary")).click()
            element(by.css(".btn.btn-primary")).click()
        })

        it('sign', () => {
            for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 2500);
            helper.sign_order_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", 0, 1);
        });

        it('check success sign', () => {
            browser.sleep(1500)
            helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
        });
    },

    buttons: function() {
        it("click Save button",  () => {
            let btn = element.all(by.css("button.btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 2500);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 2500);
            btn.click()
        });

        it("click accept",  () => {
            let btn = element.all(by.css("button.btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), 2500);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), 2500);
            btn.click()
        });

        it("assert create current service",  () => {
            let expectedUrl = browser.baseUrl + '/services';
            let EC = browser.ExpectedConditions;

            browser.wait(EC.urlContains(expectedUrl), 2500);
            browser.wait(EC.urlIs(expectedUrl), 2500);
            expect(browser.getCurrentUrl()).toEqual(expectedUrl);
        });
    },


    write_after_ids_service: function(boolean) {
        if (boolean = true) {
            for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[1]", 2300);
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
        }
    }

};