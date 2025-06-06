import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const port=process.env.PORT

const app=express();

app.get("/",(req,res)=>{
    res.send("hello shubham")
})

app.listen(port,()=>{
    console.log("server runing on port number 6001")
})