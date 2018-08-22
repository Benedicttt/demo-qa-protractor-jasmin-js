exports.command = function(selector, message) {
    this
        .assert.WaitForText(selector, function (text) {
            return message === text; // this can be any expression
        })
    return this;
};
