const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

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

//@route   POST api/client/login
//@desc    Login Client / Returning a Token
//@access  Public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

//Find Client by email
Client.findOne({email})
.then(client => {
    //Check for Client
    if(!client){
        return res.status(404).json({email: "User not found"});
    }

    //Check Password
    bcrypt.compare(password, client.password)
    .then(isMatch => {
        if(isMatch){
            //Client Matched
            const payload = { id: client.id, name: client.name}; // Create JWT Payload
            //Sign Token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {expiresIn: 3600},
                (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });

                });

        } else {
            return res.status(400).json({password: "Password Incorrect"});
        }

    });
});
});

module.exports = router;