import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { FaUser } from "react-icons/fa";

const ProfileInfoCard = () => {
    const {user,clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    }
  return user && (
    <div className='flex items-center '>
        <FaUser className='w-11 h-11 bg-amber-500 text-white rounded-full p-2 mr-3 cursor-pointer' />
        <div className='flex flex-col items-center justify-center'>
            <div className="text-[15px] text-black font-bold leading-3">
                {user?.name}
            </div>
            <button className='text-amber-600 text-sm font-semibold cursor-pointer hover:underline' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default ProfileInfoCard;