import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/axios';


const SignupPage = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

 const queryClient=useQueryClient();

 const{
    mutate:signupMutation,
    ispending,
    error
 }=useMutation({
    mutationFn:signup,
    onSuccess:()=>queryClient.invalidateQueries({queryKey:["authUser"]})
 })

 const handleSignup=(e)=>{
    e.preventDefault();
    signupMutation(signUpData)
 }

  return (
    <>
    <div className='h-screen flex items-center justify-center' data-theme="sunset">
        <div className='w-full max-w-5xl flex felx-col md:flex-row p-4 md:p-8 items-center justify-center border rounded bg-stone-800 text-white'>
            {/* left side */}
            <div className='w-full md:w-1/2'>
                <img src='/Video.png'></img>
            </div>
            {/* right side */}
            <div  className='w-full md:w-1/2  flex flex-col'>
            <div className='text-5xl font-bold text-center'>
                <h1>Chat App</h1>
            </div>
            <div className='mt-5 text-3xl'>
                <h1>Sign Up</h1>
            </div>
                <form onSubmit={handleSignup} className='space-y-7 mt-6 w-95'>
                    <div className='flex flex-col space-y-1.5 ' >
                        <label htmlFor="">FullName</label>
                        <input type="text"   onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })} className='border-b-2 border-gray-400 focus:outline-none focus:border-blue-500' />
                    </div>
                    <div  className='flex flex-col space-y-1.5'>
                    <label htmlFor="">Email</label>
                    <input type="text"   onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} className='border-b-2 border-gray-400 focus:outline-none focus:border-blue-500'/>
                    </div>
                    <div  className='flex flex-col space-y-1.5'>
                    <label htmlFor="">Password</label>
                    <input type="text"   onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} className='border-b-2 border-gray-400 focus:outline-none focus:border-blue-500'/>
                    </div>
                    <div className='flex justify-center  mt-10 '>
                    <button className='border-4 px-7 rounded-2xl py-2 hover:bg-amber-700'>SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    </>
  );
};

export default SignupPage;
