require("dotenv").config();
const express = require("express");
const app = express();
const imageRouter = require("./api/image-extract/image.router");
app.use(express.json());
app.use('/api',imageRouter);



app.listen(process.env.APP_PORT,()=>{
    console.log("server is running");
});