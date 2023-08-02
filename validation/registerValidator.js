const Joi = require('joi');

const schema = Joi.object({
    givenName: Joi.string().required(),
    middleName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().min(8),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'dev'] } }),
    password: Joi.string().min(8)
});

const showErrorMessage = (errorField) => {

    let errorMessage = "";

    switch (errorField) {

        case "username":
            errorMessage = 'Username must atleast eight(8) characters long.';
            break;
        case "password":
            errorMessage = 'Password must atleast eight(8) characters long.';
            break;
        case "email":
            errorMessage = 'Please provide a valid email address. Valid emails could be end in .com or .dev (Example: johndoe.dev, johndoe.com)';
            break;
    }

    return errorMessage;
}
module.exports = { registerValidator: schema, showErrorMessage };