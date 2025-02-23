const mongoose = require('mongoose')
const vegetableSchema = mongoose.Schema({
 Name : {type:String, required:true},
 commonName :  {type:String, required:true},
 price : {type:String, required:true},
 quantity : {type:String, required:true},
 category : {type:String, required:true},
 season : {type:String, required:true},
 vegetableUrl : {type:String, required:true},
 vegetableId : {type:String, required:true},
 userId :{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Farmer'}
})

module.exports = mongoose.model('vegSchema', vegetableSchema)