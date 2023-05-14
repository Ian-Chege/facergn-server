const Clarifai = require ('clarifai');
const dotenv = require('dotenv');
dotenv.config();

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY, 
});
// const app = new Clarifai.App({
//     apiKey: 'fc057b7c162642c9903c3ac1c89103fb'
//    });


const handleApiCall = (req, res) => {
    app.models.predict(
    {
    id: "a403429f2ddf4b49b307e318f00e528b",
    version: "34ce21a40cc24b6b96ffee54aabff139",
    },
    req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with api'))
}


const handleImage=(req,res,knex) =>{
    const {id} = req.body;
    knex('users')
    .where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports ={
    handleImage,
    handleApiCall
}