const userModel = require("../models/usersModel");
const {checkNull} = require("../include/MovieFunctions");
const bcryptjs = require("bcryptjs");
const jwt      = require("jsonwebtoken");


async function getAllUsers(req,res){
    try{
        let allUsers = await userModel.find();
        res.send(allUsers);
    }catch(err){
        res.send("Failed to get the users")
    }
}



async function getSingleUser(req,res){

    let userID = req.params.id;
    if(checkNull(userID)){
        try {
            let reqSingleUser = await userModel.findById(userID);
            if(checkNull(reqSingleUser)){
                res.send(reqSingleUser);
            }else{
                res.send({status:404,message:"Thier is no data on this userid"});
            }
        } catch (error) {
            res.send({status:404,message:"Thier is no data on this userid"});
        }
    }else{
        res.send({status:404,message:"Send userID please"});
    }

}


async function logIN(req,res){
    let userMail = req.body.emailID;
    let userPW = req.body.password;

    if(checkNull(userMail)){
        try {
            let reqSingleUser = await userModel.findOne({emailID:userMail});
            if(checkNull(reqSingleUser)){
                let userIdPwStat = await userModel.findOne({emailID:{"$in":userMail},password:{"$in":userPW}});
                bcryptjs.compare(userPW,reqSingleUser.password,(err,suc)=>{
                        if(suc){

                            jwt.sign({emailID:reqSingleUser.emailID},"privatekey",(signerr,token)=>{

                                res.send({status:200,token:token,userid:reqSingleUser._id});

                            })

                        }else{
                            res.send({status:404,message:"There is no Users On this Id and Password"})
                        }
                })
                // if(checkNull(userIdPwStat)){
                //     jwt.sign({useraName:userMail},"SuperSecret",())
                //     res.send(userIdPwStat);
                // }else{
                //     res.send({status:404,message:"There is no Users On this Id and Password"})
                // }
            }else{
                res.send({status:404,message:"There is no Users On this name"})
            }
        }catch(err){
            res.send({status:404,message:"Error occured"})
        }
    }else{
        res.send({status:404,message:"Please send body data"})
    }
}

async function createUser(req,res){
    let userDta = req.body;
    if(checkNull(userDta)){
        
        /**
         * for syncronous it can wait not for async
         * 
         * 
         * var salt = bcryptjs.genSaltSync(10);
        var hash = bcryptjs.hashSync("B4c0/\/", salt);
        userDta.password = hash;

        let x = await userModel.create(userDta);
        if(checkNull(x)){
            res.send(x);
        }
         */
        
        try{

            bcryptjs.genSalt(10,(err,salt)=>{ //async task
                if(!checkNull(err)){
                    bcryptjs.hash(userDta.password,salt, (err,encrypt)=>{

                        if(!checkNull(err)){

                            userDta.password = encrypt;
                            userModel.create(userDta)
                            .then((doc)=>{
                                console.log(doc);
                                if(checkNull(doc)){
                                    res.send({status:200,message:"User created sucessfull"});
                                }else{
                                    res.send("User id or email already exist");

                                }
                            })
                            .catch((err)=>{
                                res.send({status:404,message:"User id or email already exist"});
                            })
                        }else{
                            res.send({status:404,message:"error while hash"})
                        }
                    })
                }else{
                    res.send({status:404,message:"error while gen salt"})
                }
            })
                
        }catch(error){
            console.log(error);
            res.send({status:200,message:error});
        }
    }
}

async function updateUser(req,res){
    let userID = req.params.id;
    if(checkNull(userID)){
        let userUpdateData = req.body;
        if(checkNull(userUpdateData)){
            try{
                let status = await userModel.findByIdAndUpdate(userID,userUpdateData);
                if(checkNull(status)){
                    res.send({status:200,message:"Sucessfull Updated"});
                }else{
                    res.send({status:404,message:"Somthing error"});
                }
            }catch(error){
                console.log(error);
                res.send(error);
            }
        }
    }else{
        res.send({status:404,message:"Send userID please"});
    }
}


async function deleteUser(req,res){
    let userID = req.params.id;
    try {
        if(checkNull(userID)){
           let deleteUser = await userModel.findByIdAndDelete(userID);
           console.log(deleteUser);
           if(checkNull(deleteUser)){
                res.send({status:200,message:`User delete sucessfully on this _id ${userID} `});
           }else{
                res.send("User id doesnot exist");
           }
        }
    }catch(err){
        res.send({status:404,message:"Their is no data on this ID"});
    }

}




module.exports = {getAllUsers,createUser,getSingleUser,updateUser,deleteUser,logIN};