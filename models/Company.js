const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating User Schemas
const CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  category: {
    type: [String],
    required: true
  },
  country: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Company = mongoose.model(
  "company",
  CompanySchema);
