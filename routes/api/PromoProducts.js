const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//PromoProduct Model
const PromoProduct = require("../../models/PromoProduct");
//Company Model
const Company = require("../../models/Company");
//Validation
const validatePromoProductsInput = require("../../validation/PromoProducts");

//@route   POST api/PromoProducts
//@desc    Create PromoProduct
//@access  Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validatePromoProductsInput(req.body);

    // // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }

    // Get fields
    const productFields = {};
    productFields.user = req.user.id;
    if (req.body.name) productFields.name = req.body.name;
    if (req.body.description) productFields.description = req.body.description;
    if (req.body.prevprice) productFields.prevprice = req.body.prevprice;
    if (req.body.newprice) productFields.newprice = req.body.newprice;
    if (req.body.image) productFields.image = req.body.image;
    // Categories from Company Schema
    if (req.user.category.indexOf(req.body.category) > -1) {
      const newCategory = {
        category: req.body.category
      };
      productFields.product_category = newCategory;
    } else {
      return res.status(400).json({ msg: "Category not defined" });
    }

    // Save New PromoProduct, get promise and response callback in json format
    new PromoProduct(productFields).save().then(product => res.json(product));
  }
);

module.exports = router;
