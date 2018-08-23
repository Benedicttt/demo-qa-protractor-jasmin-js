module.exports = {
    "Sign up page(1)": function (client) {
        var url = client.globals.base.host;
        var registration = client.page.sign_up();

        registration.navigate(url + "/users/sign_up")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm(client.globals.user_email, client.globals.user_pass, client)
            .submit()
            .closePage(client)
    },

    "Sign up page(2)": function (client) {
        var url = client.globals.base.host;
        var registration = client.page.sign_up();

        registration.navigate(url + "/users/sign_up")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm(client.globals.user_email, client.globals.user_pass, client)
            .submit()
            // need validate

            .closePage(client)

    },

    "Sign in page": function (client) {
        let url = client.globals.base.host;
        let authorization = client.page.sign_in();

        authorization.navigate(url + "/users/sign_in")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm(client.globals.user_email, client.globals.user_pass, client)
            .submit()
            .closePage(client)
    }
};


