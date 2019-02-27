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
const Product = require("../../models/Product");

//@route   POST api/clients/register
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

//@route   POST api/clients/login
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

//@route   GET api/clients/current
//@desc    Return current client
//@access  Private

router.get(
  "/current",
  passport.authenticate("client", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

/* ClIENT PROFILE */

// @route   GET api/clients/profile/
// @desc    Get client profile
// @access  Private
router.get(
  "/profile",
  passport.authenticate("client", { session: false }),
  (req, res) => {
    const errors = {};

    Client.findOne({ _id: req.user.id })
      .then(client => {
        if (!client) {
          errors.noclientprofile = "There is no profile for this client";
          return res.status(404).json(errors);
        }
        res.json(client);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/clients/profile/all
// @desc    Get all client profiles
// @access  Public
router.get("/profile/all", (req, res) => {
  const errors = {};

  Client.find()
    .then(client => {
      if (!client) {
        errors.noclientprofile = "There are no clients profile";
        return res.status(404).json(errors);
      }

      res.json(client);
    })
    .catch(err =>
      res.status(404).json({ profile: "There are no clients profile" })
    );
});

// @route   POST api/clients/profile
// @desc    Create or edit client profile
// @access  Private
router.post(
  "/",
  passport.authenticate("client", { session: false }),
  (req, res) => {
    //   TODO: Fields validation

    // Get fields
    const profileFields = {};
    if (req.body.name) {
      profileFields.name = req.body.name;
    } else {
      profileFields.name = req.user.name;
    }
    if (req.body.email) {
      profileFields.email = req.body.email;
    } else {
      profileFields.email = req.user.email;
    }
    if (req.body.picture) {
      profileFields.picture = req.body.picture;
    } else {
      profileFields.picture = req.user.picture;
    }
    if (req.body.password) {
      profileFields.password = req.body.password;
    } else {
      profileFields.password = req.user.password;
    }
    if (req.body.phonenumber) {
      profileFields.phonenumber = req.body.phonenumber;
    } else {
      profileFields.phonenumber = req.user.phonenumber;
    }

    Client.findOne({ _id: req.user.id }).then(client => {
      if (client) {
        // Update
        Client.findOneAndUpdate(
          { _id: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(client => res.json(client));
      } else {
        // Save Profile
        new Client(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// @route   DELETE api/clients
// @desc    Delete client
// @access  Private
router.delete(
  "/",
  passport.authenticate("client", { session: false }),
  (req, res) => {
    Client.findOneAndRemove({ _id: req.user.id }).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;
