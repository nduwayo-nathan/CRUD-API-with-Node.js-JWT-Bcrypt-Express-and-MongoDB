import http from "http"
import express from "express"
import dotenv from "dotenv"
import connect from "./connection.js";
import  userRoute  from "./route/useRoute.js";
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config();
const app=express();
app.use(express.json(),express.urlencoded({extended:true}),bodyParser.json(),cors());


const port= process.env.PORT || 3000
app.get("/",(req,res)=>{
    res.send("this is nat");

})


app.use("/user",userRoute);


app.listen(port,()=>{
    console.log("The server is running on",port)
})