module.exports = {
        create_user:
    [
        "../spec/panel/preconditions/sign_up.js",
        "../spec/panel/preconditions/home_page.js",
        "../spec/panel/preconditions/sign_in.js"
    ],

        create_users:
    [
        "../spec/panel/preconditions/create_ten_users.js"
    ],

        add_accesses:
    [
        "../spec/panel/preconditions/user_access/set_user_access_full.js"
    ],

        cashier:
    [
        "../spec/panel/preconditions/cashier/cashier_real.js",
        "../spec/panel/preconditions/cashier/cashier_virtual.js"
    ],

        create_services:
    [
        "../spec/panel/preconditions/services/us.js",
        "../spec/panel/preconditions/services/we.js"
    ],

        preconditions:
    [
        "../spec/panel/preconditions/sign_up.js",
        "../spec/panel/preconditions/home_page.js",
        "../spec/panel/preconditions/sign_in.js",
        "../spec/panel/preconditions/user_access/set_user_access_full.js",
        "../spec/panel/preconditions/cashier/cashier_real.js",
        "../spec/panel/preconditions/cashier/cashier_virtual.js",
        "../spec/panel/preconditions/employee.js",
        "../spec/panel/preconditions/services/us.js",
        "../spec/panel/preconditions/services/we.js"
    ],

        employee:
    [
        "../spec/panel/preconditions/employee.js"
    ],

        regression:
    [
        "../spec/panel/regression/**/*.js"
    ],

        demands:
    [
        "../spec/panel/regression/demands/return.js",
        "../spec/panel/regression/demands/service.js"
    ],
        finances:
    [
        "../spec/panel/regression/finances_operations/conversion.js",
        "../spec/panel/regression/finances_operations/receipts.js"
    ],

        demands_returns:
    [
        "../spec/panel/regression/demands/return.js"
    ],

        demands_services:
    [
        "../spec/panel/regression/demands/service.js"
    ],

        check_user_access:
    [
        "../spec/panel/preconditions/user_access/set_user_access_mid.js"
    ]
}