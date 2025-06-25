import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { UserContext } from '../../context/userContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';

const Login = ({setCurrentPage}) => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async(e) => {
      e.preventDefault();

      if(!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }

      if(!password) {
        setError("Please enter the password");
        return;
      }
      setError("");
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,password
      });

      const {token} = response.data;
      if(token) {
        localStorage.setItem("token",token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch(error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center '>
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-sm text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>

      <form action="" onSubmit={handleLogin}>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" placeholder="john@example.com" type="text"  />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} label="Password" placeholder="Min. 8 characters" type="password"  />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button className="w-full mt-6 bg-black text-white text-lg px-7 py-2 rounded-lg cursor-pointer hover:bg-orange-400 transition duration-400 hover:scale-105 hover:text-black" type="submit">Login</button>
        <p className="text-sm text-slate-800 mt-3">Don't have an account?{" "}
        <button className="font-medium text-orange-400 underline cursor-pointer" onClick={() => setCurrentPage("signup")}>Signup</button>
        </p>
      </form>
    </div>
  )
}

export default Login