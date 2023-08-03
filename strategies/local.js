/**
 * @INFO_OF_THIS_fILE
 * This file includes how to setup the basic strategy
 * for PassportJS, which is the local strategy. */
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { Strategy } = require('passport-local');

// Model
const User = require('../model/User');

/**
 * @INFO
 * This callback will run whenever the PassportJS start to authenticate the request.
 */
passport.serializeUser((user, done) => {
    done(null, user[0].id);
});

/**
 * @INFO
 * This callback will run for every request made. */
passport.deserializeUser(async (id, done) => {
    try {

        const user = await User.findById(id);

        if (!user) throw new Error("User not found");
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
});

/**
 * @INFO about this middleware
 * 
 * "Strategy" class accepts two parameters:
 * 
 * @param obj:
 * This will setup the field of PassportJS.
 */
passport.use(
    new Strategy({
        usernameField: 'username'
    }, async (username, password, done) => {

        try {

            if (!username || !password) throw new Error('Please provide required credentials.');

            const foundUsername = await User.find({ username });

            if (foundUsername.length === 0) throw new Error('No username found');

            const isPasswordCorrect = bcrypt.compareSync(password, foundUsername[0].password);

            if (!isPasswordCorrect) throw new Error('Password incorrect');

            console.log("Authentication successful");
            done(null, foundUsername);
        }
        catch (err) {
            done(err, null);
        }
    })
)