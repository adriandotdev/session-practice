require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

// Routes
const AuthRoute = require('./routes/auth');
const BlogRoute = require('./routes/blogs');

const port = process.env.PORT || 3000;

require('./database');

app.use(session({
    name: 'session',
    secret: process.env.SECRET_KEY,
    cookie: {
        maxAge: 60000, sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function authenticate(req, res, next) {
    if (req.session.authenticated) {
        next();
        return;
    }
    res.status(401).json({ message: 'Authentication failed' });
}

// Authentication Route
app.use(AuthRoute);

// Authenticate Middleware
app.use(authenticate);

// Blog Route
app.use(BlogRoute);

app.listen(3000, () => {
    console.log(`Server listens to port ${port}`);
});
