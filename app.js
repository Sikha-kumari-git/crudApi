const express = require('express')
const app = express()
const mongoose = require('mongoose')
const FarmerRoute = require('./routes/farmers')
const vegetableRoute = require('./routes/vegetable')
const customerRoute = require('./routes/customer')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const connectDatabase = async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected with database")
    }
    catch(err)
    {
        console.log("Something Went Wrong")
        console.log(err)
    }
}
connectDatabase()

app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles : true,
    // tempFileDir : '/tmp/'
}));
app.use('/auth',FarmerRoute)
app.use('/vegetable',vegetableRoute )
app.use('/customer',customerRoute)
module.exports = app