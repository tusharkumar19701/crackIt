import React, { useContext, useState } from 'react';
import {LuLogIn, LuSparkles} from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import heroImage from "../assets/image.png";
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import Modal from '../components/Modal';
import { UserContext } from '../context/userContext';
import { APP_FEATURES } from '../utils/data';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const LandingPage = () => {

    const [currentPage,setCurrentPage] = useState("login");
    const [openAuthModal,setOpenAuthModal] = useState(false);
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const handleButton = () => {
        if(!user) {
            setOpenAuthModal(true);
        } else {
            navigate("/dashboard");
        }
    }

  return (
    <>
        <div className='w-full min-h-full bg-[#f4efff]'>
            <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute"></div>
            <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
                <header className='flex justify-between items-center mb-16'>
                    <div className="text-xl text-black font-bold">
                        CrackIt
                    </div>
                    {user ? <ProfileInfoCard /> : <button onClick={() => setOpenAuthModal(!openAuthModal)} className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full cursor-pointer border border-white transition-all duration-400 hover:scale-105">Login/Signup</button>}
                </header>

                {/* Content  */}
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
                        <div className=" flex items-center justify-left mb-2">
                            <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-[#6994f0] px-3 py-1 rounded-full border border-bg-[#6994f0] ">
                            <LuSparkles /> AI Powered
                            </div>
                        </div>
                        <h1 className="text-5xl text-black font-medium mb-6 leading-tight">Prepare for Interviews with <br /><span className='text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:120%_160%] font-semibold '>AI-Powered</span>{" "} Learning</h1>
                    </div>
                    <div className="w-full md:w-1/2">
                        <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6 ">
                            Get role specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way.
                            From preparation to mastery - your ultimate interview toolkit is here.
                        </p>
                        <button onClick={handleButton} className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer duration-300 ">Get Started</button>
                    </div>
                </div>

            </div>
        </div>
        <div className="w-full min-h-full relative z-10">
            <div>
                <section className='flex items-center max-md:p-10 justify-center -mt-36'>
                    <img src={heroImage} alt="hero image" className='rounded-lg' />
                </section>
            </div>
            <div className="w-full min-h-full bg-[#f4efff] mt-10">
                <div className="container mx-auto px-4 pt-10 pb-20">
                    <section className="mt-5">
                        <h2 className='text-2xl font-medium text-center mb-12'>Features That Make You Shine</h2>
                        <div className="flex flex-col items-center gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                {APP_FEATURES.slice(0,3).map((feature) => (
                                    <div key={feature.id} className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                                        <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Last 2 cards  */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {APP_FEATURES.slice(3).map((feature) => (
                                    <div key={feature.id} className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100">
                                        <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div className="text-sm bg-gray-50 text-center p-5">CrackIt | 2025 |All Rights Reserved.</div>
        </div>
        <Modal 
            isOpen={openAuthModal}
            onClose={() => {
                setOpenAuthModal(false);
                setCurrentPage("login");
            }} 
            hideHeader>
            <div>
                {currentPage === "login" &&<Login setCurrentPage={setCurrentPage} />}
                {currentPage === "signup" &&<Signup setCurrentPage={setCurrentPage} />}
            </div>
        </Modal>
    </>
  )
}

export default LandingPage
