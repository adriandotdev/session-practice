const { Router } = require('express');

const router = Router();

router.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (username && password) {

    }
    req.session.authenticated = true;
    req.session.user = { username, password };
    res.status(200).json(req.session);
});

router.post('/logout', (req, res) => {

    req.session.destroy(() => {
        res.status(200).json({ message: 'Successfully logged out' });
    });
});

module.exports = router;