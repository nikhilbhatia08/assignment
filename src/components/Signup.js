import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils';

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async() => {
        try{
            if(password !== reEnterPassword) {
                setError('Passwords do not match');
                return;
            }
            if(!name || !email || !password) {
                setError('Please fill all the fields');
                return;
            }

            const response = await axios.post(`${BASE_URL}/user/signup`, {
                name: name,
                email: email,
                password: password
            });
            if(response.status === 200) {
                setError('');
                navigate('/login');
            }
        } 
        catch(err) {
            console.log(err);
        }
    }

  return (
        <>
            <div className='flex h-screen items-center bg-gray-100 justify-center content-center'>
                <div className='flex w-[80vw] items-center'>
                    <div className='w-1/2 p-10 h-[60vh] rounded-md content-center flex-row bg-blue-600'>
                        <div className='mt-10'>
                        <h1 className='font-mono font-light text-3xl text-white'>_ChatBot</h1>
                            <h1 className='text-5xl text-white mt-4'>TrueGradient</h1>
                            <h1 className='mt-4 text-lg font-light text-gray-100'>You will get perfect results with accuracy from TrueGradient's chatbot. Ask anything and get results in a faster and accurate way. This is the perfect way to ask questions.</h1>
                        </div>
                    </div>
                    <div className='w-[44%]'>
                        <div className='flex'>
                            <img src='https://truegradient.ai/static/media/TruegradientLogog.6170e3bde362c4d45aad7462a4fe5ed8.svg' alt='login' className='w-40 h-10 mx-auto'/>
                        </div>
                        <div className='p-4'>
                            <div className='flex justify-center content-center'>
                                <h1 className='text-3xl font-mono text-blue-600'>Signup</h1>
                            </div>
                            <div className='mt-4'>
                                <h1 className='font-semibold font-mono'>Username</h1>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='font-mono border font-light bg-gray-50 p-2 w-full mt-2 resize-none border-gray-300 rounded-md focus:outline-none' placeholder='Enter Your Email or username'/>
                                <h1 className='font-semibold font-mono'>Name</h1>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='font-mono border font-light bg-gray-50 p-2 w-full mt-2 resize-none border-gray-300 rounded-md focus:outline-none' placeholder='Enter Your name'/>
                                <h1 className='font-semibold font-mono'>Password</h1>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='font-mono border font-light bg-gray-50 p-2 w-full mt-2 resize-none border-gray-300 rounded-md focus:outline-none' placeholder='Enter Your password'/>
                                <h1 className='font-semibold font-mono'>Re-enter password</h1>
                                <input type='password' value={reEnterPassword} onChange={(e) => setReEnterPassword(e.target.value)} className='font-mono border font-light bg-gray-50 p-2 w-full mt-2 resize-none border-gray-300 rounded-md focus:outline-none' placeholder='Re-enter your password'/>
                                {
                                    error ? <h1 className='text-red-600 font-mono mt-2'>{error}</h1> : <></>
                                }
                                <button onClick={handleSubmit} className='w-full p-2 bg-blue-600 hover:bg-blue-700 font-mono mt-4 text-white rounded-md justify-center flex items-center'>Signup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Signup