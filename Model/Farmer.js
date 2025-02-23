const mongoose = require('mongoose')
const FarmerSchema = mongoose.Schema({
    FullName : {type: String, required: true},
    email : {type: String, required: true},
    address: {type: String, required: true},
    password:{type: String, required: true},
    mobileNo: {type: String, required: true},
    alternateNo: {type: String, required: true},
    farmLocation: {type: String, required: true},
    profileUrl: {type: String, required: true},
    profileId : {type: String, required: true}

})

module.exports = mongoose.model('Farmer',FarmerSchema)