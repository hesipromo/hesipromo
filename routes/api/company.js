const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load Company Model
const Company = require('../../models/Company');

//@route   GET api/company/test
//@desc    Test company route
//@access  Public

router.get('/test', (req, res) => res.json({msg: 'Company Works'}));

//@route   POST api/company/register
//@desc    Register Company
//@access  Public

router.post('/register', (req, res) =>{
    Company.findOne({ email: req.body.email})
    .then(company =>{
        if(company){
        return res.status(400).json({email:"Company email exits"});
        } else {
            const newCompany = new Company({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                website: req.body.website,
                category: req.body.category,
                company: req.body.company,

            });

            bcrypt.genSalt(10,(err, salt) => {
                bcrypt.hash(newCompany.password, salt, (err, hash) => {
                    if(err) throw err;
                    newCompany.password = hash;
                    newCompany
                    .save()
                    .then(company => res.json(company))
                    .catch(err => console.log(err));

                })

            })

    
        }

    })

});

//@route   POST api/company/login
//@desc    Login company / Returning a Token
//@access  Public
router.post('/login', (req, res) => {
const email = req.body.email;
const password = req.body.password;

//Find Company by email
Company.findOne({email})
.then( company => {
    //Check for Company
if(!company){
    return res.json.status(404)({email: 'Company email not found'})
}

//Check for Password
bcrypt.compare(password, company.password)
.then(isMatch => {
    if(isMatch){
        //company Matched
        const payload = { id: company.id, name: company.name}; // Create JWT Payload
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

//@route   GET api/company/current
//@desc    Return current company
//@access  Private

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
    res.json({
        id: req.company.id,
        name: req.company.name,
        email: req.company.email,
        country: req.company.country
    });
});

module.exports = router;