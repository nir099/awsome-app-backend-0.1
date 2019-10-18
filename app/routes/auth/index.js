const express = require('express');
let router = express.Router();

const validatorService = require('../../validators/auth');
const authController = require('../../controllers/auth');

router.get('/logout', function(req, res) {
    req.logout();
    res.sendStatus(200);
});
// process the login form
router.post('/userLogin', validatorService.validate('signIn') , authController.signIn);

// process the signup form
router.post('/userSignup', validatorService.validate('signUp') , authController.signUp);

module.exports = router ; 
