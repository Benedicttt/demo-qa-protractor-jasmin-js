const text_success = "×\nВход в систему выполнен.";

module.exports = {
    // "Sign in page Success": function (client) {
    //     let url = client.globals.base.host;
    //     let authorization = client.page.sign_in();
    //
    //     authorization.navigate(url + "/users/sign_in")
    //         .responsePage(client, 200)
    //         .validateForm(client, url)
    //         .fillInForm("user157@gmail.com", client.globals.user_pass, client)
    //         .submit()
    //         .assert.findText("@alert_success", text_success)
    //         .closePage(client);
    // },

    "Sign in page Failed": function (client) {
        let url = client.globals.base.host;
        let authorization = client.page.sign_in();

        let name_attribute = "css selector";
        let selector = ".error";
        let error_text = "Пожалуйста, введите корректный адрес электронной почты.";
        let empty_blank = "Это поле необходимо заполнить.";

        authorization.navigate(url + "/users/sign_in")
            .responsePage(client, 200)
            .fillInForm("user157@gmail.com1", "1", client)
            .submit()
            .search_text_in_classes(client, name_attribute, selector, error_text)

            .fillInForm("1", "", client)
            .submit()
            .search_text_in_classes(client, name_attribute, selector, empty_blank)

            // .verify.containsText('@alert_validate_text', "Пожалуйста, введите корректный адрес электронной почты.")
            // .verify.containsText('@empty_blank_email', "Это поле необходимо заполнить.")
            // .verify.containsText('@empty_blank_password', "Это поле необходимо заполнить.")
            // .verify.valueContains('@username', '')
            // .verify.valueContains('@password', '')
        //
    }
};


