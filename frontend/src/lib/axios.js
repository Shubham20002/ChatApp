import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:"http://localhost:7000/api/",
    withCredentials:true
})

export const signup= async(signupdata)=>{
    const response=await axiosInstance.post("/auth/signup",signupdata);
    return response;
}