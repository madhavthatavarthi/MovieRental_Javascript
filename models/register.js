const Joi = require('joi');
const mongoose = require('mongoose');

let userSchema = mongoose.model('users', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

function validateSchema(user) {
    let schema = {name: Joi.String().required().minlength(5).maxlength(50),
                   email: Joi.String().unique().required(),
                   password: Joi.String().required().minlength(5).maxlength(50) 
                }
     return Joi.validate(schema, user);           
}

exports.validate = validateSchema;
exports.user = userSchema;
