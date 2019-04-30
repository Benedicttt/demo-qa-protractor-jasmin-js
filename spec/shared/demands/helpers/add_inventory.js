module.exports = {
    //TODO: Add inventory
    call: function () {
        for_css.wait_id("demand_contractor_type_id", globalTimeout);
        tag_selector.selectOption('demand_contractor_type_id', "--  На имущество");
        for_css.wait_id("demand_contractor_id", globalTimeout);

        browser.sleep(1000);
        tag_selector.selectOption('demand_contractor_id', " P1");

        for_css.wait_id('link_service_properties', globalTimeout);
        element(by.id('link_service_properties')).click();
        browser.sleep(1000);

        for_css.wait_id('service_properties_amount', globalTimeout);
        element(by.id('service_properties_amount')).sendKeys('1');
        element(by.id('service_properties_name')).sendKeys('--  На имущество');
        element.all(by.css('.btn-primary')).get(0).click();
        browser.sleep(1000);

        tag_selector.selectOption('demand_contractor_id', " P1");
    }
};
