import React, { useState } from 'react'
import { BsChatLeft } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsHddStack } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { MdLogout } from "react-icons/md";

function Sidebar(props) {
    const [collapse, setCollapse] = useState(false)
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
  return (
    <>
        <div className={`min-h-screen ${collapse ? 'w-[5%]' : 'w-[20%]'} border-r delay-150 duration-300 ease-in-out border-gray-300`}>
            <div className='mt-3 flex items-center justify-between pr-3 pb-2 border-b border-gray-300'>
                {collapse ? <></> : <img src='https://truegradient.ai/static/media/TruegradientLogog.6170e3bde362c4d45aad7462a4fe5ed8.svg' alt='login' className='w-40 h-10 ml-4'/>}
                {collapse ? <BsChevronDoubleRight onClick={() => setCollapse(false)} className='text-blue-600 ml-4 hover:delay-150 duration-300 rounded-md ease-in-out font-bold' size={22}/> : <BsChevronDoubleLeft onClick={() => setCollapse(true)} className='text-blue-600 hover:delay-150 duration-300 rounded-md ease-in-out font-bold' size={24}/>}
            </div>
            <div className='flex-row mt-2 items-center'>
                <Link to={'/'}>
                    <div className={`flex hover:bg-gray-300 ${collapse ? 'justify-center' : ''} ${props.key === 0 ? 'bg-gray-300' : ''} hover:delay-100 duration-300 rounded-md ease-in-out p-2 mx-2 items-center`}>
                        <BsChatLeft className='text-teal-600 font-bold' size={22}/>
                        {collapse ? <></> : <h1 className='font-mono ml-4 text-blue-600 text-xl'>ChatBot</h1>}
                        {/* <h1 className='font-mono ml-4 text-blue-600 text-xl'>ChatBot</h1> */}
                    </div>
                </Link>
                <Link to={'/saved'}>
                    <div className={`flex mt-2 mx-2 p-2 hover:delay-100 duration-300 ${collapse ? 'justify-center' : ''} ${props.key === 1 ? 'bg-gray-300' : ''} rounded-md ease-in-out hover:bg-gray-300 items-center`}>
                        <BsBookmark className='text-teal-600 font-bold' size={22}/>
                        {collapse ? <></> : <h1 className='font-mono ml-4 delay-150 duration-300 ease-in-out text-blue-600 text-xl'>Saved Responses</h1>}
                        {/* <h1 className='font-mono ml-4 text-blue-600 text-xl'>Saved Responses</h1> */}
                    </div>
                </Link>
                <Link to={'/history'}>
                    <div className={`flex mt-2 mx-2 p-2 hover:delay-100 duration-300 ${collapse ? 'justify-center' : ''} rounded-md ease-in-out hover:bg-gray-300 items-center`}>
                        <BsHddStack className='text-teal-600 font-bold' size={22}/>
                        {collapse ? <></> : <h1 className='font-mono ml-4 delay-150 duration-300 ease-in-out text-blue-600 text-xl'>History</h1>}
                        {/* <h1 className='font-mono ml-4 text-blue-600 text-xl'>Saved Responses</h1> */}
                    </div>
                </Link>
                <button
                    onClick={handleLogout}
                    className='w-full'
                >
                    <div className={`flex mt-2 mx-2 p-2 hover:delay-100 duration-300 ${collapse ? 'justify-center' : ''} rounded-md ease-in-out hover:bg-gray-300 items-center`}>
                        <MdLogout className='text-teal-600 font-bold' size={22}/>
                        {collapse ? <></> : <h1 className='font-mono ml-4 delay-150 duration-300 ease-in-out text-blue-600 text-xl'>Logout</h1>}
                    </div>
                </button>
            </div>
        </div>
    </>
  )
}

export default Sidebar