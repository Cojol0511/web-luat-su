const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const bcrypt = require("bcryptjs");

// passport setup for the "Local Strategy". If you are using username instead of email, don't include { usernameField: 'email' }.
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // check for user in database
    db.Administrator.findOne({
        where: {
            email: email
        }
    }).then(administrator => {
        // if user was not found return false for user and pass an error message
        if (!administrator) return done(null, false, { message: 'Invalid input.' });
        // compare the password with the "hashed" password"
        bcrypt.compare(password, administrator.password).then((match) => {
            if (match) {
                // if match return user
                return done(null, administrator);
            } else {
                // if it doen's match, return false for user and pass an error message
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    })
}))

// passport boiler plate to serialize and deserialize user

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    const user = await db.Administrator.findAll({ id: id })
    done(null, user);
});

module.exports = passport;