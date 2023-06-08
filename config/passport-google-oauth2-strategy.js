const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "Add your own secret credential Here",
    clientSecret: "Add your own secret credential Here",
    callbackURL: "Add your own secret credential Here",
},

    function (accessToken, RefreshToken, profile, done) {
        // Find the user
        User.findOne({ email: profile.emails[0].value })
            .then((docs) => {
                if (docs) {
                    // if user found, set this user as req.user;
                    return done(null, docs);
                } else {
                    console.log("created user using google auth middleware");
                    // if not found in  our db, then set it as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex'),
                    }).then((doc) => {
                        return done(null, doc);
                    }).catch((err) => {
                        return console.log(err);
                    })
                }
            })

            .catch((err) => {
                console.log('error in google strategy-passport', err);
            })
    }
));


