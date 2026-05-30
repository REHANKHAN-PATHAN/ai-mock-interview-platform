import { FaUser, FaRobot, FaMicrophone, FaCode } from "react-icons/fa"

function Profile(){

const user =

JSON.parse(
localStorage.getItem("user")
)

const interviewsTaken =

localStorage.getItem(
"interviewsTaken"
) || 0

const voiceInterviews =

localStorage.getItem(
"voiceInterviews"
) || 0

const codingSolved =

localStorage.getItem(
"codingSolved"
) || 0

return(

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-10">

<h1 className="text-5xl font-black flex items-center gap-4">

<FaUser/>

Profile

</h1>

<div className="mt-10 bg-white/5 border border-white/10 rounded-3xl p-8">

<h2 className="text-3xl font-bold">

{user?.username}

</h2>

<p className="text-slate-400 mt-3">

{user?.email}

</p>

</div>

{
Number(interviewsTaken)
+
Number(voiceInterviews)
+
Number(codingSolved)

=== 0

&&

<div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center mb-10">

<h2 className="text-3xl font-bold">

No Activity Yet

</h2>

<p className="text-slate-400 mt-4">

Complete interviews and coding rounds to see progress.

</p>

</div>

}

<div className="grid md:grid-cols-3 gap-6 mt-10">

<div className="bg-white/5 border border-white/10 rounded-3xl p-8">

<FaRobot className="text-5xl text-blue-400"/>

<h3 className="mt-5 text-xl">

AI Interviews

</h3>

<p className="text-5xl font-black mt-4">

{interviewsTaken}

</p>

</div>

<div className="bg-white/5 border border-white/10 rounded-3xl p-8">

<FaMicrophone className="text-5xl text-pink-400"/>

<h3 className="mt-5 text-xl">

Voice Interviews

</h3>

<p className="text-5xl font-black mt-4">

{voiceInterviews}

</p>

</div>

<div className="bg-white/5 border border-white/10 rounded-3xl p-8">

<FaCode className="text-5xl text-purple-400"/>

<h3 className="mt-5 text-xl">

Coding Solved

</h3>

<p className="text-5xl font-black mt-4">

{codingSolved}

</p>

</div>

</div>

</div>

)

}

export default Profile