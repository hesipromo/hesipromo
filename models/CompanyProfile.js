const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating a Schema
const CompanyProfileSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = CompanyProfile = mongoose.model(
  "companyprofile",
  CompanyProfileSchema
);
