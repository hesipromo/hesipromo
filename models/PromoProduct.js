const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PromoProductSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  prevprice: {
    type: String,
    required: true
  },
  newprice: {
    type: String,
    required: true
  },
  product_category: [
    {
      company: {
        type: Schema.Types.ObjectId,
        ref: "company"
      },
      category: {
        type: String
      }
    }
  ],
  like: [
    {
      client: {
        type: Schema.Types.ObjectId,
        ref: "clients"
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = PromoProduct = mongoose.model(
  "PromoProducts",
  PromoProductSchema
);
