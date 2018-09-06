'use strict';
var helpers = require('/Users/benedict/work/binomo/smoke/spec/helpers/helpers.js');

describe('Demands', function () {
    runner(command.set.angular_wait_false);
    beforeAll(function () {

    });

    it('Go to page', function () {
        helpers.authorization_last_user

        runner(command.page.demands_new);
        browser.sleep(1000);
        expect(browser.getTitle()).toEqual(title_demands);
    });
});
