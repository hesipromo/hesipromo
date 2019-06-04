const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Admin Schemas
const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  phonenumber: {
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

module.exports = Admin = mongoose.model("admins", AdminSchema);
