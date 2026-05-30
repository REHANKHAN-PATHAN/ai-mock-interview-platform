const router = require("express").Router()

const History =
require("../models/History")

router.get(

"/stats",

async(req,res)=>{

try{

const history =
await History.find()

const aiInterviews =

history.filter(

item =>
item.type ===
"AI Interview"

).length

const voiceInterviews =

history.filter(

item =>
item.type ===
"Voice Interview"

).length

const resumeAnalyses =

history.filter(

item =>
item.type ===
"Resume Analysis"

).length

const codingRounds =

history.filter(

item =>
item.type ===
"Coding Round"

).length

res.json({

aiInterviews,

voiceInterviews,

resumeAnalyses,

codingRounds,

total:

history.length

})

}

catch(err){

res.status(500).json({

message:"Analytics Error"

})

}

}

)

module.exports = router