const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating User Schemas
const ClientSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Client = mongoose.model(
  "clients",
  ClientSchema);
