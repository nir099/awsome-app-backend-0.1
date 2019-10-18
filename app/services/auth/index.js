const BadRequestException = require('../../util/exceptions/badRequestException');
let passport = require('passport');


module.exports.signIn = async (req) => {
    let success = await new Promise((res, rej) => {
        passport.authenticate('local-login', { session: false }, (err, user, info) => {
            if (err || !user) {
                rej(new BadRequestException('Authentication failed.'));
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    rej(new BadRequestException('Authentication failed.'));
                }
                res({ data: info, message: 'successfully sign In' });
            });
        })(req);
    });
    return success;
}

module.exports.signUp = async (req) => {
    let success = await new Promise((res, rej) => {
        passport.authenticate('local-signup', { session: false }, (err, user, info) => {
            if (err || !user) {
                rej(new BadRequestException('Authentication failed.'));
            }
            res({ data: info, message: 'sign up successfully' });
        })(req);
    })
    return success
}