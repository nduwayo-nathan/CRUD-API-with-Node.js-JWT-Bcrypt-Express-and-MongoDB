import mongoose from "mongoose"

const connection = mongoose.connect("mongodb://127.0.1:27017/first-crude")
.then(()=>{
    console.log("connected to db sucessfully");
})
.catch((error)=>{
    console.log("There is an error when connecting to db ",error);
})

export default  connection;