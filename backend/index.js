import express from 'express'

const app=express();

app.get("/",(req,res)=>{
    res.send("hello shubham")
})

app.listen(6001,()=>{
    console.log("server runing on port number 6001")
})