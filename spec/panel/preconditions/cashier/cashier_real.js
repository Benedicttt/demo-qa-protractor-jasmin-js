describe('Add cashier to Admin project - real cashier', () => {
    describe('real_usd', () => {
        cashier_shared.run_test_case("real_usd", ["Админ", "Promotion", "Development"])
    });

    describe('real_rub', () => {
        cashier_shared.run_test_case("real_rub", ["Админ", "Promotion", "Development"])
    });

    describe('real_eur', () => {
        cashier_shared.run_test_case("real_eur", ["Админ", "Promotion", "Development"])
    });

    describe('real_rub2', () => {
        cashier_shared.run_test_case("real_rub2", ["Админ", "Promotion", "Development"])
    });
});
