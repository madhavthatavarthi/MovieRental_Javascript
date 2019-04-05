const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const config = require('config');
const error = require('./middleware/error')

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log("Connected to the network"))
.catch(err => console.log("Erroe", err));

app.use(express.json());

app.use('/', genres);
app.use('/api/customers', customers);
app.use('/api/movies', require('./routes/movies'));
app.use('/api/rentals', require('./routes/rentals'));
app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));

app.use(error);


// async function createGenre(name) {
//     let genre =  new Genres({
//         name: name
//     });
//     try {
//         return await genre.save();
//     }
//     catch(err) {
//         console.log(err);
//     }
// }

const port = process.env.port || 7000
app.listen(port, () => {console.log(`listening to port ${port}`)});