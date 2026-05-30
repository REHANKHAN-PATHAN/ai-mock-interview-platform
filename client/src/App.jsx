import {

BrowserRouter,

Routes,

Route

}

from "react-router-dom"

import Login from "./pages/Login"

import Register from "./pages/Register"

import Dashboard from "./pages/Dashboard"

import Interview from "./pages/Interview"

import History from "./pages/History"

import ResumeAnalyzer from "./pages/ResumeAnalyzer"

import CodingRound from "./pages/CodingRound"

import VoiceInterview from "./pages/VoiceInterview"

import Profile from "./pages/Profile"

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/"
        element={<Login/>}/>

        <Route path="/register"
        element={<Register/>}/>

        <Route path="/dashboard"
        element={<Dashboard/>}/>

        <Route path="/interview"
        element={<Interview/>}/>

        <Route path="/history"
        element={<History/>}/>

        <Route path="/resume"
        element={<ResumeAnalyzer/>}/>

        <Route path="/coding"
        element={<CodingRound/>}/>

        <Route path="/voice-interview"
        element={<VoiceInterview/>}/>

        <Route path="/profile"
        element={<Profile/>}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App