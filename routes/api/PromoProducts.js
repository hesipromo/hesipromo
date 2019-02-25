const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//PromoProduct Model
const PromoProduct = require("../../models/PromoProduct");

//Company Model
const Company = require("../../models/Company");

//Validation
const validatePromoProductsInput = require("../../validation/product");

//@route   POST api/PromoProducts
//@desc    Create PromoProduct
//@access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePromoProductsInput(req.body);

    // // // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

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
      errors.msg = "Category not defined";
      return res.status(400).json(errors);
    }

    // Save New PromoProduct, get promise and response callback in json format
    new PromoProduct(productFields).save().then(product => res.json(product));
  }
);

//@route   POST api/PromoProducts
//@desc    Create PromoProduct
//@access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    PromoProduct.findOne({ company: req.user.id })
      .then(product => {
        if (!product) {
          errors.noproduct = "There is no product for this company";
          return res.status(404).json(errors);
        }
        res.json(product);
      })
      .catch(err => res.status(404).json(err));
  }
);
module.exports = router;
