const router = require("express").Router()

const axios = require("axios")

router.post(

"/run",

async(req,res)=>{

try{

const {code,language}
= req.body

const versionMap = {

javascript:"18.15.0",

python:"3.10.0",

java:"15.0.2",

cpp:"10.2.0"

}

const response =
await axios.post(

"https://emkc.org/api/v2/piston/execute",

{

language:language,

version:

versionMap[
language
],

files:[

{

content:code

}

]

}

)

res.status(200).json({

output:

response.data.run.output

})

}

catch(err){

console.log(

err.response?.data || err.message

)

res.status(500).json({

message:"Execution Error"

})
}
})

module.exports = router