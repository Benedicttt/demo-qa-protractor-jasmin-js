module.exports = {
    "Sign in page Success": function (client) {
        let url = client.globals.base.host;
        let authorization = client.page.sign_in();

        authorization.navigate(url + "/users/sign_in")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm("user157@gmail.com", client.globals.user_pass, client)
        // alert-success
            .assert.findText("@alert-success", "Вход в систему выполнен.")
            .submit()
            .closePage()
    }
};


