const express = require('express');
const router = express.Router();
const {validate, Movies} = require('../models/movies');
const {Genres} = require('../models/genre');

router.get('/', async (req, res) => {
    const movies = await Movies.find();
    res.send(movies);
})

router.post('/', async (req,res) => {
    
    const { error } = validate(req.body);  
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genres.findById(req.body.genreId);
    console.log(genre.name);
    
    if(!genre) return res.status(400).send('invalid genre Id')
    const movie = new Movies({
        title: req.body.title,
        genre: {
            _id: req.body.genreId,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
        
    });
    res.send(await movie.save());

});

module.exports = router;
