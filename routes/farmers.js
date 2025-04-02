const express = require('express')
const router = express()
const FarmerSchema = require('../Model/Farmer')
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
})

router.post('/signup',async(req,res)=>{
    console.log(req.files)
    console.log(req.body)
    try{
        const findSignUpUser = await FarmerSchema.find({email: req.body.email})
        console.log(findSignUpUser)
       if(findSignUpUser.length >0)
        {
        console.log("email already registered")
        res.status(500).json({
           error: "email already registered"
        })
        }

    const hashcode = await bcrypt.hash(req.body.password,10)
    console.log(hashcode)

    const userProfileUpload = await cloudinary.uploader.upload(req.files.profile.tempFilePath)
    console.log(userProfileUpload)
    const newFarmer = new FarmerSchema({
        FullName : req.body.fullName,
        email : req.body.email,
        address : req.body.address,
        password : hashcode,
        mobileNo : req.body.mobileNo,
        alternateNo : req.body.alternateNo,
        farmLocation : req.body.farmLocation,
        profileUrl : userProfileUpload.secure_url,
        profileId : userProfileUpload.public_id
    })
    const newFarmerSave = await newFarmer.save()
    res.status(200).json({
        accountCreated : newFarmerSave
    })

    }
    catch(err)
    {
        res.status(500).json({
            error : err
        })
    }
})

router.post('/login',async(req,res)=>{
    try
    {
    console.log(req.body)
    findLoginUser = await FarmerSchema.find({email: req.body.email})
    console.log(findLoginUser)
    if(findLoginUser.length == 0)
    {
        console.log("email is not registered")
        res.status(500).json({
            error: "email is not registered"
         })
    }

    const passwordMatch = await bcrypt.compare(req.body.password,findLoginUser[0].password)
    console.log(passwordMatch)
    if(passwordMatch == false)
    {
        console.log("invalid password")
        res.status(500).json({
            error: "invalid password"
         })
    }

    const farmerToken = await jwt.sign({
        FullName :findLoginUser[0].FullName,
        email : findLoginUser[0].email,
        address : findLoginUser[0].address,
        mobileNo : findLoginUser[0].mobileNo,
        alternateNo : findLoginUser[0].alternateNo,
        farmLocation : findLoginUser[0].farmLocation,
        profileUrl : findLoginUser[0].profileUrl,
        profileId : findLoginUser[0].profileId,
        loginId : findLoginUser[0]._id
    },'my birth place rims',
    {
       expiresIn : '365d'
    })

    console.log(farmerToken)

    res.status(200).json({
        FullName :findLoginUser[0].fullName,
        email : findLoginUser[0].email,
        address : findLoginUser[0].address,
        mobileNo : findLoginUser[0].mobileNo,
        alternateNo : findLoginUser[0].alternateNo,
        farmLocation : findLoginUser[0].farmLocation,
        profileUrl : findLoginUser[0].profileUrl,
        profileId : findLoginUser[0].profileId,
        yourToken : farmerToken
    })
}
catch(err)
{
    res.status(500).json({
        error : "something went wrong"
    })
}
})

module.exports = router