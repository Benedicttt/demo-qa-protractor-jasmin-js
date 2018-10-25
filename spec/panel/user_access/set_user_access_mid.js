describe('User add full access on admin', function() {
    describe('Set mid access in user `Заявки`', () => {
        user_shared.checked_access(5)

        it('check pages and access', () =>{ });

        user_shared.unchecked_access(5)

    });

    describe('Set mid access in user `Кадры`', () => {
        user_shared.checked_access(6)

        it('check pages and access', () =>{ });

        user_shared.unchecked_access(6)
    })

    describe('Set mid access in user `Система`', () => {
        user_shared.checked_access(7)

        it('check pages and access', () =>{ });

        user_shared.unchecked_access(7)
    })

    describe('Set mid access in user `Справочники`', () => {
        user_shared.checked_access(8)

        it('check pages and access', () =>{ });

        user_shared.unchecked_access(8)
    })

    describe('Set mid access in user `Услуги`', () => {
        user_shared.checked_access(9)

        it('check pages and access', () =>{ });

        user_shared.unchecked_access(9)
    })

    describe('Set mid access in user `Фин. операции`', () => {
        user_shared.checked_access(10)

        it('check pages and access', () =>{ });

        user_shared.unchecked_access(10)
    })

    describe('Set mid access in user `Фин. показатели`', () => {
        user_shared.checked_access(12)

        it('check pages and access', () =>{ });

        user_shared.unchecked_access(12)
    })

    describe('Set mid access in user `Техничка`', () => {
        user_shared.checked_access(13)

        it('check pages and access', () =>{ });

        user_shared.unchecked_access(13)
    })
});
