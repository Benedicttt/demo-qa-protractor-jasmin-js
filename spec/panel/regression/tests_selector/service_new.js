const yaml = require('js-yaml');
const fs = require('fs');
let path = "spec/panel/test_case/testing_selectors/";
let scenarios;

describe('Testing all value in selector service new', () => {
    scenarios = yaml.safeLoad(fs.readFileSync(path + 'service_new.yml', 'utf8'));

    testing_selectors_shared.run_test_case("new", "services", "service", scenarios)
});