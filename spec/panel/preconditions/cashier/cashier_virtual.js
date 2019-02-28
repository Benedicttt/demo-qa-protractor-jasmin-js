describe('Add cashier to Admin project - virtual cashier', () => {
    describe('virtual_usd', () => {
        cashier_shared.run_test_case("virtual_usd", ["Админ", "Promotion", "Development"])
    });

    describe('virtual_rub', () => {
        cashier_shared.run_test_case("virtual_rub", ["Админ", "Promotion", "Development"])
    });

    describe('virtual_eur', () => {
        cashier_shared.run_test_case("virtual_eur", ["Админ", "Promotion", "Development"])
    });

    describe('virtual_rub2', () => {
        cashier_shared.run_test_case("virtual_rub2", ["Админ", "Promotion", "Development"])
    });
});
