module.exports = {
    //TODO: Base template function for template `run test case`
    call: function () {
        browser.executeScript("$('#new_demand > div.form-actions > button')[0].click()");
        browser.sleep(2500);
        browser.executeScript("$('#new_demand > div.form-actions > button')[0].click()");

        let btn_last = element.all(by.css("button.btn-primary")).get(0);
        browser.wait(protractor.ExpectedConditions.visibilityOf(btn_last), globalTimeout);
        browser.wait(EC.elementToBeClickable(btn_last.isEnabled()), globalTimeout);
        btn_last.click();
        browser.sleep(1000);

        helper.check_current_url('/demands');
    }
};