const yaml = require('js-yaml');
const fs = require('fs');
let path = "spec/panel/test_case/testing_selectors/";
let scenarios;

describe('Testing all value in selector', () => {
    describe('service new', () => {
        scenarios = yaml.safeLoad(fs.readFileSync(path + 'service_new.yml', 'utf8'));

        testing_selectors_shared.run_test_case("new", "services", "service", scenarios)
    });

    describe('demand new', () => {
        scenarios = yaml.safeLoad(fs.readFileSync(path + 'demand_new.yml', 'utf8'));

        testing_selectors_shared.run_test_case("new", "demands", "demand", scenarios)
    });

    describe('filters demand', () => {
        scenarios = yaml.safeLoad(fs.readFileSync(path + 'filter_demand.yml', 'utf8'));

        testing_selectors_shared.run_test_case_for("filter", "demands", scenarios);
    });

    describe('filters service', () => {
        scenarios = yaml.safeLoad(fs.readFileSync(path + 'filter_service.yml', 'utf8'));

        testing_selectors_shared.run_test_case_for("filter", "services", scenarios);
    });

    describe('filters operation', () => {
        scenarios = yaml.safeLoad(fs.readFileSync(path + 'filter_operation.yml', 'utf8'));

        testing_selectors_shared.run_test_case_for("filter", "operations", scenarios);
    });
});