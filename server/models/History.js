const mongoose = require("mongoose")

const historySchema =

new mongoose.Schema(

{

type:String,

result:String,

date:String

},

{

timestamps:true

}

)

module.exports =

mongoose.model(

"History",

historySchema

)