const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const joi = require('joi');
const {User} = require('../models/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(500).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    console.log('user', user);
    
    if(!user) return res.status(500).send('Invalid UserId');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(500).send('Invalid password');
    
    const token = jwt.sign({_id: user._id}, config.get('jwtprivatekey'));
    
    res.send(token);

})

function validate(user) {
    const schema = {
        email: joi.string().email().required(),
        password: joi.string().required().min(5).max(255) 
    };
    return joi.validate(user, schema);
}

module.exports = router;

