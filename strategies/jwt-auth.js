let JwtStrategy = require('passport-jwt').Strategy, ExtractJwt = require('passport-jwt').ExtractJwt;
let passport = require('passport');
const User = require('../model/User');

let options = {};

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = 'secretkey';

passport.use(new JwtStrategy(options, (jwt_payload, done) => {

    console.log(jwt_payload.username);
    done(null, jwt_payload);
}))
