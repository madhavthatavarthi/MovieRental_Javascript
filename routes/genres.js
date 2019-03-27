const {Genres, validate} = require('../models/genre');
const express = require('express');
const router = express.Router();
const authorization = require('../middleware/authorization')

router.get('/api/genres', async (req, res) =>{
    const genre = await Genres.find().sort('name');
    res.send(genre);
    
})

router.post('/api/genres', authorization, (req,res) => {
    console.log('req.body',req.body);
    // const {error} = validateGenre(req.body);
    // console.log('req.body',error);  
    // if (error) return res.status(400).send(error.details[0].message);
    // genres.push({id: genres.length + 1, name: req.body.name})
    let genres = createGenre(req.body.name)
    res.send(genres);

})

router.put('/api/genres/:id', async (req, res) => {
    // const genre = genres.find(g => g.id === req.params.id)
    // if(!genre)
    //  res.status(400).send('The genre with the given ID was not found.');
    
    //  genre.name = req.body.name;

    //  res.send(genre);

    const genre = await Genres.findByIdAndUpdate(req.params.id,{
        $set: {
            name: req.body.id
        }
    },{new: true})

    res.send(genre);
     
});

router.delete('/api/genres/:id', async  (req, res) => {
    const genre = await Genres.findByIdAndRemove(req.body.id);
    res.send(genre);
})

async function createGenre(name) {
    let genre =  new Genres({
        name: name
    });
    try {
        return await genre.save();
    }
    catch(err) {
        console.log(err);
        
        
    }
}

async function getGenres() {
    const genre = await Genres.find();
    console.log(genre);
    return new Promise((resolve, reject) => {
        resolve(genre)

    });
}

module.exports = router;
