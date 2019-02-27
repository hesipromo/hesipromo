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
    type: String
  },
  newprice: {
    type: String
  },
  from: {
    type: Date
  },
  to: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
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
  likes: [
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
