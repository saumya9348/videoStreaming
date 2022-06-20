const mongoose = require("../config/dbConnection");

const users = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    emailID:{
        type:String,
        required:true,
        unique:true,
    },
    subscription:{
        type:Number,
    },
    password:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
    }
},{timestamps:true})

const userModel = mongoose.model("users",users);

module.exports = userModel;
