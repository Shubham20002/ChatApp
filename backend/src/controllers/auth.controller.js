import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/stream.js";
export async function signup(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All three fields are required" });
    }
    if (password.lenght < 6) {
      return res.status(400).json({ message: "password must be 6 char" });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "email format must be correct" });
    }
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({ message: "email already exits" });
    }

    const idx = Math.floor(Math.random() * 100 + 1);
    const randomavatar = `https://avatar.iran.liara.run/public/${idx}`;

    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomavatar,
    });

    try{
      await upsertStreamUser({
        id:newUser._id,
        name:newUser.fullName,
        image :newUser.profilePic,
      })
      
    }
    catch(error){
   console.log("error while user adding in stream")
    }
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent xss attacks
      sameSite: "strict", //prevent CSRF attacks
      secure: (process.env.NODE_ENV = "production"),
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in Signup controller");
    res.status(400).json({ message: "error in signup controller" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "both email and password are requird" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch) {
      return res.status(400).json({ message: "invalid 01" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prevent xss attacks
      sameSite: "strict", //prevent CSRF attacks
      secure: (process.env.NODE_ENV = "production"),
    });

    res.status(201).json({ success: true, user: user });
  } catch (error) {
    console.log("error in login controller");
    res.status(400).json({ message: "error in login controller" });
  }
}

export function logout(req, res) {
  res.clearCookie("token");
  res.status(200).json({message:"user logout successfully"})
}


export async function onboard(req,res){
  try {
    console.log("aaaaaaaa",req.body);
    
    const userId= req.user._id;
    const {fullName,bio,nativeLanguage ,learningLanguage,location}=req.body;

    if(!fullName || !bio || !nativeLanguage  || !learningLanguage || !location){
      res.status(400).json({message:"All fields are required"});
    }
    const updatedUser= await User.findByIdAndUpdate(userId,{
      ...req.body,
      isOnboarded:true
    },{new:true})
    try{
      await upsertStreamUser({
        id:updatedUser._id.toString(),
        fullName: updatedUser.fullName,
        image:updatedUser.profilePic || ""
       })
    }
    catch(error){
     console.log("stream user update error",error)
    }
     
    res.status(200).json({message:"User Onboarded successfully",user:updatedUser})
  } catch (error) {
    console.log("error during user onboarding",error)
    res.status(400).json({message:"Error during user onboarding"})
  }

}