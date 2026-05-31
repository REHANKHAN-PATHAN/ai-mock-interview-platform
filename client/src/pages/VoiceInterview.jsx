import { useState } from "react"

import axios from "axios"

import SpeechRecognition, {

useSpeechRecognition

}

from "react-speech-recognition"

import {

FaMicrophone,

FaRobot

}

from "react-icons/fa"

function VoiceInterview(){

const [question,
setQuestion]

= useState("")

const [feedback,
setFeedback]

= useState("")

const [loading,
setLoading]

= useState(false)

const {

transcript,

resetTranscript,

browserSupportsSpeechRecognition

}

=

useSpeechRecognition()

if(

!browserSupportsSpeechRecognition

){

return(

<div>

Browser doesn't support speech recognition.

</div>

)

}

const generateQuestion =
async()=>{
    console.log("Generate Clicked")

try{

setLoading(true)

const res =
await axios.post(

`${import.meta.env.VITE_API_URL}/api/voice/question`

)

setQuestion(
res.data.question
)

setFeedback("")

resetTranscript()

setLoading(false)

}

catch(err){

console.log(err)

setLoading(false)

}

}

const startListening =
()=>{

SpeechRecognition.startListening({

continuous:true,

language:"en-US"

})

}

const stopListening =
()=>{

SpeechRecognition.stopListening()

}

const submitAnswer =
async()=>{

try{

const res =
await axios.post(

`${import.meta.env.VITE_API_URL}/api/voice/evaluate`,

{

question,

answer: transcript

}

)

setFeedback(

res.data.feedback

)
const user =
JSON.parse(
localStorage.getItem("user")
)

const history =

JSON.parse(

localStorage.getItem(
"history"
)

) || []

history.push({

type:"Voice Interview",

result:

res.data.feedback,

date:

new Date()
.toLocaleString()

})

await axios.post(
`${import.meta.env.VITE_API_URL}/api/history/save`,
{
userId:user._id,
type:"Voice Interview",
result:res.data.feedback,
date:new Date().toLocaleString()
}
)

localStorage.setItem(

"history",

JSON.stringify(
history
)

)

localStorage.setItem(

"voiceInterviews",

Number(

localStorage.getItem(
"voiceInterviews"
) || 0

) + 1

)

}

catch(err){

console.log(err)

setFeedback(
"❌ Failed to evaluate voice interview."
)

}

}

return(

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-10">

<h1 className="text-5xl font-black text-pink-400 flex items-center gap-4">

<FaRobot/>

Voice Interview

</h1>

<p className="text-slate-400 mt-4">

Practice spoken interviews using AI.

</p>

<button

onClick={generateQuestion}

className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 rounded-2xl text-xl font-bold"

>

{

loading

?

"Generating..."

:

"Generate Question"

}

</button>

<div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

<h2 className="text-2xl font-bold text-pink-300">

Interview Question

</h2>

<p className="mt-5 text-xl">

{

question ||

"Click Generate Question"

}

</p>

</div>

<div className="mt-10 flex gap-5 flex-wrap">

<button

onClick={startListening}

className="bg-green-500 px-6 py-3 rounded-2xl font-bold flex items-center gap-3"

>

<FaMicrophone/>

Start Speaking

</button>

<button

onClick={stopListening}

className="bg-red-500 px-6 py-3 rounded-2xl font-bold"

>

Stop Speaking

</button>

<button

onClick={submitAnswer}

className="bg-cyan-500 px-6 py-3 rounded-2xl font-bold"

>

Submit Voice Answer

</button>

</div>

<div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

<h2 className="text-2xl font-bold text-cyan-300">

Transcript

</h2>

<p className="mt-5 whitespace-pre-wrap">

{

transcript ||

"Start speaking..."

}

</p>

</div>

{

feedback &&

<div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

<h2 className="text-3xl font-bold text-green-400">

AI Feedback

</h2>

<p className="mt-5 whitespace-pre-wrap">

{feedback}

</p>

</div>

}

</div>

)

}

export default VoiceInterview