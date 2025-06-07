import User from "../models/User.js";
import jwt from "jsonwebtoken";
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
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token,{
      maxAge: 7 * 24 *60 *60 * 1000,
      httpOnly: true, //prevent xss attacks
      sameSite:"strict", //prevent CSRF attacks
      secure:process.env.NODE_ENV= "production"
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in Signup controller");
    res.status(400).json({message:"error in signup controller"})
  }
}

export function login(req, res) {
  res.send("login controller");
}

export function logout(req, res) {
  res.send("logout controller");
}
