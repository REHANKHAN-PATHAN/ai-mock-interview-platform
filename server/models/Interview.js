const mongoose = require("mongoose")

const interviewSchema =
new mongoose.Schema({

question:{
type:String
},

answer:{
type:String
},

feedback:{
type:String
},

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model(

"Interview",

interviewSchema

)