const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/test_case_cashier.yml', 'utf8');
const scenarios = yaml.safeLoad(file).project;

module.exports = {
    run_test_case: function(name_case, project) {
        let file = editJsonFile("./spec/support/user.json");

        it(`Go to page and check title ${page.references.title}`,  () => {
            user_object.authorization(helper.user_email_last());

            go(page.references.get);
            expect(browser.getTitle()).toEqual(page.references.title);
        });

        project.map(function(name) {
            file.set(`project.cashier.${name}.${name_case}`, {});
            file.save();

            scenarios[`${name_case}`].selector.map(function(id) {
                let value = `${Object.values(id)[0]}`;
                let key = `${Object.keys(id)[0].split("account_")}`.replace(/,/, '');

                file.set(`project.cashier.${name}.${name_case}.${key}`, value);
                file.save();

            });
            scenarios[`${name_case}`].input.map(function(id) {
                let value = `${Object.values(id)[0]}`;
                let key = `${Object.keys(id)[0].split("account_")}`.replace(/,/, '');

                file.set(`project.cashier.${name}.${name_case}.${key}`, value);
                file.save();
            })

        });

        project.map(function(name){
            it(`\nEdit cashier in ${name}`, () => {
                for_css.wait_xpath(`//td[contains(text(), "${name}")]/following::*//i[@class='icon-book']`, globalTimeout, 0)
                element.all(by.xpath(`//td[contains(text(), "${name}")]/following::*//i[@class='icon-book']`)).get(0).click()
            });

            it(`click btn "Add cashier"`, () => {
                for_css.wait_css(".btn.btn-small", globalTimeout, 1)
                element.all(by.css(".btn.btn-small")).get(1).click()
            });

            it(`fill form ${name} ${name_case}`, () => {
                for_css.wait_id("account_kind_id", globalTimeout);

                scenarios[`${name_case}`].input.map(function(id){
                    let value = `${Object.values(id)[0]}`;
                    let key = `${Object.keys(id)[0]}`;

                    element(by.id(key)).sendKeys(name + " " + value + " " + name_case + "_" + getRandomString(10))
                });

                scenarios[`${name_case}`].selector.map(function(id) {
                    let value = `${Object.values(id)[0]}`;
                    let key = `${Object.keys(id)[0]}`;

                    tag_selector.selectOption(key, value);
                });
            });

            it(`click btn "Save"`, () => {
                for_css.wait_css(".btn-primary", globalTimeout, 0)
                element(by.css(".btn-primary")).click()

                go(page.references.get);
            })

        });
    }
};