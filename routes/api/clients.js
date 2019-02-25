const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/client-register");
const validateLoginInput = require("../../validation/client-login");

// Load Client model
const Client = require("../../models/Client");

//@route   POST api/client/register
//@desc    Register Client
//@access  Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Validating all body fields
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Client.findOne({ email: req.body.email }).then(client => {
    if (client) {
      errors.email = "Email already exits";
      return res.status(400).json(errors);
    } else {
      const newClient = new Client({
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newClient.password, salt, (err, hash) => {
          if (err) throw err;
          newClient.password = hash;
          newClient
            .save()
            .then(client => res.json(client))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route   POST api/client/login
//@desc    Login Client / Returning a Token
//@access  Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Validating all body fields
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find Client by email
  Client.findOne({ email }).then(client => {
    //Check for Client
    if (!client) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Check Password
    bcrypt.compare(password, client.password).then(isMatch => {
      if (isMatch) {
        //Client Matched
        const payload = { id: client.id, name: client.name }; // Create JWT Payload
        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route   GET api/client/current
//@desc    Return current client
//@access  Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.client.id,
      name: req.client.name,
      email: req.client.email,
      phonenumber: req.client.phonenumber
    });
  }
);

module.exports = router;
