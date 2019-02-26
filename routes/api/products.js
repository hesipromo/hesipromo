const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const keys = require("../../config/keys");
const passport = require("passport");


//PromoProduct Model
const Product = require("../../models/Product");

//Company Model
const Company = require("../../models/Company");

//Client Model
const Client = require("../../models/Client");

//Validation
const validatePromoProductsInput = require("../../validation/product");

//@route   POST api/Products
//@desc    Create Product
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
    productFields.company = req.user.id;
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

    // Save New Product, get promise and response callback in json format
    new PromoProduct(productFields).save().then(product => res.json(product));
  }
);

//@route   GET api/promo-product
//@desc    Products For Logged In Company
//@access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Product.findOne({ company: req.user.id })
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

//@route   GET api/promo-product
//@desc    All Promotion products
//@access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Product.find()
    .then(products => {
      if (!products) {
        errors.noproduct = "There are no products on promotion";
        return res.status(404).json(errors);
      }
      res.json(products);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/product/like/:id
// @desc    Like Product
// @access  Private

router.post(
  '/like/:id',
  passport.authenticate('client', { session: false }),
  (req, res) => {
    Client.findOne({ _id: req.user.id }).then(client => {
      Product.findById(req.params.id)
        .then(product => {
          if (
            product.likes.filter(like => like.client.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this product' });
          }

          // Add user id to likes array
          product.likes.unshift({ client: req.user.id });

          product.save().then(product => res.json(product));
        })
        .catch(err => res.status(404).json({ productnotfound: 'No product found' }));
    });
  }
);


// @route   DELETE api/product/:id
// @desc    Delete Product
// @access  Private

router.delete(
  '/:id',
  passport.authenticate('company', { session: false }),
  (req, res) => {
    Company.findOne({ _id: req.user.id }).then(company => {
      Product.findById(req.params.id)
        .then(product => {
          // Check for Promo Product Owner
          if (product.company.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          product.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ productnotfound: 'No post found' }));
    });
  }
);

module.exports = router;
