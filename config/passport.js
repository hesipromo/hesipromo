<<<<<<< HEAD
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Client = mongoose.model("clients");
const Company = mongoose.model("companies");
const keys = require("../config/keys");
=======
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Client = mongoose.model('clients');
const Company = mongoose.model('companies');
const keys = require('../config/keys');
>>>>>>> 0ac5b23c6c9318b8fcc925e45794969685d4fff2

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Client.findById(jwt_payload.id)
        .then(client => {
          if (client) {
            return done(null, client);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Company.findById(jwt_payload.id)
        .then(companies => {
          if (companies) {
            return done(null, companies);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
