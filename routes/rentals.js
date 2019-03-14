const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Customers} = require('../models/customer');
const {Movies} = require('../models/movies');
const {rentals, validate} = require('../models/rentals');
var Fawn = require('fawn');

Fawn.init(mongoose);

router.get('/',async (req, res) => {
    const rental = await rentals.find().sort('-dateOut');
    res.send(rental);
});

router.post('/',async (req,res) => {
    console.log('req.body', req.body);
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customers.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Enter valid customer Id');

    console.log('customer::', customer)

    const movie = await Movies.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Enter valid movie');

    if(movie.numberInStock === 0) return res.status(500).send('movie is not in stock');

    let rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            isGold: customer.isGold,
            phone: customer.phone
        },
        
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    //  rental = await rental.save();

    // movie.numberInStock--;

    // movie.save();
    try{
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id}, {$inc: {numberInStock: -1}
        })
        .run();
    
        res.send(rental);
    }
    catch(ex) {
        res.status(500).send('something went wrong');
    }
});

router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
    res.send(rental);
  });

module.exports = router;