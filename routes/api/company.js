const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

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

module.exports = router;