import mongoose from'mongoose';

export const connectDb=async()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connected to db",process.env.MONGO);
    }).catch((err)=>{
        console.log("error",err)
    })
}