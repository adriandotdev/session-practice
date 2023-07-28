const { Router } = require('express');

const router = Router();

const blogs = [
    {
        id: 1,
        title: 'Blog 1',
        description: 'Description 1'
    },
    {
        id: 2,
        title: 'Blog 2',
        description: 'Description 2'
    },
    {
        id: 3,
        title: 'Blog 3',
        description: 'Description 3'
    }
]

router.get('/api/v1/blogs', (req, res) => {

    res.status(200).json(blogs);
});

router.get('/api/v1/blogs', (req, res) => {

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

module.exports = router;