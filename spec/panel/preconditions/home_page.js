describe('Home page', function() {
    set(setting.angular_wait_false);
    go(page.base.get);

    it('should have a title', function () {

        expect(browser.getTitle()).toEqual(page.base.title);
    });

    it("should have a logo", function () {
        let logo = element(by.css('.brand > b')).getText();

        expect(logo).toEqual('Б.СПОК');
    });

    it('should have a link sign_in', function () {
        let sign_in_link = element(by.linkText("Вход в систему")).getAttribute('href');

        expect(sign_in_link).toBe(browser.baseUrl + "/users/sign_in");
    });

    it('should have a link sign_up', function () {
        let sign_up_link = element(by.linkText("Регистрация")).getAttribute('href');

        expect(sign_up_link).toBe(browser.baseUrl + "/users/sign_up");
    });

    it('should text center', function () {
        let text_center_selector = element(by.css('.text-center')).getText();
        let text_center = 'Система построения отчетов компании';

        expect(text_center_selector).toEqual(text_center);
    });
});