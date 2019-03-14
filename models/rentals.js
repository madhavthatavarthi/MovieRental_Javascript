const joi = require('joi');
const mongoose = require('mongoose');

let Rental = mongoose.model('rentals', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required:true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title:{
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }

        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        default: 0
    }   

}));

function validateSchema(rental) {
    const schema = {
        customerId: joi.objectId().required(),
        movieId: joi.objectId().required()
    };
    return joi.validate(rental, schema);
}

exports.validate =  validateSchema;
exports.rentals = Rental;
