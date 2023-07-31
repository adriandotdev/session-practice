const mongoose = require('mongoose');

const Blog = new mongoose.Schema({

    title: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    content: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    isPublished: {
        type: mongoose.SchemaTypes.Boolean,
        required: true
    },
    datePublished: {
        type: mongoose.SchemaTypes.Date
    }
});

module.exports = mongoose.model('blogs', Blog);