const express = require("express");
const app     = express();
const cors    = require("cors");
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

const movieRoutes = require("./routes/MoviesRouters");
const userRoutes  = require("./routes/UserRoutes");

app.use("/movies",movieRoutes);
app.use("/users",userRoutes);

app.listen(PORT,()=>{ console.log("app runing on 8000 port") });