const router = require("express").Router()

const axios = require("axios")

const questions = [

"Tell me about yourself.",
"Why should we hire you?",
"What are your greatest strengths?",
"What is your biggest weakness?",
"Where do you see yourself in 5 years?",
"Describe a challenging project you worked on.",
"Tell me about a time you worked in a team.",
"Describe a conflict you resolved.",
"What motivates you to perform well?",
"Tell me about a failure and what you learned.",
"Describe your proudest achievement.",
"How do you handle pressure?",
"Tell me about a difficult decision you made.",
"Describe a leadership experience.",
"What are your career goals?",
"How do you manage deadlines?",
"Describe a time you helped a teammate.",
"Tell me about a mistake you made at work or college.",
"What do you know about our company?",
"Why do you want to join our company?",
"Describe a situation where you solved a problem.",
"How do you handle criticism?",
"What makes you different from other candidates?",
"Tell me about a time you exceeded expectations.",
"How do you prioritize your tasks?",
"Describe a situation where you showed initiative.",
"What is your biggest professional accomplishment?",
"Tell me about a time you failed.",
"How do you stay motivated?",
"Describe a challenge you overcame.",
"What skills make you suitable for this role?",
"Tell me about a time you worked under pressure.",
"How do you deal with disagreements in a team?",
"What is your ideal work environment?",
"Describe a time you learned something quickly.",
"How do you handle multiple responsibilities?",
"Tell me about a time you received feedback.",
"Describe a situation where you had to adapt.",
"What inspires you professionally?",
"Tell me about your leadership style.",
"How do you define success?",
"Describe a time you took responsibility.",
"What are your long-term career plans?",
"Tell me about a difficult customer or teammate.",
"How do you handle stress?",
"What is the most important lesson you've learned?",
"Describe a situation where you improved a process.",
"Tell me about a goal you achieved.",
"How do you contribute to team success?",
"What would your friends describe as your best quality?"

]

let askedQuestions = []

router.post(

"/question",

(req,res)=>{

try{

if(

askedQuestions.length ===

questions.length

){

askedQuestions = []

}

const availableQuestions =

questions.filter(

q =>

!askedQuestions.includes(q)

)

const randomQuestion =

availableQuestions[
Math.floor(
Math.random() *
availableQuestions.length
)
]

askedQuestions.push(
randomQuestion
)

res.status(200).json({

question: randomQuestion

})

}

catch(err){

console.log(err)

res.status(500).json({

message:"Question Error"

})

}

}

)

router.post(

"/evaluate",

async(req,res)=>{

try{

const {

question,

answer

}

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

`You are an HR interview evaluator.

Question:
${question}

Candidate Answer:
${answer}

Evaluate:

1. Score out of 10
2. Communication Rating
3. Confidence Rating
4. Strengths
5. Weaknesses
6. One Improvement Tip

Keep response concise and professional.`

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

console.log(

err.response?.data || err

)

res.status(500).json({

message:"Voice Evaluation Error"

})

}

}

)

module.exports = router