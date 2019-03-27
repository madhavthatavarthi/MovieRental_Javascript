const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {User,validate} = require('../models/register');
const _ = require('lodash');


router.get('/', async (req, res) => {
    const user = await User.find();
    res.send(user);
});

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(500).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    console.log('user', user);
    
    if(user) return res.status(500).send('user already exists')
    user = new User(_.pick(req.body, ['name','email','password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();

    const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, config.get('jwtPrivateKey'));
    
    res.header('x-auth-token',token).send(_.pick(user, ['_id','name','email']));
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    res.send(user);
});

module.exports = router;