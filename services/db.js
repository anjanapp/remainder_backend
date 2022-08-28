
//import mongoose
const mongoose = require('mongoose')

//connection string  //server and mongodb connection
mongoose.connect('mongodb://localhost:27017/remainderApp',{ 
    useNewUrlParser:true   
      
})

//model(mongodb collection) definition
const User = mongoose.model('User',{      //collection singular name and corresponding collection name plural will be created in db
    acno:Number,
    username:String,
    password:String,
    date:Date,
    ed:String,
    event:[] 
}) 

module.exports={
    User
}