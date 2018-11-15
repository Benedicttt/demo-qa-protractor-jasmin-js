describe('Add cashier to Admin project', () => {

    describe('case_1, real cashier', () => {
        cashier_shared.run_test_case("real", ["Админ", "Promotion", "Development"])
    });

    describe('case_2, virtual cashier', () => {
        cashier_shared.run_test_case("virtual", ["Админ", "Promotion", "Development"])
    });

});
