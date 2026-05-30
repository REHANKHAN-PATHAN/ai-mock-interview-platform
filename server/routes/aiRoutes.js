const router = require("express").Router()

const axios = require("axios")

const Interview =
require("../models/Interview")

// GENERATE QUESTION

router.post("/question", async(req,res)=>{

const {

category = "Frontend"

} = req.body

try{

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

`Generate ONE unique technical interview question.

Category:
${category}

Rules:
- Ask ONLY from ${category}
- Do NOT ask HR questions
- Keep under 20 words
- Return ONLY the question`

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

const question =

response.data
.choices[0]
.message.content

res.status(200).json({

question

})

}

catch(err){

console.log(err.response?.data || err)

res.status(500).json({

message:"AI Error"

})
}
})

// EVALUATE ANSWER

router.post(

"/evaluate",

async(req,res)=>{

try{

const {question,answer}
= req.body

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

`You are an interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Return response in EXACT format:

Score: x/10

Feedback:
short feedback

Improvement:
one improvement tip

Keep it concise and professional.`

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

await Interview.create({

question,

answer,

feedback

})

res.status(200).json({

feedback

})
}

catch(err){

console.log(err.response?.data || err)

res.status(500).json({

message:"Evaluation Error"

})
}
})

router.get(

"/history",

async(req,res)=>{

try{

const history =
await Interview.find()

.sort({createdAt:-1})

res.status(200).json(
history
)

}

catch(err){

res.status(500).json({

message:"History Error"

})
}
})

module.exports = router