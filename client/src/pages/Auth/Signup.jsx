import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/userContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';
import uploadImage from '../../utils/uploadImage';

const Signup = ({setCurrentPage}) => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);
  const [fullName,setFullName] = useState("");
  const [profilePic,setProfilePic] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if(!fullName) {
      setError("Please enter ful name");
      return;
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid email addresss");
      return;
    }

    if(!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name:fullName,
        email,
        password,
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
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-sm text-slate-700 mt-[5px] mb-6">Join us today by entering your details below.</p>

      <form action="" onSubmit={handleSignup}>
        <div className="">
          <Input 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="John"
          type="text" />

          <Input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="email" />

          <Input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min. 8 characters"
          type="password" />
          
        </div>

        {error && <p>{error}</p>}
        <button className="w-full mt-6 bg-black text-white text-lg px-7 py-2 rounded-lg cursor-pointer hover:bg-orange-400 transition duration-400 hover:scale-105 hover:text-black" type="submit">Signup</button>
        <p className="text-sm text-slate-800 mt-3">Already have an account?{" "}
        <button className="font-medium text-orange-400 underline cursor-pointer" onClick={()=>setCurrentPage("login")}>Login</button>
        </p>
      </form>
    </div>
  )
}

export default Signup