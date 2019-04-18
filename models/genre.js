const joi = require('joi');
const mongoose = require('mongoose');

const genresObj = new mongoose.Schema(
    {
    name: {
        type: String,
        min: 3,
        max: 255,
        required: true
    }
})

let Genres = mongoose.model('genres', genresObj);

function validateGenre(genre){
    const schema = {name: Joi.string().min(3).required()};
    console.log('schema',Joi.validate(genre, schema));
    return Joi.validate(genre, schema);
}

exports.genresObj = genresObj;
exports.Genres = Genres;
exports.validate = validateGenre;