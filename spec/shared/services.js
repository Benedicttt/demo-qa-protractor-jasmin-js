const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/services/test_case.yml', 'utf8');
const scenarios = yaml.safeLoad(file).service;

module.exports = {
    run_test_case: function(name_case) {
        it(`Go to page and check title ${page.services.title}`,  () => {
            user_object.authorization(admin);
            go(page.services.get);
            expect(browser.getTitle()).toEqual(page.services.title);

            go(page.services.new.get);
            expect(browser.getTitle()).toEqual(page.services.new.title);
        });

        scenarios[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                browser.sleep(500);
                tag_selector.selectOption(key, value);
            })
        });

        scenarios[`${name_case}`].input.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();
                element(by.id(`${key}`)).sendKeys(`${value}`);

                element(by.id(`${key}`)).clear();
                element(by.id(`${key}`)).sendKeys(`${value}`)

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



        it("click Save button",  () => {
            browser.sleep(1000);
            let btn = element.all(by.css("button.btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), globalTimeout);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), globalTimeout);
            btn.click()
        });

        it("click accept",  () => {
            let btn = element.all(by.css("button.btn-primary")).get(0);
            let EC = protractor.ExpectedConditions;

            browser.wait(protractor.ExpectedConditions.visibilityOf(btn), globalTimeout);
            browser.wait(EC.elementToBeClickable(btn.isEnabled()), globalTimeout);
            btn.click()
        });

        it("assert create current service",  () => {
            browser.sleep(1000);

            helper.check_current_url('/services');
        });

        it('click `filter_all`', () => {
            browser.get(browser.getCurrentUrl() + "&per_page=5")

            // for_css.wait_css("#filter_all", globalTimeout);
            // for_css.wait_css(".btn.btn-primary", globalTimeout);
            //
            // element(by.id("filter_all")).click();
            //
            // element(by.css(".btn.btn-primary")).click();
            // element(by.css(".btn.btn-primary")).click()
            browser.sleep(500);
        })

        it('sign', () => {
            // go(page.services.get);
            // browser.sleep(1500);

            for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]", globalTimeout);
            helper.sign_order_xpath('//*[@id=\"services\"]/tbody/tr[1]/td[11]/a[2]', 0, 1);
        });

        it('check success sign', () => {
            browser.sleep(1500);
            helper.check_success_sign("td.no-wrap > a, td.no-wrap > span", 0, "Подписана");
        });
    },

    write_after_ids_service: function(boolean_type) {
        if (boolean_type === true) {
            it("write in file id`s services",  () => {
                for_css.wait_xpath("//*[@id=\"services\"]/tbody/tr[1]/td[1]", globalTimeout);
                element(by.xpath("//*[@id=\"services\"]/tbody/tr[1]/td[1]")).getText().then(function (text) {

                    let file = editJsonFile("./spec/support/service.json");
                    let set_params  = file.get();

                    set_params["service"] = {};
                    set_params["service"]['us'] = {};
                    set_params["service"]['we'] = {};
                    set_params["service"]["us"]['number'] =  text;
                    set_params["service"]["we"]['number'] =  `${parseInt(text) + 1}`;
                    file.save()
                });
            });
        }
    }
};