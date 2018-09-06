describe('Demands', () => {
    beforeAll( () => {
        user_object.authorization(user.user.email);
        go(page.demands.get)
    });

    it(`Go to page and check title ${page.demands.title}`,  () => {
        expect(browser.getTitle()).toEqual(page.demands.title);
    });

    it(`Go to page and check title ${page.demands_new.title}`,  () => {
        go(page.demands_new.get);
        expect(browser.getTitle()).toEqual(page.demands_new.title);
    });

    describe('Create', () => {
        describe('Fill form', () => {
            it(``,  () => {

            });

        })
    })
});
