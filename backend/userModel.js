const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    url:{
        type:String,
        required:true
    },  
    about:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    }
})


const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;