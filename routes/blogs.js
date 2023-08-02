const { Router } = require('express');
const mongoose = require('mongoose');

const router = Router();

// Model
const Blog = require('../model/Blog');

// Validator
const blogValidator = require('../validation/blogValidator');

router.get('/api/v1/blogs', async (req, res) => {

    try {
        const response = await Blog.find({ author: req.user.id }).sort({ title: 1 });

        if (response.length === 0) return res.status(200).json({ message: 'You have no blog entries.' });

        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/v1/blogs/search', async (req, res) => {

    const { title } = req.query;

    if (!title) return res.status(400).send({ message: 'Title is missing. Please provide a blog title you want to search.' });

    try {
        const blog = await Blog.find({ title });

        if (blog.length === 0) return res.status(404).send({ message: `Blog with the title of ${title} not found` });

        res.status(200).json(blog);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

/**
 * @GET /api/v1/blogs/:id
 */
router.get('/api/v1/blogs/:id', async (req, res) => {

    const { id } = req.params;

    try {
        const blog = await Blog.find({ _id: id });

        if (blog.length > 0) return res.status(200).json(blog);

        return res.status(404).send({ message: 'Blog Not Found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

/**
 * @POST /api/v1/blogs
 */
router.post('/api/v1/blogs', async (req, res) => {

    const { error } = blogValidator.validate(req.body);

    if (error) return res.status(400).json({ message: 'Please provide all of the required fields.' });

    const { title, content, isPublished } = req.body;

    const blog = new Blog(
        {
            title,
            content,
            author: new mongoose.Types.ObjectId(req.user.id),
            isPublished: isPublished,
            datePublished: isPublished === "true" ? new Date() : null
        });

    try {
        await blog.save();

        res.status(200).json({ message: 'Blog succesfully saved!' });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;