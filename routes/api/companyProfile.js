const express = require("express");
const router = express.Router();
const passport = require("passport");

//Load Company Profile Model

const CompanyProfile = require("../../models/CompanyProfile");

//Load Company model

const Company = require("../../models/Company");

// @route   POST api/company/profile
// @desc    Create or edit client profile
// @access  Private
router.post(
  "/",
  passport.authenticate("company", { session: false }),
  (req, res) => {
    //   TODO: Fields validation

    // Get fields
    const profileFields = {};
    profileFields.company = req.user.id;
    if (req.body.website) profileFields.website = req.body.website;

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

    // Location Fields
    profileFields.location = [];
    if (req.body.city) profileFields.location.city = req.body.city;
    if (req.body.street) profileFields.location.street = req.body.street;
    if (req.body.location) {
      profileFields.location.country = req.body.location;
    } else {
      profileFields.location.country = req.user.country;
    }

    //Edit or create Social links
    profileFields.social = {};
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    CompanyProfile.findOne({ company: req.user.id }).then(company => {
      if (company) {
        // Update

        CompanyProfile.update(
          {
            company: { $in: req.user.id }
          },
          {
            $pullAll: { companies: req.user.id }
          },
          {
            $set: profileFields
          },
          {
            multi: true
          },
          function(err, count) {
            if (err) {
              console.log(err);
            } else {
              console.log(count);
            }
          }
        ).then(company => res.json(company));
      } else {
        // Save Profile
        new CompanyProfile(profileFields)
          .save()
          .then(profile => res.json(profile));
      }
    });
  }
);

module.exports = router;
