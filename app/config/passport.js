var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var { User } = require('../models/User');

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
        function (_req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function () {
                User.findOne({ 'email': email }, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no org is found, return the message
                    if (!user)
                        return done(null, false, { massage: 'no user found' });

                    if (!user.validPassword(password))
                        return done(null, false, { massage: 'no user found' });

                    // all is well, return user
                    else {
                        let token = user.generateJwt();
                        return done(null, user, token);
                    }
                });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            // asynchronous
            process.nextTick(function () {
                // if the user is not already logged in:
                if (!req.org) {
                    User.findOne({ 'email': email }, function (err, user) {
                        // if there are any errors, return the error
                        if (err){
                            return done(err);
                        }

                        // check to see if theres already a user with that email
                        if (user) {
                            return done(null, false, { massage: 'user exist with this mail' });
                        } else {

                            // create the user
                            var newUser = new User();

                            newUser.email = email;
                            newUser.name = req.body.name;
                            newUser.password = newUser.generateHash(password);
                            newUser.save(function (err) {
                                if (err)
                                    return done(err);
                                else {
                                    let token = newUser.generateJwt();
                                    return done(null, newUser, token);
                                }
                            });
                        }

                    });
                }

            });

        }));

};
