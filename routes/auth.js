const { Router } = require('express');

const router = Router();

const User = require('../model/User');

router.post('/login', async (req, res) => {

    const { username, password } = req.body;

    const foundUsername = await User.find({ username });

    if (foundUsername.length === 0) return res.status(404).json({ message: 'Username not found' });

    if (password !== foundUsername[0].password) return res.status(404).json({ message: 'Password is incorrect.' });

    req.session.authenticated = true;
    req.session.userID = foundUsername[0].id;

    res.status(200).json({ message: 'Successfully logged in!' });
});

router.post('/logout', (req, res) => {

    req.session.destroy(() => {
        res.status(200).json({ message: 'Successfully logged out' });
    });
});

router.post('/signup', async (req, res) => {

    const { username, email } = req.body;

    const isExisting = await User.find({ $or: [{ username }, { email }] });

    if (isExisting.length > 0) return res.status(400).json({ message: 'Username or email already exists.' });

    const user = new User(req.body);

    try {
        await user.save();

        res.status(200).json({ message: 'User saved successfully.' });
    }
    catch (err) {
        res.status(400).json({ message: "Error" })
    }
});

module.exports = router;