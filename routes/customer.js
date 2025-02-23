const express = require('express')
const router = express()
const vegetableSchema = require('../Model/Vegetable')

//get vegetable by veg name
router.get('/get-vegName/:vegName', async(req,res)=>{
    console.log("get vegetable by name")
    try
    {
      const findVeg = await vegetableSchema.find({Name : req.params.vegName}).populate('userId', 'FullName farmLocation mobileNo alternateNo ')
      console.log(findVeg)
      res.status(200).json({
        YourSearch : findVeg
      })
    }
    catch(err)
    {
        res.status(500).json({
            msg : " Something went wrong"
        })
    }
})

//get vegetable by common name
router.get('/get-vegCommonName/:vegCommonName', async(req,res)=>{
    console.log("get vegetable by common name")
    try
    {
        const findVeg = await vegetableSchema.find({commonName : req.params.vegCommonName}).populate('userId', 'FullName farmLocation mobileNo alternateNo ')
        console.log(findVeg)
        res.status(200).json({
          YourSearch : findVeg
        })
    }
    catch(err)
    {
        res.status(500).json({
            msg : " Something went wrong"
        })
    }
    
})

//get vegetable by season
router.get('/get-vegSeason/:vegSeason', async(req,res)=>{
    console.log("get vegetable by season")
    try
    {
        const findVeg = await vegetableSchema.find({season : req.params.vegSeason}).populate('userId', 'FullName farmLocation mobileNo alternateNo ')
        console.log(findVeg)
        res.status(200).json({
          YourSearch : findVeg
        })
    }
    catch(err)
    {
        res.status(500).json({
            msg : " Something went wrong"
        })
    }
    
})

//get vegetable by category
router.get('/get-vegCategory/:vegCategory', async(req,res)=>{
    console.log("get vegetable by category")
    try
    {
        const findVeg = await vegetableSchema.find({category : req.params.vegCategory}).populate('userId', 'FullName farmLocation mobileNo alternateNo ')
        console.log(findVeg)
        res.status(200).json({
          YourSearch : findVeg
        })
    }
    catch(err)
    {
        res.status(500).json({
            msg : " Something went wrong"
        })
    }
    
})

// //get vegetable by farmerName
// router.get('/get-vegName/:farmerName', async(req,res)=>{
//     console.log("get vegetable by farmer name")
//     try
//     {
//         const findVeg = await vegetableSchema.find({Name : req.params.farmerName})
//         console.log(findVeg)
//         res.status(200).json({
//           YourSearch : findVeg
//         })
//     }
//     catch(err)
//     {
//         res.status(500).json({
//             msg : " Something went wrong"
//         })
//     }
// })

// //get vegetable by farmer address
// router.get('/get-vegName/:farmerAddress', async(req,res)=>{
//     console.log("get vegetable by farmer address")
//     try
//     {
//         const findVeg = await vegetableSchema.find({Name : req.params.farmerAddress})
//         console.log(findVeg)
//         res.status(200).json({
//           YourSearch : findVeg
//         })
//     }
//     catch(err)
//     {
//         res.status(500).json({
//             msg : " Something went wrong"
//         })
//     }
// })

// //get vegetable by farmlocation
// router.get('/get-vegName/:farmLocation', async(req,res)=>{
//     console.log("get vegetable by farm location")
//     try
//     {
//         const findVeg = await vegetableSchema.find({Name : req.params.farmLocation})
//         console.log(findVeg)
//         res.status(200).json({
//           YourSearch : findVeg
//         })
//     }
//     catch(err)
//     {
//         res.status(500).json({
//             msg : " Something went wrong"
//         })
//     }
// })
module.exports = router
