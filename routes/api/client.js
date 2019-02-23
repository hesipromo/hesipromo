const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/Client');

//@route   GET api/client/test
//@desc    Test client route
//@access  Public

router.get('/test', (req, res) => res.json({msg: 'Client Works'}));

//@route   POST api/client/register
//@desc    Register User
//@access  Public
router.post('/register',(req, res) => {
    User.findOne({ email: req.body.email })   
});

module.exports = router;