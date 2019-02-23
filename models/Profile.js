const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Company Profile Schema
const ProfileSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref:'company'
    },
    companybio:{
        type: String
    },
    logo: {
        type: String
    },
    location:{
        type: [String]
    },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);