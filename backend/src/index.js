import express from 'express'
import dotenv from 'dotenv'
import authRoute from '../src/routes/auth.route.js'
import userRoute from '../src/routes/user.route.js'
import chatRoute from "../src/routes/chat.route.js"
import {connectDb} from './lib/db.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const port=process.env.PORT

const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/chat',chatRoute)



app.listen(port,()=>{
    console.log(`server runing on port number ${port}`)
    connectDb()
})