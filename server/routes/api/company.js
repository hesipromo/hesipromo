const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const cc = require("full-countries-cities");

require('dotenv').config();

// Load Input Validation
const validateRegisterInput = require("../../validation/company-register");
const validateLoginInput = require("../../validation/company-login");

//Load Company Model
const Company = require("../../models/Company");

//@route   POST api/company/register
//@desc    Register Company
//@access  Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  Company.findOne({ email: req.body.email }).then(company => {
    if (company) {
      return res.status(400).json({ email: "Company email exits" });
    } else {
      const newCompany = new Company({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        website: req.body.website,
        category: req.body.category.split(","),
        country: req.body.country
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCompany.password, salt, (err, hash) => {
          if (err) throw err;
          newCompany.password = hash;
          newCompany
            .save()
            .then(company => res.json(company))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route   POST api/company/login
//@desc    Login company / Returning a Token
//@access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // // // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find Company by email
  Company.findOne({ email }).then(company => {
    //Check for Company
    if (!company) {
      return res.status(404).json({ email: "Company email not found" });
    }

    //Check for Password
    bcrypt.compare(password, company.password).then(isMatch => {
      if (isMatch) {
        //company Matched
        const payload = { id: company.id, name: company.name }; // Create JWT Payload
        //Sign Token
        jwt.sign(
          payload,
          process.env.SECRETKEY,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password Incorrect" });
      }
    });
  });
});

//@route   GET api/company/current
//@desc    Return current company
//@access  Private

router.get(
  "/current",
  passport.authenticate("company", { session: false }),
  (req, res) => {
    const errors = {};

    Company.findOne({ _id: req.user.id })
      .then(company => {
        if (!company) {
          errors.nocompany = "There is no company for this user";
          return res.status(404).json(errors);
        }
        res.json(company);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
