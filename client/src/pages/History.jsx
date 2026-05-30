import { useEffect, useState } from "react"

function History(){

const [history,setHistory] =
useState([])

useEffect(()=>{

const fetchHistory =
async()=>{

try{

const res =
await fetch(

'${import.meta.env.VITE_API_URL}/api/history/all'

)

const data =
await res.json()

setHistory(data)

}

catch(err){

console.log(err)

}

}

fetchHistory()

},[])

return(

<div className="min-h-screen bg-slate-950 text-white p-10">

<h1 className="text-5xl font-black">

History

</h1>

<div className="mt-10 space-y-5">

{

history.length === 0

?

<div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-center">

<h2 className="text-3xl font-bold">

No History Yet

</h2>

<p className="text-slate-400 mt-4">

Start your first interview to see results here.

</p>

</div>

:

history.map((item,index)=>(

<div

key={index}

className="bg-slate-800 border border-white/10 p-6 rounded-3xl"

>

<h2 className="text-2xl font-bold">

{

item.type === "AI Interview"

?

"🤖 AI Interview"

:

item.type === "Voice Interview"

?

"🎤 Voice Interview"

:

item.type === "Resume Analysis"

?

"📄 Resume Analysis"

:

"💻 Coding Round"

}

</h2>

<p className="mt-3 text-slate-300 whitespace-pre-wrap">

{item.result}

</p>

<p className="mt-4 text-sm text-slate-500">

{item.date}

</p>

</div>

))

}

</div>

</div>

)

}

export default History