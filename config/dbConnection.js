const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://saumyapani:saumya123@saumyacluster.6rcya.mongodb.net/samflixDB?retryWrites=true&w=majority")
.then(()=>{ console.log("Database conected") });

module.exports = mongoose;