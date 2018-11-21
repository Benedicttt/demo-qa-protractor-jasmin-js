module.exports = {
    call: function() {
        for_css.wait_id('demand_is_advanced_payment', globalTimeout);
        element(by.id('demand_is_advanced_payment')).click();
        expect(element(by.id('demand_is_advanced_payment')).getAttribute('checked')).toBeTruthy();
        for_css.wait_id('create_payment', globalTimeout);
        element(by.id('create_payment')).click();
        for_css.wait_id('payment_amount', globalTimeout);
        element(by.id('payment_amount')).sendKeys(101);

        element.all(by.css(".btn-primary")).get(0).click()
    }
};