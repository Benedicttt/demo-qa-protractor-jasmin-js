module.exports = {
    "Home Page": function (client) {
        var url = client.globals.base.host;
        var page = client.page.homepage();

        page.navigate(url)
            .validatePage(client, url)
            .responsePage(client, 200);
        client.end()
    }
};
