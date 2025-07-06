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
import { Navigate } from 'react-router'

function App() {
  const {data:authData,isLoading,error}=useQuery({
    queryKey:['authUser'],
    queryFn: async()=>{
      const res=await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false
    })

   const authUser= authData?.user;
  return (
   <>
 {/* <button onClick={() => toast('Here is your toast.')}>Make me a toast</button> */}

<Routes>
 <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
 <Route path="/login" element={!authUser ?<LogInPage/> : <Navigate to="/"/>} />
 <Route path="/signup" element={!authUser ? <SignUpPage/>: <Navigate to="/"/>} />
 <Route path="/onboarding" element={authUser ?<OnboardingPage/> : <Navigate to="/login"/>}/>
 <Route path="/notification" element={authUser ?<NotificationPage/>: <Navigate to="/login"/>} />
 <Route path="/call" element={authUser ?<CallPage/> : <Navigate to="/login"/>} />
 <Route path="/chat" element={authUser ?<ChatPage/> : <Navigate to="/login"/>}/>
</Routes>
<Toaster />
   </>
  )
}

export default App