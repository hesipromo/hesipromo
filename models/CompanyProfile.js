const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating a Schema
const CompanyProfileSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "companies"
  },
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
  website: {
    type: String
  },
  location: [
    {
      country: {
        type: Schema.Types.String
      },
      city: {
        type: [String]
      },
      street: {
        type: String
      }
    }
  ],
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

module.exports = CompanyProfile = mongoose.model(
  "companyprofiles",
  CompanyProfileSchema
);
