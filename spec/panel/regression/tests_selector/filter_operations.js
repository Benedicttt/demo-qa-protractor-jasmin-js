const yaml = require('js-yaml');
const fs = require('fs');
let path = "spec/panel/test_case/testing_selectors/";
let scenarios;

describe('Testing all value in selector filters operation', () => {
    scenarios = yaml.safeLoad(fs.readFileSync(path + 'filter_operation.yml', 'utf8'));

    testing_selectors_shared.run_test_case_for("filter", "operations", scenarios);
});
