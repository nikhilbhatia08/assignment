import React, { useState, useRef, useEffect } from 'react'
import Sidebar from './Sidebar'
import { BsCursorFill } from "react-icons/bs";
import axios from 'axios'
import Markdown from 'react-markdown'
import { BsBoxArrowInDown } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils';

function Home() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [data, setData] = useState([])
    const messagesEndRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [previousQuestion, setPreviousQuestion] = useState('');
    const [savedidx, setSavedIdx] = useState(-1);

    const handlePost = async() => {
        setData(data => [...data, {
            type: 1,
            message: question
        }]);
        setLoading(true);
        setPreviousQuestion(question);
        setQuestion('');
        try{
            const response = await axios.post(`${BASE_URL}/groq/question`, {
                question: question
            }, {
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json"
                }
            })
            setLoading(false);
            setData(data => [...data, {
                type: 2,
                message: response.data.message
            }]);
        }
        catch(err) {
            console.log(err);
        }
    }

    const handleSave = async(idx) => {
        try{
            const response = await axios.post(`${BASE_URL}/chat/save`, {
                
                question: data[idx - 1],
                answer: data[idx]
            }, {
                headers: {
                    "auth-token": token,
                    "Content-Type": "application/json"
                }
            })

            if(response.status === 200) {
                console.log('Saved');
                setSavedIdx(idx);
                alert('Saved');
            }
        }
        catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        if(!token) {
            navigate('/login');
        }
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [data]);
  return (
    <>
        <div className='flex min-h-screen bg-gray-100'>
            <Sidebar 
                key={0}
            />
            <div className='mt-5 flex-row w-[85vw] items-center justify-center ml-10'>
                <h1 className='font-mono text-blue-600 text-2xl font-bold'>ChatBot</h1>
                <div className='flex-row w-[100%] h-[95vh] pr-10 justify-center items-center'>
                    <div ref={messagesEndRef} className='mt-3 overflow-scroll border border-blue-600 bg-white rounded-md h-[85%]'>
                        {
                            data.map((node, idx) => {
                                return (
                                    <div className={`flex ${node.type === 1 ? 'justify-start' : 'justify-end'} p-2`}>
                                        <div className={`p-2 max-w-[50%] overflow-x-scroll ${node.type === 1 ? 'bg-blue-600 text-white rounded-md' : 'bg-gray-300 text-black rounded-md'}`}>
                                            {
                                                node.type === 2 ? <button onClick={() => {alert('saved');handleSave(idx)}} className='bg-blue-600 mb-2 flex items-center p-2 ml-2 mt-2 rounded-md'> <BsBoxArrowInDown className='text-white' size={20}/> <h1 className='text-white text-xl font-mono'>save</h1>  </button> : <></>
                                            }
                                            {
                                                savedidx === idx ? <h1 className='text-blue-600 font-mono text-xl'>Saved</h1> : <></>
                                            }
                                            <Markdown>
                                            {node.message}
                                            </Markdown>
                                        </div>
                                    </div>
                                )
                            })
                            
                        }
                        {loading ? <div className='flex justify-center items-center'><h1 className='font-mono text-blue-600'>Loading...</h1></div> : <></>}
                        <div ref={messagesEndRef}></div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <input type='email' onChange={(e) => setQuestion(e.target.value)} value={question} className='font-mono border font-light bg-white p-2 w-full mt-2 resize-none border-blue-600 rounded-md focus:outline-none' placeholder='Ask Me Anything...'/>
                        <button onClick={handlePost} className='bg-blue-600 p-2 ml-2 mt-2 rounded-md'>
                            <BsCursorFill className='text-white' size={26}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home