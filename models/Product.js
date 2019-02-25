const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating Profile Schemas
const ProductSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "companies"
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
        ref: "companies"
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

module.exports = Product = mongoose.model("products", ProductSchema);
