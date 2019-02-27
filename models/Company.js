const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Company Schemas
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
  category: {
    type: [String],
    required: true
  },
  country: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Company = mongoose.model("companies", CompanySchema);
