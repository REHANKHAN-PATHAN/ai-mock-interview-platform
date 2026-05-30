import {

useState

}

from "react"

import axios from "axios"

import {

FaFileUpload,

FaFileAlt

}

from "react-icons/fa"

function ResumeAnalyzer(){

const [file,
setFile]

= useState(null)

const [loading,
setLoading]

= useState(false)

const [feedback,
setFeedback]

= useState("")

const uploadResume =
async()=>{

if(!file){

alert("Upload Resume")

return
}

try{

setLoading(true)

const formData =
new FormData()

formData.append(
"resume",
file
)

const res =
await axios.post(

'${import.meta.env.VITE_API_URL}/api/resume/analyze',

formData

)

setFeedback(
res.data.feedback
)

const history =

JSON.parse(
localStorage.getItem("history")
) || []

history.push({

type:"Resume Analysis",

result:
res.data.feedback,

date:
new Date().toLocaleString()

})

await axios.post(

'${import.meta.env.VITE_API_URL}/api/history/save',

{

type:"Resume Analysis",

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

setLoading(false)

}

catch(err){

console.log(err)

setFeedback(
"❌ Resume analysis failed."
)

setLoading(false)

}

}

return(

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-10">

<h1 className="text-5xl font-black text-cyan-300 flex items-center gap-4">

<FaFileAlt/>

Resume Analyzer

</h1>

<p className="text-slate-400 mt-4 text-lg">

Upload your resume and get AI ATS feedback

</p>

<div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">

<input

type="file"

accept=".pdf"

onChange={(e)=>

setFile(
e.target.files[0]
)}

className="mb-6"

/>

<button

onClick={uploadResume}

className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-2xl text-xl font-bold flex items-center gap-3 hover:scale-105 transition-all"

>

<FaFileUpload/>

{
loading

?

<div className="flex items-center gap-2">

<div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>

Analyzing...

</div>

:

"Analyze Resume"
}

</button>

</div>

{

feedback &&

<div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

<h2 className="text-3xl font-black text-green-400">

AI Resume Feedback

</h2>

<p className="mt-6 text-lg whitespace-pre-wrap leading-relaxed">

{feedback}

</p>

</div>

}

</div>
)
}

export default ResumeAnalyzer