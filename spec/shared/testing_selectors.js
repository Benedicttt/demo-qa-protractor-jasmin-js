const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/testing_selectors/test_case.yml', 'utf8');
const scenarios = yaml.safeLoad(file);

module.exports = {
    run_test_case: function(name_case, subject) {
        it(`Go to page and check title ${page[subject].title}`,  () => {
            user_object.authorization(helper.user_email_last());

            go(page[subject].new.get);
        });

        scenarios[subject][name_case].selector.map(function (id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            Object.values(id)[0].map(function (val) {
                it(`{ ${key}: ${val} }`, () => {
                    browser.sleep(500);
                    tag_selector.selectOption(key, val);
                })
            })
        });
    }
};