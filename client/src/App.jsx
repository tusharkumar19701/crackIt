import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Route, Router, Routes } from 'react-router-dom';
import UserProvider from './context/userContext';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <UserProvider>
      <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" elemnt={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} /> 
          </Routes>

        <Toaster toastOptions={{className:"",style:{fontSize: "13px"}}} />
      </div>
    </UserProvider>
  )
}

export default App;