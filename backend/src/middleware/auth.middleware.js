import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute=async (req,res,next)=>{
    try{
        console.log("122");
        
    const token= req.cookies.token
    console.log("r",token)
    if(!token){
        return res.status(400).json({message:"Unauthorized - No token provided"})
    }
    const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decoded){
        return res.status(400).json({message:"Unauthorized - Invalid token"})
    }
    const user= await User.findById(decoded.userId)
    if(!user){
        return res.status(400).json({message:"User Not Found"})
    }
      req.user=user;
      next()
    }
    catch(error){
  console.log("error in protect function",error);
  return res.status(400).json({message:"Internal server error"})
    }
}