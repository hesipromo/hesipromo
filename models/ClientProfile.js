const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating Schema
const ClientProfileSchema = new Schema({
    name: {
        type: Schema.Types.ObjectId,
        ref:'clients'
    },

});

module.exports = ClientProfile = mongoose.model(
    'clientprofiles',
    ClientProfileSchema);