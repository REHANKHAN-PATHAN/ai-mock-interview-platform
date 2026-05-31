const mongoose = require("mongoose")

const historySchema =
new mongoose.Schema({

userId:String,

type:String,

result:String,

date:String

},{
timestamps:true
})

module.exports =
mongoose.model(
"History",
historySchema
)