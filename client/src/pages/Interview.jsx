import {

useState,

useRef

}

from "react"

import axios from "axios"

import { ReactTyped }

from "react-typed"

import {

FaRobot,

FaPaperPlane,

FaMicrophone,

FaVolumeUp

}

from "react-icons/fa"

function Interview(){

const [question,
setQuestion]

= useState("")

const [answer,
setAnswer]

= useState("")

const [feedback,
setFeedback]

= useState("")

const [evaluating,
setEvaluating]

= useState(false)

const [loading,
setLoading]

= useState(false)

const [category,
setCategory]

= useState("Frontend")

const [listening,
setListening]

= useState(false)

const recognitionRef =
useRef(null)

const speakQuestion =
(text)=>{

const speech =

new SpeechSynthesisUtterance(
text
)

speech.lang =
"en-US"

speech.rate = 1

window.speechSynthesis.speak(
speech
)

}


const generateQuestion =
async()=>{

try{

setLoading(true)

const res =
await axios.post(

`${import.meta.env.VITE_API_URL}/api/ai/question`,

{

category

}

)

setQuestion(
res.data.question
)

speakQuestion(
res.data.question
)

setFeedback("")

setAnswer("")

setLoading(false)

}

catch(err){

console.log(err)

setLoading(false)

}
}

const evaluateAnswer =
async()=>{

try{

setEvaluating(true)

const res =
await axios.post(

`${import.meta.env.VITE_API_URL}/api/ai/evaluate`,

{
question,
answer
}

)

setFeedback(
res.data.feedback
)

const history =

JSON.parse(
localStorage.getItem("history")
) || []

history.push({

type:"AI Interview",

result:
res.data.feedback.slice(0,150) + "...",

date:
new Date().toLocaleString()

})

await axios.post(

`${import.meta.env.VITE_API_URL}/api/history/save`,

{

type:"AI Interview",

result:
res.data.feedback,

date:
new Date().toLocaleString()

}

)

localStorage.setItem(

"history",

JSON.stringify(history)

)

localStorage.setItem(

"interviewsTaken",

Number(

localStorage.getItem(
"interviewsTaken"
) || 0

) + 1

)

setEvaluating(false)

}

catch(err){

console.log(err)

setFeedback(
"❌ Failed to evaluate answer. Please try again."
)

setEvaluating(false)

}
}

const startVoiceInput =
()=>{

const recognition =

new window.webkitSpeechRecognition()

recognition.continuous =
true

recognition.interimResults =
true

recognition.lang =
"en-US"

recognitionRef.current =
recognition

setListening(true)

let finalTranscript =
""

recognition.start()

recognition.onresult =
(event)=>{

for(

let i = event.resultIndex;

i < event.results.length;

i++

){

const transcript =

event.results[i][0]
.transcript

if(

event.results[i]
.isFinal

){

finalTranscript +=
transcript + " "

}

}

setAnswer(
finalTranscript
)

}

recognition.onerror =
()=>{

setListening(false)

}

recognition.onend =
()=>{

if(listening){

recognition.start()

}

}
}

const stopVoiceAndSubmit =
()=>{

setListening(false)

recognitionRef.current?.stop()

evaluateAnswer()

}

return(

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-10">

<h1 className="text-5xl font-black text-blue-400 flex items-center gap-4">

<FaRobot/>

AI Mock Interview

</h1>

<p className="text-slate-400 mt-4 text-lg">

Practice real AI-powered interviews

</p>

<div className="flex flex-wrap gap-5 mt-8">

<select

value={category}

onChange={(e)=>

setCategory(
e.target.value
)

}

className="bg-slate-900 border border-white/10 px-5 py-4 rounded-2xl text-white"

>

<option value="Frontend">
Frontend
</option>

<option value="Backend">
Backend
</option>

<option value="DSA">
DSA
</option>

<option value="React">
React
</option>

<option value="JavaScript">
JavaScript
</option>

<option value="Node.js">
Node.js
</option>

<option value="MongoDB">
MongoDB
</option>

<option value="Java">
Java
</option>

</select>

<button

onClick={generateQuestion}

className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-all"

>

{
loading

?

<div className="flex items-center gap-2">

<div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>

Generating...

</div>

:

"Generate Question"
}

</button>

<button

onClick={()=>
speakQuestion(question)
}

className="bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-3 hover:scale-105 transition-all"

>

<FaVolumeUp/>

Speak Question

</button>

</div>

<div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">

<h2 className="text-2xl font-bold text-cyan-300">

Interview Question

</h2>
<div className="mt-5 text-xl leading-relaxed whitespace-pre-wrap min-h-[60px]">

{

question

?

<ReactTyped

strings={[question]}

typeSpeed={35}

showCursor={true}

/>

:

"Click Generate Question"

}

</div>

</div>

<div className="mt-10">

<textarea

className="w-full h-[220px] bg-white/5 border border-white/10 rounded-3xl p-6 outline-none text-lg backdrop-blur-xl"

placeholder="Type your answer here..."

value={answer}

onChange={(e)=>

setAnswer(
e.target.value
)}

></textarea>

<div className="flex flex-wrap gap-5">

{

!listening

?

<button

onClick={startVoiceInput}

className="mt-5 bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 rounded-2xl text-xl font-bold inline-flex items-center gap-3 hover:scale-105 transition-all"

>

<FaMicrophone/>

Voice Answer

</button>

:

<button

onClick={stopVoiceAndSubmit}

className="mt-5 bg-gradient-to-r from-red-500 to-pink-500 px-8 py-4 rounded-2xl text-xl font-bold inline-flex items-center gap-3 hover:scale-105 transition-all animate-pulse"

>

<FaPaperPlane/>

Submit Voice Answer

</button>

}

<button

onClick={evaluateAnswer}

className="mt-5 bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-3 hover:scale-105 transition-all"

>

<FaPaperPlane/>

{
evaluating

?

<div className="flex items-center gap-2">

<div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>

Evaluating...

</div>

:

"Submit Answer"
}

</button>

</div>

{

feedback &&

<div className="mt-10 grid md:grid-cols-3 gap-6">

<div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-3xl p-8 backdrop-blur-xl">

<h2 className="text-3xl font-black text-green-400">

AI Score

</h2>

<p className="text-5xl font-black mt-6">

{

feedback.match(/Score:\s*(.*)/)?.[1]

||

"8/10"

}

</p>

</div>

<div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

<h2 className="text-3xl font-black text-cyan-300">

AI Evaluation

</h2>

<p className="mt-6 text-lg leading-relaxed whitespace-pre-wrap">

{feedback}

</p>

</div>

</div>

}

</div>

</div>
)
}

export default Interview