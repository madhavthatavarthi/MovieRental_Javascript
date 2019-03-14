const joi = require('joi');
const mongoose = require('mongoose');

const userObj = new mongoose.Schema({
    isGold: Boolean,
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength:15
    }
});

const Customers = mongoose.model('Customers',userObj);

function validate(customer){
    const schema = 
    {
        isGold: joi.boolean(),
        name: joi.string().min(5).max(255),
        phone: joi.string().min(10).max(15)
    
    }

    return joi.validate(customer,schema)
}

exports.Customers = Customers;
exports.validate = validate;