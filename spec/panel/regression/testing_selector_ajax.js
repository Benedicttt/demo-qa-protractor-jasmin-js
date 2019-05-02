describe('Testing all value in selector in service new', () => {
    testing_selectors_shared.run_test_case("new", "services", "service")
});

describe('Testing all value in selector deamnd new', () => {
    testing_selectors_shared.run_test_case("new", "demands", "demand")
});

fdescribe('Testing all value in selector filters', () => {
    testing_selectors_shared.run_test_case_for("filter", "demands");
});