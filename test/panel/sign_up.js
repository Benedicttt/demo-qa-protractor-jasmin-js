const text_success = "×\nВход в систему выполнен.";
const text_success_exit = "×\nВыход из системы выполнен.";
let name_attribute = "css selector";
let selector = ".error";
let error_text = "Пожалуйста, введите корректный адрес электронной почты.";
let empty_blank = "Это поле необходимо заполнить.";

module.exports = {
    "Sign up page Success": function (client) {
        let url = client.globals.base.host;
        let registration = client.page.sign_up();

        registration.navigate(url + "/users/sign_up")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm(client.globals.user_email, client.globals.user_pass, client)
            .submit()
            .closePage(client)
    },

    "Sign up page Fail": function (client) {
        client.globals.retryAssertionTimeout = 10;
        let url = client.globals.base.host;
        let registration = client.page.sign_up();

        registration.navigate(url + "/users/sign_up")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm(client.globals.user_email, client.globals.user_pass, client)
            .submit()

            .fillInForm("user157@gmail.com1", "1", client).submit()
            .search_text_in_classes(client, name_attribute, selector, error_text)

            .fillInForm("1", "", client).submit()
            .search_text_in_classes(client, name_attribute, selector, empty_blank)

            .fillInForm("", "[\!@#$%^&*()_*&\]]", client).submit()
            .search_text_in_classes(client, name_attribute, selector, empty_blank)

            .fillInForm(client.globals.user_email, "12345", client).submit()
            .search_text_in_classes(client, name_attribute, selector,  error_text)
            .search_text_in_classes(client, name_attribute, selector,  "Эл. почта уже существует")

            .fillInForm(client.globals.user_email, "12345", client).submit()
            .search_text_in_classes(client, name_attribute, selector,  "Эл. почта уже существует")

            .fillInForm("err_" + client.globals.user_email, "1", client).submit()
            .search_text_in_classes(client, name_attribute, ".alert-error > h4",  "Ошибка: сохранение не удалось из-за 1 ошибки")
            .search_text_in_classes(client, name_attribute, ".alert-error > div",  "— Пароль недостаточной длины (не может быть меньше 6 символов)")

            // .closePage(client)

    }
};
