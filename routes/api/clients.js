const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load Client model
const Client = require('../../models/Client');

//@route   GET api/client/test
//@desc    Test client route
//@access  Public

router.get('/test', (req, res) => res.json({msg: 'Clients Works'}));

//@route   POST api/client/register
//@desc    Register Client
//@access  Public

router.post('/register', (req, res) => {
    Client.findOne({ email: req.body.email })
    .then(client => {
        if(client){
            return res.status(400).json({ email: 'Email already exits'});
        } else {
            const newClient = new Client({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            
            bcrypt.genSalt(10,(err, salt) => {
                bcrypt.hash(newClient.password, salt, (err, hash) => {
                    if(err) throw err;
                    newClient.password = hash;
                    newClient
                    .save()
                    .then(client => res.json(client))
                    .catch(err => console.log(err));

                })

            })

        }

    })

});

module.exports = router;