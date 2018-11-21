module.exports = {
    call: function(arr) {
        for_css.wait_id('demand_is_distributed', globalTimeout);
        element(by.id('demand_is_distributed')).click();

        expect(element(by.id('demand_is_distributed')).getAttribute('checked')).toBeTruthy();

        arr.map(function(e){
            let data_int     = e.split(",")[0];
            let data_project = e.split(",")[1].toString();

            element(by.id('create_distribution')).click();
            for_css.wait_id('distribution_share', globalTimeout);
            browser.sleep(2000);

            tag_selector.selectOption("distribution_project_id", data_project);

            element.all(by.css(".icon-plus-sign")).get(0).click();
            for_css.wait_id("expenditure_name", globalTimeout);
            element(by.id('expenditure_name')).sendKeys(data_project);

            element.all(by.css(".btn-primary")).get(0).click();
            tag_selector.selectOption("distribution_expenditure_id", data_project)

            browser.executeScript(`$('#distribution_share').val(${parseFloat(data_int)})`);

            element.all(by.css(".btn-primary")).get(0).click()

        });

    }
};