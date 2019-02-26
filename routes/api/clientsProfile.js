const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Client model
const Client = require("../../models/Client");

// @route   GET api/client-profile/
// @desc    Get client profile
// @access  Private
router.get(
  "/",
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

// @route   GET api/client-profile/all
// @desc    Get all client profiles
// @access  Public
router.get("/all", (req, res) => {
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

// @route   POST api/client-profile
// @desc    Create or edit client profile
// @access  Private
router.post(
  "/",
  passport.authenticate("client", { session: false }),
  (req, res) => {
    // Get fields
    const profileFields = {};
    profileFields.client = req.user.id;
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

module.exports = router;
