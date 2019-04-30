const yaml = require('js-yaml');
const fs = require('fs');
let file = fs.readFileSync('spec/panel/test_case/testing_selectors/test_case.yml', 'utf8');
const scenarios = yaml.safeLoad(file);

module.exports = {
    run_test_case: function(name_case, subject, type) {
        it(`Go to page and check title ${page[subject].title}`,  () => {
            user_object.authorization(admin);
            // user_object.authorization(helper.user_email_last());
            go(page[subject].new.get);
        });

        scenarios[subject][type][name_case].selector.map(function (id) {
            let key = `${Object.keys(id)[0]}`;

            Object.values(id)[0].map(function (val) {
                let obj = Object.values(val)[0];
                let id = Object.keys(obj)[0];
                let value = Object.values(obj)[0];

                if (id === "0") {
                    it(`{ ${type + "_" + key}: ${val} }`, () => {
                        browser.sleep(500);
                        tag_selector.selectOption(type + "_" + key, val);
                    })
                } else {
                    it(`{ ${type + "_" + key}: ${Object.keys(val)[0]} }`, () => {
                        browser.sleep(500);
                        tag_selector.selectOption(type + "_" + key, Object.keys(val)[0]);
                    });

                    value.map(function (index, index_item) {
                        it(`{ ${type + "_" + id}: ${index} }`, () => {
                            if (index_item === 0) { browser.sleep(1000); }

                            tag_selector.selectOption(type + "_" + id, index)
                        });
                    })
                }
            })
        });
    }
};