const mongoose = require("mongoose")

function mongooseConnection(){
    mongoose.connect("mongodb://0.0.0.0:27017/myBlog" , { 
    })
    .then(()=>{
        console.log("DB connected")
    })
    .catch((err)=>{
        console.log("Error Connecting",err)
    })
}

module.exports = mongooseConnection;


