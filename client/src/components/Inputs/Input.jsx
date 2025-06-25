import React from 'react'
import { useState } from 'react';
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa6";

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword,setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }
   return (
    <div className='mt-2'>
        <label className='text-[13px] text-slate-800' htmlFor="">{label}</label>
        <div className='border border-gray-400 flex items-center pr-2 rounded-lg'>
            <input type={type === "password"? (showPassword? "text": "password"): type} 
            placeholder={placeholder} value={value} onChange={(e)=> onChange(e)} className="w-full px-4 py-2 rounded-lg bg-transparent outline-none" />
            {type === "password"  && (
                <div className="">
                    {showPassword ? (
                        <FaRegEye size={22} className="text-orange-400 cursor-pointer" onClick={()=>togglePassword()} />
                    ): (
                        <FaRegEyeSlash size={22} className="text-slate-400 cursor-pointer" onClick={() => togglePassword()} />
                    )}
                </div>
            )}
        </div>
    </div>
  )
}

export default Input;