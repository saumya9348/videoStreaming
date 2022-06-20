const jwt      = require("jsonwebtoken");
const {checkNull} = require("../include/MovieFunctions");

function verifyUserLogedIn(req,res,next){
    let allHeader = req.headers;
    if(checkNull(allHeader.authorization)){
        let token = allHeader.authorization.split(" ")[1];
        if(checkNull(token)){

            jwt.verify(token,"privatekey",(err,data)=>{
                if(data!==undefined && err===null){
                    next();
                }else{
                    res.send({status:200,message:"Your token might be expired or wrong"});
                }
            })

        }else{
            res.json({status:204,message:"Please send like token [space] yourtoken"});
        }
        
    }else{
        res.json(allHeader);
    }
    
}


module.exports = {verifyUserLogedIn}
