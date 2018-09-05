describe('Home page', function() {
    runner(command.set.angular_wait_false);
    runner(command.page.base);

    let logo = element(by.css('.brand > b')).getText();
    let sign_in_link = element(by.linkText("Вход в систему")).getAttribute('href');
    let sign_up_link = element(by.linkText("Регистрация")).getAttribute('href');
    let host = "http://localhost:3000/";
    let text_center_selector = element(by.css('.text-center')).getText();
    let text_center = 'Система построения отчетов компании';

    it('should have a title', function () {
        runner(command.page.base);
        expect(browser.getTitle()).toEqual('СПОК');
    });

    it("should have a logo", function () {
        expect(logo).toEqual('СПОК');
    });

    it('should have a link sign_in', function () {
        expect(sign_in_link).toBe(host + 'users/sign_in');
    });

    it('should have a link sign_up', function () {
        expect(sign_up_link).toBe(host + 'users/sign_up');
    });

    it('should text center', function () {
        expect(text_center_selector).toEqual(text_center);
    });
});