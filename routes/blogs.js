const { Router } = require('express');

const router = Router();

// Model
const Blog = require('../model/Blog');

router.get('/api/v1/blogs', async (req, res) => {

    try {
        const response = await Blog.find();

        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.get('/api/v1/blogs/search', (req, res) => {

    console.log(req.query);
    const { title } = req.query;

    if (!title) res.status(400).send({ message: 'Your query must have a title.' });

    const blog = blogs.find(blog => title === blog.title);

    if (!blog) res.status(404).send({ message: `Blog with the title of ${title} not found` });

    res.status(200).json(blog);
});

router.get('/api/v1/blogs/:id', (req, res) => {

    const { id } = req.params;

    const blog = blogs.find(blog => id == blog.id);

    if (blog) return res.status(200).json(blog);

    return res.status(404).send({ message: 'Blog Not Found' });
});

router.post('/api/v1/blogs', async (req, res) => {

    const blog = new Blog(req.body);

    try {
        await blog.save();

        res.status(200).json(req.body);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;