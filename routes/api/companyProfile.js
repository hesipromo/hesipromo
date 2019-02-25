const express = require('express');
const router = express.Router();

//Load Company Profile Model

const CompanyProfile = require('../../models/ClientProfile');


//Load Company model

const Company = require('../../models/Company');

router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));

// @route   POST api/profile
// @desc    Create or edit company profile
// @access  Private

router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {

//Get Field to create or edit
const profileFields = {};
profileFields.user = req.user.id;
if (req.body.name) profileFields.name = req.body.name;
if (req.body.website) profileFields.website = req.body.website;
if (req.body.location) profileFields.location = req.body.location;
if (req.body.logo) profileFields.logo = req.body.logo;

//Edit or create Social links

    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    CompanyProfile.findOne({ user: req.user.id }).then(companyprofiles =>{
        if (companyprofiles){
            //Update
            CompanyProfile.findByIdAndUpdate(
                { user: req.user.id },
                {$set: profileFields},
                { new: true }

            ).then(companyprofiles => res.json(companyprofiles));
        }
        // Save Profile
        new Profile(profileFields).save().then(companyprofiles => res.json(companyprofiles));
    })

});

module.exports = router;