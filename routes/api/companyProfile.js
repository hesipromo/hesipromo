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
    if (req.body.telnumber) profileFields.telnumber = req.body.telnumber;
    if (req.body.logo) profileFields.logo = req.body.logo;
    if (req.body.name) profileFields.name = req.user.name;
    if (req.body.email) profileFields.email = req.user.email;

    // Location Fields
    profileFields.location = [];
    if (req.body.city) profileFields.location.city = req.body.city;
    if (req.body.street) profileFields.location.street = req.body.street;
    if (req.body.country) profileFields.location.country = req.user.country;

    //Edit or create Social links
    profileFields.social = {};
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    CompanyProfile.findOne({ company: req.user.id }).then(profile => {
      if (profile) {
        // Update
        CompanyProfile.update(
          { company: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
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
