const express = require("express");
const router  = express.Router();
const {verifyUserLogedIn} = require("../midleware/userMiddleware");
const {getAllMovies,getMovieByID,createMovie,updateMovie,deleteMovie,userPlayedMovie,streamVideo,searchMovie,closePlayer,getaAll} = require("../controller/MovieController");


router.get("/" ,verifyUserLogedIn,getAllMovies);
router.get("/all" ,getaAll);


router.get("/:id",verifyUserLogedIn, getMovieByID );
router.get("/search/:name",verifyUserLogedIn,searchMovie);
router.post("/movieplayed/" , verifyUserLogedIn,userPlayedMovie);

router.get("/stream/play/:mov_id",streamVideo)
router.post("/",verifyUserLogedIn,verifyUserLogedIn,createMovie);

router.put("/:id",verifyUserLogedIn,updateMovie);
router.put("/stream/close/:mov_id",verifyUserLogedIn,closePlayer);

router.delete("/:id",verifyUserLogedIn,deleteMovie);


module.exports = router;