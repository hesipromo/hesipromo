const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//PromoProduct Model
const PromoProduct = require("../../models/PromoProduct");
//Company Model
const Company = require("../../models/Company");

//@route   GET api/promoProducts/test
//@desc    Test PromoProducts route
//@access  Public

router.get("/test", (req, res) => res.json({ msg: "PromoProducts Works" }));

//@route   POST api/PromoProducts
//@desc    Create PromoProduct
//@access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPromoProduct = new PromoProduct({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      prevprice: req.body.prevprice,
      newprice: req.body.newprice
      //category: req.company.category.id,
      //from: req.body.text,
      //to: req.body.text,
      //company: req.company.id,
    });

    //Save New PromoProduct, get promise and response callback in json format
    newPromoProduct.save().then(PromoProduct => res.json(PromoProduct));
  }
);

module.exports = router;
