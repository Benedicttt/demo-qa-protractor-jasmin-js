module.exports = {
    call: function() {
        browser.sleep(1000);

        let notify = element.all(by.css('#queue_regular_payment_notification > span > a'));

        expect(notify.get(0).isPresent()).toBe(true);

        notify.count().then(function (n) {
            for(let a = 0; a < n; a++){
                element.all(by.css('#queue_regular_payment_notification > span > a')).get(0).click();
                browser.sleep(500);
            }
            let first_notify = element(by.css('#queue_regular_payment_notification > span > a'));
            first_notify.isPresent() === true ? first_notify.click() : expect(first_notify.isPresent()).toBe(false);
        });
    }
};
