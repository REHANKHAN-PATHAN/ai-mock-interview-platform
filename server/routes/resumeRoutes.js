const router = require("express").Router()

const multer = require("multer")

const pdfParse = require("pdf-parse")

const fs = require("fs")

const axios = require("axios")

const upload =
multer({

dest:"uploads/"

})

router.post(

"/analyze",

upload.single("resume"),

async(req,res)=>{

try{

const dataBuffer =
fs.readFileSync(

req.file.path

)

const pdfData =
await pdfParse(
dataBuffer
)

const resumeText =
pdfData.text

const response =
await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{

model:

"nvidia/nemotron-3-super-120b-a12b:free",

messages:[

{

role:"user",

content:

`Analyze whether this resume is ATS friendly or not.

Check:
1. ATS compatibility score out of 100
2. Resume formatting
3. Readability
4. Important missing sections
5. Resume structure quality
6. Improvement suggestions

Do NOT judge based on technical domain, programming languages, or software engineering skills.

Focus ONLY on:
- ATS friendliness
- Resume formatting
- Structure
- Professional presentation
- Readability

Keep response concise and professional.

Resume:
${resumeText}

Return:
1. ATS Score /100
2. Missing Skills
3. Improvement Tips
4. Short Summary

Keep response concise.`

}

]

},

{

headers:{

Authorization:

`Bearer ${process.env.OPENROUTER_API_KEY}`,

"Content-Type":

"application/json"

}

}

)

const feedback =

response.data
.choices[0]
.message.content

res.status(200).json({

feedback

})

}

catch(err){

console.log(err)

res.status(500).json({

message:"Resume Analysis Error"

})
}
})

module.exports = router