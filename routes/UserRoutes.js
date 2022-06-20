const express = require("express");
const routes = express.Router();

const {getAllUsers,createUser,getSingleUser,updateUser,deleteUser,logIN} = require("../controller/UserController");
const {verifyUserLogedIn} = require("../midleware/userMiddleware");


routes.get("/",getAllUsers);

routes.post("/login",logIN);

routes.get("/:id",getSingleUser);

routes.post("/",createUser);

routes.put("/:id",updateUser);

routes.delete("/:id",deleteUser)



module.exports = routes;