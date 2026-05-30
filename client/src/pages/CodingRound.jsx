import {

useState,
useEffect

}

from "react"

import Editor from "@monaco-editor/react"

import axios from "axios"

import {

FaCode,

FaPlay,

FaLightbulb

}

from "react-icons/fa"

function CodingRound(){

const questions = [

{
title:"Write a function to reverse a string.",
difficulty:"Easy",
timer:300,
input:"hello",
expected:"olleh",
hint:"Use loops or reverse methods."
},

{
title:"Check whether a string is palindrome.",
difficulty:"Easy",
timer:300,
input:"madam",
expected:"Palindrome",
hint:"Compare string with reversed version."
},

{
title:"Find maximum element in array [2,5,8,1].",
difficulty:"Easy",
timer:300,
input:"[2,5,8,1]",
expected:"8",
hint:"Loop through array and track maximum."
},

{
title:"Two Sum Problem",
difficulty:"Medium",
timer:600,
input:"[2,7,11,15], target=9",
expected:"[0,1]",
hint:"Use hash map."
},

{
title:"Find Fibonacci of 10.",
difficulty:"Medium",
timer:600,
input:"10",
expected:"55",
hint:"Use iteration or recursion."
},

{
title:"Valid Parentheses",
difficulty:"Medium",
timer:600,
input:"()[]{}",
expected:"Valid",
hint:"Use stack."
},

{
title:"Binary Search in sorted array.",
difficulty:"Hard",
timer:900,
input:"[1,3,5,7,9], target=7",
expected:"3",
hint:"Use divide and conquer."
}

]

const starterCodes = {

javascript:

`function solve(){

console.log("Hello World")

}

solve()
`,

python:

`def solve():

    print("Hello World")

solve()
`,

java:

`public class Main {

public static void main(String[] args){

System.out.println("Hello World");

}

}
`,

cpp:

`#include <iostream>

using namespace std;

int main(){

cout << "Hello World";

return 0;

}
`

}

const [questionIndex,
setQuestionIndex]

= useState(0)

const [completed,
setCompleted]

= useState(0)

const [results,
setResults]

= useState([])

const currentQuestion =

questions[
questionIndex
]

const [timeLeft,
setTimeLeft]

= useState(

questions[0].timer

)

const [language,
setLanguage]

= useState("javascript")

const [code,
setCode]

= useState(

starterCodes.javascript

)

const [output,
setOutput]

= useState("")

const [score,
setScore]

= useState("0%")

const [performance,
setPerformance]

= useState("Poor")

const [flexibility,
setFlexibility]

= useState("Low")

const [showHint,
setShowHint]

= useState(false)

useEffect(()=>{

const timer =

setInterval(()=>{

setTimeLeft(prev=>{

if(prev <= 1){

return 0

}

return prev - 1

})

},1000)

return ()=>

clearInterval(timer)

},[])

useEffect(()=>{

setTimeLeft(

currentQuestion.timer

)

},[questionIndex])

const progress =

(

completed /

questions.length

)

*100

const runCode =
()=>{

try{

if(language !== "javascript"){

setOutput(

`${language.toUpperCase()} execution is currently unavailable.

Only JavaScript execution is supported right now.`

)

setScore("0%")

setPerformance("Unavailable")

setFlexibility("Unavailable")

return

}

let consoleOutput = ""

const originalConsole =
console.log

console.log =
(...args)=>{

consoleOutput +=
args.join(" ") + "\n"

}

eval(code)

console.log =
originalConsole

const finalOutput =

consoleOutput.trim()

setOutput(
finalOutput
)

if(

finalOutput !==
currentQuestion.expected

){

setResults(prev=>

[

...prev,

false

]

)

setScore("0%")

setPerformance("Poor")

setFlexibility("Low")

return

}

let calculatedScore = 0

if(

code.includes("typeof") ||

code.includes("Invalid Input")

){

calculatedScore = 100

}

else if(

(

code.includes("for") ||

code.includes("while")

)

&&

code.includes("return")

){

calculatedScore = 85

}

else if(

code.includes("split") &&

code.includes("reverse") &&

code.includes("join")

){

calculatedScore = 65

}

else{

calculatedScore = 50

}

if(calculatedScore >= 100){

setPerformance("Excellent")

setFlexibility("High")

}

else if(calculatedScore >= 85){

setPerformance("Fast")

setFlexibility("Medium")

}

else if(calculatedScore >= 65){

setPerformance("Average")

setFlexibility("Low")

}

else{

setPerformance("Poor")

setFlexibility("Low")

}

setScore(

`${calculatedScore}%`

)

setResults(prev=>

[

...prev,

true

]

)

setCompleted(

prev => prev + 1

)

localStorage.setItem(

"codingSolved",

Number(

localStorage.getItem(
"codingSolved"
) || 0

) + 1

)

}

catch(err){

setOutput(
err.message
)

setScore("0%")

setPerformance("Poor")

setFlexibility("Low")

}
}

const nextQuestion =
()=>{

if(

questionIndex <

questions.length - 1

){

setQuestionIndex(
prev => prev + 1
)

}

else{

saveCodingHistory()

}

setOutput("")

setScore("0%")

setPerformance("Poor")

setFlexibility("Low")

setShowHint(false)

}

const passed =

results.filter(

r => r === true

).length

const saveCodingHistory =
async()=>{

const history =

JSON.parse(
localStorage.getItem("history")
) || []

history.push({

type:"Coding Round",

result:
`${passed}/${questions.length} Passed`,

date:
new Date().toLocaleString()

})

localStorage.setItem(

"history",

JSON.stringify(history)

)

try{

await axios.post(

`${import.meta.env.VITE_API_URL}/api/history/save`,

{

type:"Coding Round",

result:
`${passed}/${questions.length} Passed`,

date:
new Date().toLocaleString()

}

)

}

catch(err){

console.log(err)

}

}

const failed =

results.filter(

r => r === false

).length

return(

<div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white p-10">

<h1 className="text-5xl font-black text-purple-400 flex items-center gap-4">

<div className="mt-6">

<div className="flex justify-between mb-3">

<p className="text-cyan-300 text-lg">

Question

{

questionIndex + 1

}

/

{

questions.length

}

</p>

<p className="text-red-400 text-lg font-bold">

⏱

{

Math.floor(

timeLeft / 60

)

}

:

{

String(

timeLeft % 60

).padStart(2,"0")

}

</p>

</div>

<div className="w-full bg-slate-800 rounded-full h-4">

<div

className="bg-gradient-to-r from-green-500 to-cyan-500 h-4 rounded-full transition-all"

style={{

width:

`${progress}%`

}}

></div>

</div>

</div>

<FaCode/>

Coding Interview Round

</h1>

<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

<div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

<h2 className="text-3xl font-black text-cyan-300">

Problem Statement

</h2>

<p className="mt-6 text-xl leading-relaxed">

{currentQuestion.title}

</p>

<div className="mt-8">

<h3 className="text-2xl font-bold text-green-400">

Example Test Case

</h3>

<div className="mt-4 bg-slate-900/60 p-5 rounded-2xl">

<p>

Input:
"{currentQuestion.input}"

</p>

<p className="mt-2">

Expected Output:
"{currentQuestion.expected}"

</p>

</div>

</div>

<div className="mt-8 flex gap-4 flex-wrap">

<button

onClick={()=>

setShowHint(
!showHint
)}

className="bg-yellow-500/20 border border-yellow-500/40 px-5 py-3 rounded-2xl flex items-center gap-3 hover:scale-105 transition-all"

>

<FaLightbulb/>

AI Hint

</button>

<button

onClick={nextQuestion}

className="bg-cyan-500/20 border border-cyan-500/40 px-5 py-3 rounded-2xl hover:scale-105 transition-all"

>

{

questionIndex ===

questions.length - 1

?

"Finish Round"

:

"Next Question"

}

</button>

</div>

{

showHint &&

<div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">

<h3 className="text-yellow-400 text-xl font-bold">

Hint

</h3>

<p className="mt-3 text-slate-300">

{currentQuestion.hint}

</p>

</div>

}

<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">

<div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5">

<h3 className="text-green-400 font-bold text-xl">

Difficulty

</h3>

<p className="text-3xl font-black mt-3">

{

currentQuestion
.difficulty

}

</p>

</div>

<div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5">

<h3 className="text-cyan-400 font-bold text-xl">

Expected Time

</h3>

<p className="text-3xl font-black mt-3">

{

currentQuestion.timer

/

60

}

Min

</p>

</div>

<div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-5">

<h3 className="text-purple-400 font-bold text-xl">

Category

</h3>

<p className="text-3xl font-black mt-3">

DSA

</p>

</div>

</div>

</div>

<div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">

<div className="flex justify-between items-center p-5 border-b border-white/10">

<select

value={language}

onChange={(e)=>{

const selectedLanguage =

e.target.value

setLanguage(
selectedLanguage
)

setCode(

starterCodes[
selectedLanguage
]

)

setOutput("")

setScore("0%")

setPerformance("Poor")

setFlexibility("Low")

}}

className="bg-slate-900 px-5 py-3 rounded-xl outline-none"

>

<option value="javascript">

javascript

</option>

<option value="python">

python

</option>

<option value="java">

java

</option>

<option value="cpp">

cpp

</option>

</select>

<button

onClick={runCode}

className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all"

>

<FaPlay/>

Run Code

</button>

</div>

<Editor

height="500px"

theme="vs-dark"

language={language}

value={code}

onChange={(value)=>

setCode(value || "")
}

/>

<div className="p-5 border-t border-white/10 bg-slate-950">

<h2 className="text-2xl font-bold text-green-400">

Output

</h2>

<pre className="mt-4 whitespace-pre-wrap text-lg text-slate-300">

{output || "Run your code..."}

</pre>

{

questionIndex ===

questions.length - 1

&&

results.length >=

questions.length

&&

<div className="mt-10 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-3xl p-8">

<h2 className="text-4xl font-black text-green-400">

Final Result

</h2>

<div className="grid md:grid-cols-3 gap-6 mt-6">

<div>

<p className="text-slate-400">

Passed

</p>

<p className="text-5xl font-black">

{passed}

/

7

</p>

</div>

<div>

<p className="text-slate-400">

Failed

</p>

<p className="text-5xl font-black">

{failed}

</p>

</div>

<div>

<p className="text-slate-400">

Success Rate

</p>

<p className="text-5xl font-black">

{

Math.round(

(

passed /

7

)

*100

)

}

%

</p>

</div>

</div>

</div>

}

{

output &&

<div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

<div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5">

<h3 className="text-green-400 font-bold text-xl">

Code Score

</h3>

<p className="text-4xl font-black mt-3">

{score}

</p>

<p className="text-slate-400 mt-2">

AI-based evaluation

</p>

</div>

<div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5">

<h3 className="text-cyan-400 font-bold text-xl">

Flexibility

</h3>

<p className="text-4xl font-black mt-3">

{flexibility}

</p>

<p className="text-slate-400 mt-2">

Reusable structure

</p>

</div>

<div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-5">

<h3 className="text-purple-400 font-bold text-xl">

Performance

</h3>

<p className="text-4xl font-black mt-3">

{performance}

</p>

<p className="text-slate-400 mt-2">

Execution quality

</p>

</div>

</div>

}

</div>

</div>

</div>

</div>
)
}

export default CodingRound