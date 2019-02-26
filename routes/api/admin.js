const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load Input Validation
const validateRegisterInput = require("../../validation/admin-register");
const validateLoginInput = require("../../validation/admin-login");

// Load Admin model
const Admin = require("../../models/Admin");

//@route   POST api/admin/register
//@desc    Register Admin
//@access  Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Validating all body fields
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Admin.findOne({ email: req.body.email }).then(admin => {
    if (admin) {
      errors.email = "Email already exits";
      return res.status(400).json(errors);
    } else {
      const newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin
            .save()
            .then(admin => res.json(admin))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route   POST api/admin/login
//@desc    Login Admin / Returning a Token
//@access  Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Validating all body fields
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find Admin by email
  Admin.findOne({ email }).then(admin => {
    //Check for Admin
    if (!admin) {
      errors.email = "Admin not found";
      return res.status(404).json(errors);
    }

    //Check Password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        //Admin Matched
        const payload = { id: admin.id, name: admin.name }; // Create JWT Payload
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

//@route   GET api/admin/current
//@desc    Return current logged in admin
//@access  Private

router.get(
  "/current",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

// @route   GET api/admin/all
// @desc    Return  all admins
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Admin.find()
    .then(admin => {
      if (!admin) {
        errors.noclientprofile = "There are no clients profile";
        return res.status(404).json(errors);
      }

      res.json(admin);
    })
    .catch(err =>
      res.status(404).json({ profile: "There are no clients profile" })
    );
});

// @route   POST api/admin/profile
// @desc    Edit admin profile
// @access  Private
router.post(
  "/profile",
  passport.authenticate("admin", { session: false }),
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

    Admin.findOne({ _id: req.user.id }).then(admin => {
      if (admin) {
        // Update
        Admin.findOneAndUpdate(
          { _id: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(admin => res.json(admin));
      } else {
        // Save Profile
        new Admin(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// @route   DELETE api/admin
// @desc    Delete admin
// @access  Private
router.delete(
  "/",
  passport.authenticate("admin", { session: false }),
  (req, res) => {
    Admin.findOneAndRemove({ _id: req.user.id }).then(() => {
      res.json({ success: true });
    });
  }
);

module.exports = router;
