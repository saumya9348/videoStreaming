const movieModel = require("../models/movieModel");
const userMovModule = require("../models/userMovieReltn");
// include functions for movie
const {checkNull} = require("../include/MovieFunctions");

const fs = require("fs");

function getAllMovies(req,res){
    try{
        movieModel.find()
        .then((allMovies)=>{
            res.send(allMovies);
        })
    }catch(err){
        res.send({message:"failed"}).status(404);
    }
}
function getaAll(req,res){
    try{
        movieModel.find()
        .then((allMovies)=>{
            res.send(allMovies);
        })
    }catch(err){
        res.send({message:"failed"}).status(404);
    }
}
async function searchMovie(req,res){
    let searchItem = req.params.name;
    let promRes = await movieModel.find({"name":{$regex : searchItem + '.*',$options: 'i'}})
    // let searchedMovie = await promRes.json();

    res.send({status:200,results:promRes});
}

async function getMovieByID (req,res){
    try{
        // res.send(await movieModel.findById(req.params.id)); or
        let singleMovie = await movieModel.findOne({_id:req.params.id})
        res.send({status:200,results:singleMovie});
    }catch(err){
        res.send({message:"failed"}).status(404);
    }
}


createMovie = async (req,res)=>{
    try{
        let createMov =  await movieModel.create(req.body)
        res.send("created");
    }catch(err){
        res.send()
    }
}


async function updateMovie(req,res){
    let movieID = req.params.id;
    try {
        if(checkNull(movieID)){
            let reqData = await movieModel.findById(movieID);
            if (checkNull(reqData)){
                let x = await movieModel.findByIdAndUpdate(reqData,{name:"Kuch bhi"})
                res.send({status:200,message:`Data sucess full updated on this _id ${movieID} `});
            }else{
                res.send({status:404,message:"Their is no data on this ID"});
            }
        }else{
            res.send({status:404,message:"Please send id"});
        }
    } catch (error) {
            res.send({status:404,message:"Unkown Error Ocured"});
    }
}

async function deleteMovie(req,res){
    let movieID = req.params.id;
    try {
        if(checkNull(movieID)){
           let deleteMovie = movieModel.findByIdAndDelete(movieID);
           if(checkNull(deleteMovie)){
                res.send({status:200,message:`Movie delete sucessfully on this _id ${movieID} `});
           }
        }
    }catch(err){
        res.send({status:404,message:"Their is no data on this ID"});
    }

}

async function userPlayedMovie(req,res){
    let bodydata = req.body;
    let userID   = bodydata.userID;
    let movieID  = bodydata.movieID;
    if(checkNull(movieID) && checkNull(userID)){
        try {
            let checMovieExist = await userMovModule.findOne({userID:userID,movieID:movieID});
            if( !checkNull(checMovieExist) ){
                userMovModule.create(bodydata)
                .then((msg)=>{
                    res.send({status:200,message:"Sucessfully created",movieid:msg._id});
                })
                .catch((err)=>{
                    res.send({status:204,message:"Some issue with provided data"});
                })
            }else{
                res.send({status:200,message:"User Movie Relation already exist",movieid:checMovieExist._id});
            }
        } catch (error) {
            res.send({status:200,message:"Either userid or movieid having some issue"});
        }
    }else{
        res.send({status:404,message:"userid and movieid cann't be zero"});
    }
}

 async function streamVideo(req,res){
    let movieID = req.params.mov_id;
    if(checkNull(movieID)){
        let moviePath = await movieModel.findById(movieID);
        movieModel.findOne({"filePath":moviePath.filePath})
        .then(msg=>{

            if(checkNull(msg)){

                // start
                const vdoPath = `./${moviePath.filePath}`;
                const range = req.headers.range;
                const videoSize = fs.statSync(vdoPath).size;

                const chunkSize = 10**6;
                const start = Number(range.replace(/\D/g,""));
                const end   =Math.min(start + chunkSize,videoSize-1);
                const vdoSend = end - start;

                res.writeHead(206,{
                    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
                    "Accept-Ranges":"bytes",
                    "Content-Length":vdoSend,
                    "Content-Type":"video/mp4"
                })

                const stream = fs.createReadStream(vdoPath,{start,end});

                stream.pipe(res);
                // end
            }else{
                res.send({status:404,message:"movie not found"});
            }
        })
        .catch(err=>{
            res.send({status:404,message:"Some Internal Error"});
        })
    }else{
        res.send({status:404,message:"Please send video id"});
    }
}

async function closePlayer(req,res){
    let movieID = req.params.mov_id;
    let watchTime = req.body.watched; 
    console.log(watchTime);
    // console.log(movieID );
    if(checkNull(movieID)){
        console.log(movieID)
        try {
            console.log(await userMovModule.findById(movieID));
            let updateStatus = await userMovModule.findByIdAndUpdate(movieID,{watchTime:watchTime});
            console.log(updateStatus);
            res.send({status:200})
        } catch (error) {
            res.send({status:404})
            console.log(error);
        }
    }else{
        res.send({status:404,message:"Please send video id"});
    }
}

module.exports = {getAllMovies,getMovieByID,createMovie,updateMovie,deleteMovie,userPlayedMovie,streamVideo,searchMovie,closePlayer,getaAll};