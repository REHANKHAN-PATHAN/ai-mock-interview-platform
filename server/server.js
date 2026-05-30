const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const aiRoutes = require("./routes/aiRoutes")
const resumeRoutes = require("./routes/resumeRoutes")
const codeRoutes = require("./routes/codeRoutes")
const voiceRoutes = require("./routes/voiceRoutes")
const historyRoutes = require("./routes/historyRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/ai",aiRoutes)
app.use("/api/resume",resumeRoutes)
app.use("/api/code",codeRoutes)
app.use("/api/voice",voiceRoutes)
app.use("/api/history",historyRoutes)
app.use("/api/analytics",analyticsRoutes)
mongoose.connect(process.env.MONGO_URI)

.then(()=> console.log("MongoDB Connected"))

.catch((err)=> console.log(err))

app.get("/",(req,res)=>{

    res.send("Backend Running")

})

const authRoutes = require("./routes/authRoutes")

app.use("/api/auth",authRoutes)

app.listen(5000,()=>{

    console.log("Server Running")

})