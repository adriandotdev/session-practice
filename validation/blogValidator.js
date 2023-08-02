const Joi = require('joi');

const schema = Joi.object({

    title: Joi.string().required(),
    content: Joi.string().required(),
    isPublished: Joi.string().required()
});

module.exports = schema;