const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/testing_selectors/test_case.yml', 'utf8');
const scenarios = yaml.safeLoad(file).service;

module.exports = {
    run_test_case: function(name_case, subject) {
        it(`Go to page and check title ${page[subject].title}`,  () => {
            user_object.authorization(helper.user_email_last());

            go(page[subject].new.get);
        });

        // scenarios[`${name_case}`].selector.map(function (id) {
        //     let value = `${Object.values(id)[0]}`;
        //     let key = `${Object.keys(id)[0]}`;
        //
        //     it(`{ ${key}: ${value} }`, () => {
        //         browser.sleep(500);
        //         tag_selector.selectOption(key, value);
        //     })
        // });
    }
};