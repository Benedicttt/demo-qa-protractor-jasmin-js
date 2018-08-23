module.exports = {
    "Sign up page Success": function (client) {
        var url = client.globals.base.host;
        var registration = client.page.sign_up();

        registration.navigate(url + "/users/sign_up")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm(client.globals.user_email, client.globals.user_pass, client)
            .submit()
            .closePage(client)
    },

    "Sign up page Fail": function (client) {
        var url = client.globals.base.host;
        var registration = client.page.sign_up();

        registration.navigate(url + "/users/sign_up")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm(client.globals.user_email, client.globals.user_pass, client)
            .submit()
            // need validate

            .closePage(client)

    }
};
