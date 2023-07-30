const mongoose = require('mongoose');

const User = new mongoose.Schema({

    givenName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    middleName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    lastName: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    username: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true
    }
});

module.exports = mongoose.model('users', User);