const {
    body,
} = require('express-validator');

module.exports.validate = (method) => {
    switch (method) {
        case 'signUp': {
            return [
                body('name', 'user name is required').exists(),
                body('password', 'password is required').exists(),
                body('email', 'email is required').isEmail().exists()
            ];
        }
        case 'signIn': {
            return [
                body('password', 'password is required').exists(),
                body('email', 'email is required').isEmail().exists()
            ];
        }
    }
};