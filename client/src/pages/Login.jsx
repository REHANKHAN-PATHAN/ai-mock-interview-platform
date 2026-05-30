import React,{useState}

from "react"

import axios from "axios"

import {

Link,

useNavigate

}

from "react-router-dom"

import {

FaEye,

FaEyeSlash,

FaEnvelope,

FaLock

}

from "react-icons/fa"

function Login(){

const navigate =
useNavigate()

const [email,setEmail]
= useState("")

const [password,setPassword]
= useState("")

const [showPassword,
setShowPassword]

= useState(false)

const loginUser =
async()=>{

try{

const res =
await axios.post(

"http://localhost:5000/api/auth/login",

{
email,
password
}
)

localStorage.setItem(
"token",
res.data.token
)

localStorage.setItem(

"user",

JSON.stringify(
res.data.user
)

)

alert(
"Login Successful"
)

navigate("/dashboard")
}

catch(err){

console.log(err)

alert(

err.response?.data?.message

||

"Server not running"

)
}
}

return(

<div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 px-4">

<div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[35px] p-10 shadow-[0_0_60px_rgba(59,130,246,0.3)]">

<h1 className="text-6xl font-black text-center bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-tight">

AI Mock
<br/>
Interview

</h1>

<p className="text-center text-slate-400 mt-3 mb-10 text-lg">

Welcome Back

</p>

<div className="space-y-5">

<div className="relative">

<FaEnvelope
className="absolute top-1/2 left-5 -translate-y-1/2 text-slate-400"
/>

<input

className="w-full bg-slate-900/70 border border-slate-700 focus:border-blue-500 transition-all rounded-2xl py-4 pl-14 pr-5 text-white outline-none"

type="email"

placeholder="Email"

onChange={(e)=>

setEmail(
e.target.value
)}
/>

</div>

<div className="relative">

<FaLock
className="absolute top-1/2 left-5 -translate-y-1/2 text-slate-400"
/>

<input

className="w-full bg-slate-900/70 border border-slate-700 focus:border-blue-500 transition-all rounded-2xl py-4 pl-14 pr-14 text-white outline-none"

type={showPassword ? "text" : "password"}

placeholder="Password"

onChange={(e)=>

setPassword(
e.target.value
)}
/>

<div

onClick={()=>

setShowPassword(
!showPassword
)}

className="absolute top-1/2 right-5 -translate-y-1/2 text-slate-400 cursor-pointer"

>

{

showPassword

?

<FaEyeSlash/>

:

<FaEye/>

}

</div>

</div>

<button

onClick={loginUser}

className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.03] transition-all duration-300 py-4 rounded-2xl text-xl font-bold shadow-lg shadow-blue-500/30"

>

Login

</button>

</div>

<p className="text-center mt-8 text-slate-400">

New user?

<Link
to="/register"
className="text-blue-400 hover:text-cyan-300 font-semibold ml-1"
>

Signup

</Link>

</p>

</div>

</div>
)
}

export default Login