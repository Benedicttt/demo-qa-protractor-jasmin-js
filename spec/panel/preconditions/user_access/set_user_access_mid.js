describe('Set mid access in user  on `Заявки`', () => {
    user_shared.checked_access(5);

    it('authorization user', () => {
        user_object.authorization(helper.user_email_last());
    });

    it('check menu in header', () =>{
        let equal = [ 'СПОК', 'Заявки', helper.user_email_last().toLowerCase(), '', '', 'a.petrov@404-group.com' ]

        for_css.wait_css("a", 3000);

        element.all(by.css("a")).map(function(item) {
            return item.getText();
        }).then(function(labels) {
            expect(labels).toEqual(equal);
        });
    });

    it('Demands create and check select', () =>{
        element.all(by.css("a")).map(function(item) {
            return item.getText()

        }).then( (text) => {
            text.map( (text_elem) => {
                if ( text_elem === "Заявки" ) {
                    tag_selector.from_text("css", "a", 'Заявки', 'click');
                }
            });

        });
        // browser.sleep(10000000)
    });


    // user_shared.unchecked_access(5);
});

    // describe('Set mid access in user  on `Кадры`', () => {
    //     user_shared.unchecked_access(6);
    //
    //     it('check pages and access', () =>{ });
    //
    //     user_shared.checked_access(6);
    // });
    //
    // describe('Set mid access in user  on `Система`', () => {
    //     user_shared.unchecked_access(7);
    //
    //     it('check pages and access', () =>{ });
    //
    //     user_shared.checked_access(7);
    // });
    //
    // describe('Set mid access in user  on `Справочники`', () => {
    //     user_shared.unchecked_access(8);
    //
    //     it('check pages and access', () =>{ });
    //
    //     user_shared.checked_access(8);
    // });
    //
    // describe('Set mid access in user  on `Услуги`', () => {
    //     user_shared.unchecked_access(9);
    //
    //     it('check pages and access', () =>{ });
    //
    //     user_shared.checked_access(9);
    // });
    //
    // describe('Set mid access in user  on `Фин. операции`', () => {
    //     user_shared.unchecked_access(10);
    //
    //     it('check pages and access', () =>{ });
    //
    //     user_shared.checked_access(10);
    // });
    //
    // describe('Set mid access in user  on `Фин. показатели`', () => {
    //     user_shared.unchecked_access(12);
    //
    //     it('check pages and access', () =>{ });
    //
    //     user_shared.checked_access(12);
    // });
    //
    // describe('Set mid access in user  on `Техничка`', () => {
    //     user_shared.unchecked_access(13);
    //
    //     it('check pages and access', () =>{ });
    //
    //     user_shared.checked_access(13);
    // });
