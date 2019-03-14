const mongoose = require('mongoose');
const joi = require('joi');
const {genresObj} = require('./genre');

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        type: genresObj,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }

});

const Movies = mongoose.model('Movies', moviesSchema);

function validateMovie(movie) {
    const schema = {
        title: joi.string().min(3).max(50).required(),
        genreId: joi.string().required(),
        numberInStock: joi.number().min(0).max(255),
        dailyRentalRate: joi.number().min(0).max(255)
    }
    return joi.validate(movie, schema);
}

exports.validate = validateMovie;
exports.Movies = Movies;