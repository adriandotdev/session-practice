const { Router } = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const router = Router();

// Models
const User = require('../model/User');

// Validators
const { registerValidator, showErrorMessage } = require('../validation/registerValidator');

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('Logged In');
    res.sendStatus(200);
});

router.post('/logout', (req, res) => {

    req.session.destroy(() => {
        res.status(200).json({ message: 'Successfully logged out' });
    });
});

router.post('/register', async (req, res) => {

    const { error } = registerValidator.validate(req.body);

    if (error) return res.status(400).json({ message: showErrorMessage(error.details[0].path[0]) });

    const { username, email } = req.body;

    const isExisting = await User.find({ $or: [{ username }, { email }] });

    if (isExisting.length > 0) return res.status(400).json({ message: 'Username or email already exists.' });

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create a new User
    const user = new User({ ...req.body, password: hashedPassword });

    try {
        await user.save();

        res.status(200).json({ message: 'User saved successfully.' });
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
});

module.exports = router;