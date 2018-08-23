const text_success = "×\nВход в систему выполнен.";
const text_success_exit = "×\nВыход из системы выполнен.";
let name_attribute = "css selector";
let selector = ".error";
let error_text = "Пожалуйста, введите корректный адрес электронной почты.";
let empty_blank = "Это поле необходимо заполнить.";

module.exports = {
    "Sign in page Success": function (client) {
        let authorization = client.page.sign_in();
        let url = client.globals.base.host;

        authorization.navigate(url + "/users/sign_in")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm("user157@gmail.com", client.globals.user_pass, client)
            .submit()
            .assert.findText("@alert_success", text_success)
            .exitPage()
            .assert.findText("@alert_success", text_success_exit)
            .closePage(client)
    },

    "Sign in page Failed": function (client) {
        let authorization = client.page.sign_in();
        let url = client.globals.base.host;

        authorization.navigate(url + "/users/sign_in")
            .responsePage(client, 200)
            .fillInForm("user157@gmail.com1", "1", client).submit()
            .search_text_in_classes(client, name_attribute, selector, error_text)

            .fillInForm("1", "", client).submit()
            .search_text_in_classes(client, name_attribute, selector, empty_blank)

            .fillInForm("", "[\!@#$%^&*()_*&\]]", client).submit()
            .search_text_in_classes(client, name_attribute, selector, empty_blank)

            .fillInForm("user@", "1234567ddddddd", client).submit()
            .search_text_in_classes(client, name_attribute, selector, empty_blank)
            .closePage(client)
    }
};


