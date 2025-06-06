import mongoose from "mongoose";
import bcrypt from bcrypt

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    nativeLnaguage: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User= mongoose.model("USER",userSchema);

// pre hook
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    try{
        const salt= await bcrypt.gensalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next()
    }
    catch(error){
        next(error)
    }
    
})

export default User;