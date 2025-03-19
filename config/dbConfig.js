const mongoose = require("mongoose")

function mongooseConnection(){
    mongoose.connect("mongodb://127.0.0.1:27017/myBlog" , { 
    })
    .then(()=>{
        console.log("DB connected")
    })
    .catch((err)=>{
        console.log("Error Connecting",err)
    })
}

module.exports = mongooseConnection;


