module.exports = {
    "Sign up page": function (client) {
        var url_sign_up = client.globals.base.host;
        var registration = client.page.sign_up();

        registration.navigate(url_sign_up + "/users/sign_up")
            .validateForm(client, url_sign_up)
            .fillInForm(client.globals.user_email, client.globals.user_pass, client)
            .submit()
            .responsePage(client, 200);
        client.end();
    },

    "Sign in page": function (client) {
        let url_sign_in = client.globals.base.host;
        let authorization = client.page.sign_in();

        authorization.navigate(url_sign_in + "/users/sign_in")
            .validateForm(client, url_sign_in)
            .fillInForm(client.globals.user_email, client.globals.user_pass, client)
            .submit()
            .responsePage(client, 200);
            client.end();
    }
};


