require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();

const port = process.env.PORT || 3000;

app.use(session({
    name: 'session',
    secret: process.env.SECRET_KEY,
    cookie: {
        maxAge: 60000, sameSite: 'strict'
    },
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

app.get('/', (req, res) => {
    res.status(200).send('<h1>You are connected to the server</h1>');
});

app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (username && password) {

    }
    req.session.authenticated = true;
    req.session.user = { username, password };
    res.status(200).json(req.session);
});

app.get('/blogs', authenticate, (req, res) => {

    const blogs = [
        {
            title: 'Blog 1',
            description: 'Description 1'
        },
        {
            title: 'Blog 2',
            description: 'Description 2'
        },
        {
            title: 'Blog 3',
            description: 'Description 3'
        }
    ]

    res.status(200).json(blogs);
});

app.post('/logout', (req, res) => {

    req.session.destroy(() => {
        res.status(200).json({ message: 'Successfully logged out' });
    });
});

app.listen(3000, () => {
    console.log(`Server listens to port ${port}`);
});
