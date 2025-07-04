import React from 'react'
import { Routes, Route } from "react-router"
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import OnboardingPage from './pages/OnboardingPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios'

function App() {
  const {data,isLoading,error}=useQuery({
    queryKey:['todos'],
    queryFn: async()=>{
      const res=await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false
    })

    console.log("data")
  return (
   <>
 {/* <button onClick={() => toast('Here is your toast.')}>Make me a toast</button> */}

<Routes>
 <Route path='/' element={<HomePage/>} />
 <Route path="/login" element={<LogInPage/>} />
 <Route path="/signup" element={<SignUpPage/>} />
 <Route path="/onboarding" element={<OnboardingPage/>}/>
 <Route path="/notification" element={<NotificationPage/>} />
 <Route path="/call" element={<CallPage/>} />
 <Route path="/chat" element={<ChatPage/>}/>
</Routes>
<Toaster />
   </>
  )
}

export default App