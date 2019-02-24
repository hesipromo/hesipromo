const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PromoProductSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
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
  /* category:[{
      company:{
          type: Schema.Types.company.categoryId,
          ref:"company"ß
      }
  }
  ], */
  /* from: {
    type: Date,
  },
  to: {
    type: Date,
  }, */
  like:[
      {
          client:{
              type: Schema.Types.ObjectId,
              ref: 'clients'
          },date: {
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

module.exports = PromoProduct = mongoose.model('PromoProducts', PromoProductSchema);
