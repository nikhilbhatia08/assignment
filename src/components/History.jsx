import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Markdown from 'react-markdown'
import axios from 'axios'
import { BASE_URL } from '../utils';

function History() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const handleGet = async() => {
        try {
            const response = await axios.get(`${BASE_URL}/chat/history`, {
                headers: {
                    "auth-token": token
                }
            })

            if(response.status === 200) {
                setData(response.data.history);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleGet();
    }, []);
  return (
    <>
        <div className='flex min-h-screen bg-gray-100'>
            <Sidebar key={0}/>
            <div className='mt-5 flex-row w-[85vw] items-center justify-center ml-10'>
                <h1 className='font-mono text-blue-600 text-2xl font-bold'>History</h1>
                {
                    data.map((node) => {
                        return (
                            <>
                                <div className='mt-3 p-2 border overflow-x-scroll border-gray-300 rounded-md w-[60vw]'>
                                    <h1 className='font-mono text-blue-600 text-xl font-semibold'>Question</h1>
                                    <h1 className='font-mono text-gray-600 text-lg'>{node.question}</h1>
                                    <h1 className='font-mono text-blue-600 text-xl font-semibold mt-2'>Answer</h1>
                                    <Markdown>{node.answer}</Markdown>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    </>
  )
}

export default History