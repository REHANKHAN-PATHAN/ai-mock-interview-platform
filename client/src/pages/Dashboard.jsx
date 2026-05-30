import {

FaRobot,

FaChartLine,

FaFileAlt,

FaCode,

FaMicrophone,

FaArrowRight,

FaBrain,

FaTrophy,

FaClock

}

from "react-icons/fa"

import {

BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer

}

from "recharts"

import {motion}

from "framer-motion"

import {
useEffect,
useState
}
from "react"

import {

useNavigate

}

from "react-router-dom"


function Dashboard(){

const navigate =
useNavigate()

const [stats,
setStats]

= useState(null)


useEffect(()=>{

const token =
localStorage.getItem(
"token"
)

if(!token){

navigate("/")
}

},[])

useEffect(()=>{

const fetchStats =
async()=>{

try{

const res =
await fetch(

`${import.meta.env.VITE_API_URL}/api/analytics/stats`

)

const data =
await res.json()

setStats(data)

}

catch(err){

console.log(err)

}

}

fetchStats()

},[])

const user =
JSON.parse(
localStorage.getItem("user")
)

const chartData = [

{

name:"AI",

value:

stats
?
stats.aiInterviews
:
0

},

{

name:"Voice",

value:

stats
?
stats.voiceInterviews
:
0

},

{

name:"Resume",

value:

stats
?
stats.resumeAnalyses
:
0

},

{

name:"Coding",

value:

stats
?
stats.codingRounds
:
0

}

]

return(

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">

{/* TOP NAVBAR */}

<div className="flex justify-between items-center px-10 py-6 border-b border-white/10 backdrop-blur-xl bg-white/5 sticky top-0 z-50">

<h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

InterviewAI

</h1>

<div className="flex items-center gap-5">

<a

href="/history"

className="bg-slate-800 px-6 py-3 rounded-2xl hover:bg-slate-700 transition-all"

>

History

</a>

<button

onClick={()=>
navigate("/interview")
}

className="bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all"

>

Start Interview

</button>

<button

onClick={()=>{

localStorage.clear()

navigate("/")

}}

className="bg-red-500 px-6 py-3 rounded-2xl font-bold hover:bg-red-600 transition-all"

>

Logout

</button>

</div>

</div>

<div className="flex">

{/* SIDEBAR */}

<div className="w-[280px] min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 hidden lg:block">

<div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-[2px] rounded-3xl">

<div className="bg-slate-950 rounded-3xl p-6">

<h2 className="text-2xl font-bold">

Welcome Back,
<br/>
{user?.username} 👋

</h2>

<p className="text-slate-400 mt-2">

Prepare smarter with AI

</p>

</div>

</div>

<div className="mt-10 space-y-5">

<button onClick={()=>
navigate("/dashboard")
}
className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-2xl text-left font-bold">

Dashboard

</button>

<button
onClick={()=>
navigate("/interview")
}
className="w-full bg-slate-800 p-4 rounded-2xl text-left hover:bg-slate-700 transition-all"
>
Mock Interview
</button>

<a

href="/resume"

className="w-full bg-slate-800 p-4 rounded-2xl text-left hover:bg-slate-700 transition-all block"

>

Resume Analyzer

</a>

<button onClick={()=>
navigate("/coding")
} 
className="w-full bg-slate-800 p-4 rounded-2xl text-left hover:bg-slate-700 transition-all">

Coding Round

</button>

<button onClick={()=>
navigate("/voice-interview")
}
className="w-full bg-slate-800 p-4 rounded-2xl text-left hover:bg-slate-700 transition-all">

Voice Interview

</button>

<button

onClick={()=>
navigate("/profile")
}

className="w-full bg-slate-800 p-4 rounded-2xl text-left hover:bg-slate-700 transition-all"

>

Profile

</button>

</div>

</div>

{/* MAIN CONTENT */}

<div className="flex-1 p-10">

{/* HERO SECTION */}

<motion.div

initial={{opacity:0,y:30}}

animate={{opacity:1,y:0}}

transition={{duration:0.7}}

className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 shadow-[0_0_60px_rgba(59,130,246,0.15)]"

>

<div className="flex flex-col xl:flex-row justify-between gap-10 items-center">

<div>

<h1 className="text-6xl font-black leading-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

AI Mock
<br/>
Interview Platform

</h1>

<p className="text-slate-400 text-xl mt-6 max-w-[700px] leading-relaxed">

Prepare for placements with AI-powered mock interviews, resume analysis, coding challenges, and HR voice interviews.

</p>

<div className="flex gap-5 mt-8 flex-wrap">

<a
href="/interview"
className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-all flex items-center gap-3"
>

Start Interview

<FaArrowRight/>

</a>

</div>

</div>

<motion.div

animate={{y:[0,-10,0]}}

transition={{

repeat:Infinity,

duration:3

}}

className="hidden xl:block"

>

<div className="w-[280px] h-[280px] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-3xl opacity-30 absolute"></div>

<FaBrain className="text-[220px] text-blue-400 relative z-10"/>

</motion.div>

</div>

</motion.div>

{/* FEATURE CARDS */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-12">

<motion.a

href="/interview"

whileHover={{scale:1.05}}

className="bg-white/5 border border-white/10 p-8 rounded-[35px] backdrop-blur-xl block"

>

<FaRobot className="text-6xl text-blue-400"/>

<h2 className="text-3xl font-bold mt-6">

AI Interviews

</h2>

<p className="text-slate-400 mt-4 text-lg leading-relaxed">

Practice AI-generated frontend, backend, and DSA interview questions.

</p>

</motion.a>

<motion.a

href="/resume"

whileHover={{scale:1.05}}

className="bg-white/5 border border-white/10 p-8 rounded-[35px] backdrop-blur-xl block cursor-pointer"

>

<FaFileAlt className="text-6xl text-cyan-400"/>

<h2 className="text-3xl font-bold mt-6">

Resume Analyzer

</h2>

<p className="text-slate-400 mt-4 text-lg leading-relaxed">

Get ATS score, missing keywords, and smart AI resume improvements.

</p>

</motion.a>

<motion.a

href="/coding"

whileHover={{scale:1.05}}

className="bg-white/5 border border-white/10 p-8 rounded-[35px] backdrop-blur-xl block cursor-pointer"

>

<FaCode className="text-6xl text-purple-400"/>

<h2 className="text-3xl font-bold mt-6">

Coding Round

</h2>

<p className="text-slate-400 mt-4 text-lg leading-relaxed">

Solve coding interview questions with test cases and AI hints.

</p>

</motion.a>

<motion.div

whileHover={{scale:1.05}}

onClick={()=>
navigate("/voice-interview")
}

className="bg-white/5 border border-white/10 p-8 rounded-[35px] backdrop-blur-xl cursor-pointer"

>

<FaMicrophone className="text-6xl text-pink-400"/>

<h2 className="text-3xl font-bold mt-6">

Voice Interview

</h2>

<p className="text-slate-400 mt-4 text-lg leading-relaxed">

Practice spoken HR interviews using speech recognition and AI feedback.

</p>

</motion.div>

</div>

{/* ANALYTICS */}

<div className="mt-14 bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl">

<div className="flex items-center gap-5">

<FaChartLine className="text-5xl text-green-400"/>

<div>

<h2 className="text-4xl font-black">

Performance Analytics

</h2>

<p className="text-slate-400 mt-2">

Track your interview preparation progress

</p>

</div>

</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

<div className="bg-slate-900/60 border border-white/10 p-8 rounded-3xl">

<FaTrophy className="text-5xl text-yellow-400"/>

<h3 className="text-slate-400 mt-5 text-lg">

Average Score

</h3>

<p className="text-6xl font-black mt-4 text-yellow-400">

{
stats

?

`${Math.min(
60 + stats.total * 2,
100
)}%`

:

"0%"
}

</p>

</div>

<div className="bg-slate-900/60 border border-white/10 p-8 rounded-3xl">

<FaClock className="text-5xl text-cyan-400"/>

<h3 className="text-slate-400 mt-5 text-lg">

Hours Practiced

</h3>

<p className="text-6xl font-black mt-4 text-cyan-400">

{
stats

?

Math.floor(
stats.total * 0.5
)

:

0
}

</p>

</div>

<div className="bg-slate-900/60 border border-white/10 p-8 rounded-3xl">

<FaRobot className="text-5xl text-blue-400"/>

<h3 className="text-slate-400 mt-5 text-lg">

Interviews Taken

</h3>

<p className="text-6xl font-black mt-4 text-blue-400">

{
stats

?

stats.aiInterviews +
stats.voiceInterviews

:

0
}

</p>

</div>

</div>

</div>

{/* PROGRESS CHART */}

<div className="mt-12 bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl">

<h2 className="text-4xl font-black">

Progress Overview

</h2>

<p className="text-slate-400 mt-3">

Track your preparation activity

</p>

<div className="h-[400px] mt-10">

<ResponsiveContainer
width="100%"
height="100%"
>

<BarChart
data={chartData}
>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="value"/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</div>

</div>

</div>

)

}

export default Dashboard