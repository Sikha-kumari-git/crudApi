const express = require('express')
const router = express()
const vegetableSchema = require('../Model/Vegetable')
FarmerSchema = require('../Model/Farmer')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2

//add-vegetable 
router.post('/add-vegetable',async(req,res)=>{
console.log("addVegetable req")
try{


console.log(req.headers.authorization.split(" ")[1])

const verifyFarmer = await jwt.verify(req.headers.authorization.split(" ")[1], 'my birth place rims')
console.log(verifyFarmer)

//add-vegImage
const uploadVegPhoto = await cloudinary.uploader.upload(req.files.Photo.tempFilePath)
console.log(uploadVegPhoto)

const addVegetable = await new vegetableSchema({
    Name : req.body.Name,
    commonName : req.body.commonName,
    price : req.body.price,
    quantity : req.body.quantity,
    category : req.body.category,
    season : req.body.season,
    vegetableUrl : uploadVegPhoto.secure_url,
    vegetableId : uploadVegPhoto.public_id,
    userId : verifyFarmer.loginId
})
const newVeg = await addVegetable.save()
res.status(200).json({
    vegetableAdded : newVeg,
    congrats : "vegetable added successfully"
})
}
catch(err)
{
    res.status(500).json({
        error: "vegetable not added successfully",
        msg : err
        
    })
    
}
})

//get vegetable by Id

router.get('/get-vegetable/:vegId', async(req,res)=>{
    console.log("get vegetable req")
    try{
        const verifyFarmer = await jwt.verify(req.headers.authorization.split(" ")[1], 'my birth place rims')
        console.log(verifyFarmer)

        const getVeg = await vegetableSchema.findById({_id: req.params.vegId, userId: verifyFarmer.loginId})
        res.status(200).json({
            getVegetable : getVeg
        })
    }
    catch(err)
    {
        res.status(500).json({
            msg : "OOPS! SOMETHING WENT"
        })
    }
})

//update by id
router.put('/update-vegetable/:vegId', async(req,res)=>{
    console.log("update vegetable req")
    try{
        const verifyFarmer = await jwt.verify(req.headers.authorization.split(" ")[1], 'my birth place rims')
        console.log(verifyFarmer)

        const findveg = await vegetableSchema.find({_id: req.params.vegId})
        console.log(findveg)

        if(findveg[0].userId != verifyFarmer.loginId)
        {
            res.status(500).json({
                error: "invalid farmer"
            })
        }

        if(req.files)
        {
            //update veg photo
            console.log("deleting old vegetable photo from cloudinary")
            await cloudinary.uploader.destroy(findveg[0].vegetableId)
            console.log("uploading new photo")
            updatedPhoto = await cloudinary.uploader.upload(req.files.Photo.tempFilePath)
        }
        console.log(updatedPhoto)
        const newVeg = {
            Name : req.body.Name,
            commonName : req.body.commonName,
            price : req.body.price,
            quantity : req.body.quantity,
            category : req.body.category,
            season : req.body.season,
            vegetableUrl : updatedPhoto.secure_url,
            vegetableId : updatedPhoto.public_id
     
        }
        updatedVeg = await vegetableSchema.findByIdAndUpdate(req.params.vegId,newVeg,{new:true})
        res.status(200).json({
            updatedVegDetails : updatedVeg
        })
     }
    catch(err)
    {
        res.status(500).json({
            msg : "OOPS! SOMETHING WENT"
        })
    }
}) 

//Delete veg by Id

router.delete('/delete-veg/:vegId', async(req,res)=>{
    console.log("delete veg req")
    try{
        const verifyFarmer = await jwt.verify(req.headers.authorization.split(" ")[1], 'my birth place rims')
        console.log(verifyFarmer)

        const findveg = await vegetableSchema.find({_id: req.params.vegId})
        console.log(findveg)

        if(findveg[0].userId != verifyFarmer.loginId)
        {
            res.status(500).json({
                error : "invalid farmer"
            })
        }

        await cloudinary.uploader.destroy(findveg[0].vegetableId)
        await vegetableSchema.findByIdAndDelete(req.params.vegId)

        res.status(200).json({
            msg : "Data Deleted"
        })
    }
    catch(err)
    {
        res.status(500).json({
            error : " OOPS! SOMETHING WENT WRONG"
        })
    }
})


module.exports = router