module.exports = {
    run_test_case_for: function(name_case, type, scenarios) {
        it(`Go to page`,  () => {
            user_object.authorization(admin);
            go(page[type].get);
        });

        scenarios[name_case][type].selector_filter.map(function (id) {
            let value = `${Object.values(id)[0]}`;
            let key = `${Object.keys(id)[0]}`;

            it(`{ ${key}: ${value} }`, () => {
                browser.sleep(200);
                tag_selector.selectOption("filter_add", value);
            })
        });

        scenarios[name_case][type].selector_filter_first_level.map(function (id) {
            let value = `${Object.values(id)[0]}`;
            let key = `filter_${Object.keys(id)[0]}`;

            value.split(",").map(function (index, index_item) {
                it(`{ ${key} : ${index} }`, () => {
                    if (index_item === 0) { browser.sleep(1000); }

                    if (key !== "filter_author_id") {
                        let path = `//*[@id="${key}"]/select/option[contains(text(), "${index}")]`;
                        let until = protractor.ExpectedConditions;
                        let elem = element(by.xpath(path));

                        browser.wait(until.presenceOf(elem), 3000, 'Element taking too long to appear in the DOM').then(function(){
                            element(by.xpath(path)).click();
                        });

                    } else {
                        let path = `//*[@id="${key}"]/select/optgroup/option[contains(text(), "${index}")]`;
                        let until = protractor.ExpectedConditions;
                        let elem = element(by.xpath(path));

                        browser.wait(until.presenceOf(elem), 3000, 'Element taking too long to appear in the DOM').then(function(){
                            element(by.xpath(path)).click();
                        });
                    }

                })

            });
        });

        if (scenarios[name_case][type].selector_filter_two_level == undefined) { return true }

        scenarios[name_case][type].selector_filter_two_level.map(function (id) {
            let key = `${Object.keys(id)[0]}`;

            Object.values(id)[0].map(function (val) {
                let obj = Object.values(val)[0];
                let id = Object.keys(obj)[0];
                let value = Object.values(obj)[0];

                if (id === "0") {
                    it(`{ ${name_case + "_" + key}: ${val} }`, () => {
                        browser.sleep(500);
                        tag_selector.selectOption(name_case + "_" + key, val);
                    })
                } else {
                    it(`{ ${name_case + "_" + key}: ${Object.keys(val)[0]} }`, () => {
                        browser.sleep(500);
                        tag_selector.selectOption(name_case + "_" + key, Object.keys(val)[0]);
                    });

                    value.map(function (index, index_item) {
                        it(`{ ${name_case + "_" + id}: ${index} }`, () => {
                            if (index_item === 0) { browser.sleep(1000); }
                            tag_selector.selectOption(name_case + "_" + id, index)
                        });
                    })
                }
            })

        })
    },

    run_test_case: function(name_case, subject, type, scenarios) {
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