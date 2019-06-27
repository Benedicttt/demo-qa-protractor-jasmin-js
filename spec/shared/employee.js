const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/employee/test_case.yml', 'utf8');
const scenarios = yaml.safeLoad(file).employee;

module.exports = {
    run_test_case: function(name_case) {
        it(`Go to page and check title ${page.employee.title}`,  () => {
            user_object.authorization(helper.user_email_last());

            go(page.employee.get);
            expect(browser.getTitle()).toEqual(page.employee.title);

            go(page.employee.new.get);
            expect(browser.getTitle()).toEqual(page.employee.new.title);
        });

        scenarios[`${name_case}`].selector.map(function(id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                browser.sleep(200)
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
            let random_number = Math.floor(Math.random() * 1000);

            it(`{ ${key}: ${value} }`, () => {
                element(by.id(`${key}`)).clear();
                element(by.id(`${key}`)).sendKeys(`${value}`);

                if (key === "employee_last_name" || key === "employee_name" || key === "employee_middle_name" ) {
                    element(by.id(`${key}`)).clear();
                    element(by.id(`${key}`)).sendKeys(`${value}_${random_number}`)
                }
            })
        });

        it("click translate", () => {
            element(by.id("translate")).click()
        });

        it("click Save button",  () => {
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

        it('click `set project`', () => {
            for_css.wait_css("a.btn.btn-small", globalTimeout);

            element.all(by.css("a.btn.btn-small")).get(1).click();
            for_css.wait_css('.project', globalTimeout, 0)
            browser.sleep(1000);
        })

        it('click `set all project`', () => {
            browser.executeScript("$('.project').not(this).prop('checked', true)")
            browser.sleep(200);
            element.all(by.css(".btn.btn-primary")).get(0).click();
            browser.sleep(500);

        })

        it('click `accept filter`', () => {
            element.all(by.css(".btn.btn-primary")).get(1).click();
        })

        it('check user create', () => {
            for_css.wait_xpath("//table[3]/tbody/tr", globalTimeout)

            let file = editJsonFile("./spec/support/user.json");
            let set_params = file.get()

            set_params[name_case] = {}
            set_params[name_case]['employee'] = {}

            scenarios[`${name_case}`].input.map(function(id) {
                let value = `${Object.values(id)[0]}`;
                let key = `${Object.keys(id)[0]}`;

                if ( key === "employee_last_name" ) {
                    for_css.wait_xpath(`//table[3]/tbody/tr/td[contains(text(), ${value})]/following-sibling::td[1]`, globalTimeout, 0)

                    set_params[name_case]['employee']['last_name'] = value ;
                }

                key === "employee_name"        ? set_params[name_case]['employee']['name'] = value : "";
                key === "employee_middle_name" ? set_params[name_case]['employee']['middle_name'] = value : "";
            });

            file.save()
        })
    },
};