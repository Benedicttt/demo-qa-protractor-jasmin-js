module.exports = {
    user_email_last: function () {
        return JSON.parse(fs.readFileSync('./spec/support/user.json'))['user']['email'];
    },

    user_password_last: function () {
        return JSON.parse(fs.readFileSync('./spec/support/user.json'))['user']['password'];
    },

    created_services: function (who) {
        return JSON.parse(fs.readFileSync('./spec/support/service.json'))['service'][who]['number'];
    },

    runner: function(string_command) {
        const test = new Function(string_command);
        test();
    },

    set_input_value: function(id, string) {
        element(by.id(id)).clear();
        return element(by.id(id)).sendKeys(string);
    },

    get_input_attr: function(id, value) {
        return element(by.id(id)).getAttribute(value);
    },

    sign_and_paid_xpath: function(index, tag_name, name_column, name_title) {
        let current_xpath = `*//*[@id='demands']//thead/tr/th[${index}]${tag_name}[contains(text(), \"${name_column}\")]/following::*//td[${index}]/a[@title=\"${name_title}\"]/child::*`

        for_css.wait_xpath(current_xpath, globalTimeout);
        return element.all(by.xpath(current_xpath)).get(0);
    },

    check_current_url: function(pathname) {
        browser.getCurrentUrl().then(function(a){
            let expectedUrl = browser.baseUrl + pathname;
            let url = new Url(a);
            expect(url['origin'] + url['pathname']).toEqual(expectedUrl);

        });
    },

    addCookie: function() {
        browser.get("/");
        browser.manage().deleteAllCookies();
        browser.driver.manage().addCookie(
            {
                'httpOnly': true,
                'name': user.cookie.name,
                'path': '/',
                'secure': false,
                'value': user.cookie.value
            }
        );
        browser.get("/");
    },

    sign_order_xpath: function (xpath_elem, index_elem, count_click) {
        for_css.wait_xpath(xpath_elem, globalTimeout);
        element.all(by.css('.btn.btn-mini')).get(index_elem).click().then(function () {
            browser.sleep(1500);
            for_css.wait_css('#modal form', globalTimeout);
            if (count_click > 0) {
                element(by.css('#modal form')).submit();
                browser.sleep(1000);
                element(by.css('#modal form')).submit();
            } else {
                element(by.css('#modal form')).submit();
            }
            browser.sleep(1000);
        });
    },

    check_success_sign: function (css, index_elem = 0, expect_text = null, log = false){
        element.all(by.css('td.no-wrap > a, td.no-wrap > span')).get(0).getText().then((text) => {
            if ( text === '. . . . . .' ) {
                for_css.wait_xpath('//*[@id="demands"]/tbody/tr[2]/td[11]/a[1][contains(text(), "Не подписана")]', 10000)
            }
        });

        for_css.wait_css("td.no-wrap > a, td.no-wrap > span", globalTimeout);
        browser.sleep(1000);
        element.all(by.css(css)).get(index_elem).getText().then(function (result) {
            if ( log === true) { console.log(result, index_elem) }
            expect(result).toEqual(expect_text)
        })
    },

    get_and_check_document: function(type, query) {
        it(`${type} document check in popup`, () => {
            for_css.wait_css(".show_entities > a", globalTimeout + 3000)

            let text_in_popup = element.all(by.css(".show_entities"));
            let current_document = [];

            text_in_popup.getText().then(function (value) {
                let arr = value[0].split('\n')
                arr.map(function (current_obj) {

                    if (current_obj.split(':')[0] === type) {
                        var list = current_obj.split(/,\s*/);

                        list.forEach(function(e) {
                            if (current_obj.split(':')[0] === type) {

                                let elem = element(by.xpath(`//span[@class=\"show_entities\"]/a[contains(text(), ${e.split(':').pop()})]`));

                                elem.getAttribute('href').then(function (value) {
                                    let id = value.match(/\d+/g).slice(-1)[0];
                                    console.log(`Check TRUE: ${current_obj.split(':')[0]} - "${e.split(':').pop()}" ${browser.baseUrl}${query}${id}`);

                                    expect(value).toEqual(browser.baseUrl + query + id);
                                });
                            }
                        });

                    }

                });

                arr.map(function (current_obj) {
                    current_document.push(current_obj.split(':')[0])
                });

                expect(current_document).toContain(type);

            });

        });
    },

    check_data_popup: function(name_case, type = null) {
        it('Find popup', () => {
            for_css.wait_css(".btn-group .icon-info-sign", globalTimeout);
            let current_popup = element.all(by.css(".btn-group i.icon-info-sign")).get(0)
            current_popup.click();

            expect(current_popup.isDisplayed()).toBeTruthy();
            for_css.wait_css(".popover-title", globalTimeout, 0)
        });

        //TODO: DDS
        if (type[`${name_case}`].check_data_popup_dds ===  true) {
            helper.get_and_check_document("ДДС", "/fin_indicators/operations/highlight_operation?operation_id=")
        }

        if (type[`${name_case}`].check_data_popup_dds_comission ===  true) {
            helper.get_and_check_document("ДДС комиссии", "/fin_indicators/operations/highlight_operation?operation_id=")
        }

        if (type[`${name_case}`].check_data_popup_dds_comission_conversion ===  true) {
            helper.get_and_check_document("ДДС комиссии Конвертации", "/fin_indicators/operations/highlight_operation?operation_id=")
        }

        //TODO: SERVICES
        if (type[`${name_case}`].check_data_popup_service_comission_conversion ===  true) {
            helper.get_and_check_document("Услуга комиссии Конвертации", "/services/highlight_service?service_id=")
        }

        if (type[`${name_case}`].check_data_popup_service_comission ===  true) {
            helper.get_and_check_document("Услуга комиссии", "/services/highlight_service?service_id=")
        }

        if (type[`${name_case}`].check_data_popup_service ===  true) {
            helper.get_and_check_document("Услуга", "/services/highlight_service?service_id=")
        }

        if (type[`${name_case}`].check_data_popup_services ===  true) {
            helper.get_and_check_document("Услуги", "/services/highlight_service?service_id=")
        }

        //TODO: DEMANDS
        if (type[`${name_case}`].check_data_popup_demand ===  true) {
            helper.get_and_check_document("Заявка", "/demands/highlight_demand?demand_id=")
        }

        //TODO: NDS
        if (type[`${name_case}`].check_data_nds_us ===  true) {
            helper.get_and_check_document("Услуга ндс нам", "/services/highlight_service?service_id=")
        }

        if (type[`${name_case}`].check_data_nds_we ===  true) {
            helper.get_and_check_document("Услуга ндс мы", "/services/highlight_service?service_id=")
        }

    }
};