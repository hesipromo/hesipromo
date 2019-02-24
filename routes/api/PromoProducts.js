const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const PromoProduct = require('../../models/PromoProduct');

//@route   GET api/PromoProducts/test
//@desc    Test PromoProducts route
//@access  Public

router.get('/test', (req, res) => res.json({msg: 'PromoProducts Works'}));

//@route   POST api/PromoProducts
//@desc    Test PromoProducts 
//@access  Private

router.post('/', passport.authenticate('jwt', {session: false }), (req,res) => {
    const newPromoProduct = new PromoProduct ({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        prevprice: req.body.prevprice,
        newprice: req.body.newprice,
        //category: req.company.category.id,
        //from: req.body.text,
        //to: req.body.text,
        company: req.company.id,
    })
})


module.exports = router;