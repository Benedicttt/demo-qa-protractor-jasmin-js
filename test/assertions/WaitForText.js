var util = require('util');
var events = require('events');

function WaitForText() {
    events.EventEmitter.call(this);
    this.startTimeInMilliseconds = null;
}

util.inherits(WaitForText, events.EventEmitter);

WaitForText.prototype.command = function (element, checker, timeoutInMilliseconds) {
    this.startTimeInMilliseconds = new Date().getTime();
    var self = this;
    var message;

    if (typeof timeoutInMilliseconds !== 'number') {
        timeoutInMilliseconds = this.api.globals.waitForConditionTimeout;
    }

    this.check(element, checker, function (result, loadedTimeInMilliseconds) {
        if (result) {
            message = 'waitForText: ' + element + '. Expression was true after ' + (loadedTimeInMilliseconds - self.startTimeInMilliseconds) + ' ms.';
        } else {
            message = 'waitForText: ' + element + '. Expression wasn\'t true in ' + timeoutInMilliseconds + ' ms.';
        }
        self.client.assertion(result, 'expression false', 'expression true', message, true);
        self.emit('complete');
    }, timeoutInMilliseconds);

    return this;
};

WaitForText.prototype.check = function (element, checker, callback, maxTimeInMilliseconds) {
    var self = this;

    this.api.getText(element, function (result) {
        var now = new Date().getTime();
        if (result.status === 0 && checker(result.value)) {
            callback(true, now);
        } else if (now - self.startTimeInMilliseconds < maxTimeInMilliseconds) {
            setTimeout(function () {
                self.check(element, checker, callback, maxTimeInMilliseconds);
            }, TestConstants.TIMEOUT_RETRY_INTERVAL);
        } else {
            callback(false);
        }
    });
};

module.exports = WaitForText;