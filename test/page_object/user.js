module.exports = {
    url: "http://localhost:3000",
    elements: {
        id_email: {
            selector: '#user_email'
        },
        id_password: {
            selector: '#user_password'
        },
        id_password_confirmation: {
            selector: '#user_password_confirmation'
        },
        id_remember_me: {
            selector: "#user_remember_me"
        },
        submit: {
            selector: 'button[type=submit]'
        },
        error: {
            selector: '.alert.alert-error > h4'
        },
        error_message: {
            selector: "Ошибка: сохранение не удалось из-за 1 ошибки"
        }


    }
};


