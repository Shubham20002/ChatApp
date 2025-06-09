import express from 'express'
import dotenv from 'dotenv'
import authroute from '../src/routes/auth.route.js'
import {connectDb} from './lib/db.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const port=process.env.PORT

const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/auth',authroute)



app.listen(port,()=>{
    console.log(`server runing on port number ${port}`)
    connectDb()
})