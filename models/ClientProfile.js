const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Schema
const ClientProfileSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "clients"
  },
  name: {
    type: Schema.Types.String,
    ref: "clients"
  },
  email: {
    type: Schema.Types.String,
    ref: "clients"
  },
  password: {
    type: Schema.Types.String,
    ref: "clients"
  },
  phonenumber: {
    type: Schema.Types.String,
    ref: "clients"
  }
});

module.exports = ClientProfile = mongoose.model(
  "clientprofiles",
  ClientProfileSchema
);
