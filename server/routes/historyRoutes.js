const router =
require("express").Router()

const History =
require("../models/History")

router.post(

"/save",

async(req,res)=>{

try{

const history =
await History.create(

req.body

)

res.status(200).json(
history
)

}

catch(err){

res.status(500).json({

message:"Save Error"

})

}

}

)

router.get(

"/all",

async(req,res)=>{

try{

const history =
await History.find()

.sort({createdAt:-1})

res.status(200).json(
history
)

}

catch(err){

res.status(500).json({

message:"Fetch Error"

})

}

}

)

module.exports = router