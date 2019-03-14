const {Customers, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/',async (req, res) =>{
    const customers = await Customers.find().sort();
    res.send(customers);
});

router.post('/',async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const customer = new Customers({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    res.send(await customer.save());

});

router.put('/:id', async (req, res) =>{
    const { error } = validate(req.body);
    if (error) res.status(400).send('Invalid request');
    const customer = await Customers.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    },{new: true});

    if(!customer) res.status(400).send('Customer with given Id is not available')
})

router.delete('/:id',async (req, res) => {
    const customer = await Customers.findByIdAndRemove(id);

    if(!customer) res.status(400).send('Customer with given Id is not available');
})

module.exports = router;
