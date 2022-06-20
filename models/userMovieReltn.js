const mongoose = require("mongoose");

const userMovRel = mongoose.Schema({
    userID:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    movieID:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies",
    },
    watchTime:{
        type:Number,
        default:0
    }
},{timestamps:true})

const userMovModule = mongoose.model("usermovierel",userMovRel);

module.exports = userMovModule;