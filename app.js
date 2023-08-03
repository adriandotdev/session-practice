require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const passport = require('passport');

require('./strategies/local'); // Register the strategies.
require('./database');

const app = express();

// Routes
const AuthRoute = require('./routes/auth');
const BlogRoute = require('./routes/blogs');

const port = process.env.PORT || 3000;

app.use(session({
    name: 'session',
    secret: process.env.SECRET_KEY,
    cookie: {
        maxAge: 120 * 60 * 1000, sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTION_STRING
    })
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function authenticate(req, res, next) {
    if (req.user) {
        next();
        return;
    }
    res.status(401).json({ message: 'Authentication failed' });
}

app.use(passport.initialize());
app.use(passport.session());

// Authentication Route
app.use(AuthRoute);

// Authenticate Middleware
app.use(authenticate);

// Blog Route
app.use(BlogRoute);

app.listen(3000, () => {
    console.log(`Server listens to port ${port}`);
});
