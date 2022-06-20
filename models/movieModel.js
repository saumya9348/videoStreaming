const mongoose = require("../config/dbConnection");
const movieSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    releaseDate:{
        type:String,
        required:true
    },
    boxCollection:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        minLength:100,
        maxLength:500
    },
    genre:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true,
        unique:true
    },
    imdbRate:{
        type:Number,
        required:true,
        min:1,
        max:10
    },
    filePath:{
        type:String,
        required:true,
        unique:true
    }
},{timestamps:true})

const movieModel = mongoose.model("movies",movieSchema); // (modelname,SchemaName)

module.exports = movieModel;