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
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}));

function validateSchema(user) {
    let schema = {
                   name: Joi.string().required().min(5).max(50),
                   email: Joi.string().required().email(),
                   password: Joi.string().required().min(5).max(255) 
                }
     return Joi.validate(user, schema);           
}

exports.validate = validateSchema;
exports.User = userSchema;
