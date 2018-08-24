module.exports = {
    "Home Page": function (client) {
        var url = client.globals.base.host;
        let authorization = client.page.sign_in();

        authorization.navigate(url + "/users/sign_in")
            .responsePage(client, 200)
            .validateForm(client, url)
            .fillInForm("user29@gmail.com", client.globals.user_pass, client)
            .submit();

        client
    }
};
