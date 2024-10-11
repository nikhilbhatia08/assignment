import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Markdown from 'react-markdown'
import axios from 'axios'

function Saved() {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const handleGet = async() => {
        try {
            const response = await axios.get("http://localhost:5000/chat/saved", {
                headers: {
                    "auth-token": token
                }
            })
            if(response.status === 200) {
                console.log(response.data.bookmarks);
                setData(response.data.bookmarks);
                // console.log(data);
            }
            console.log(response.status);
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
        <div className='flex min-h-screen overflow-scroll bg-gray-100'>
            <Sidebar key={1}/>
            <div className='mt-5 flex-row w-[85vw] items-center justify-center ml-10'>
                <h1 className='font-mono text-blue-600 text-2xl font-bold'>Saved Responses</h1>
                {
                    data.map((node) => {
                        return (
                            <>
                                <div className='mt-3 p-2 border overflow-x-scroll border-gray-300 rounded-md w-[60vw]'>
                                    <h1 className='font-mono text-blue-600 text-xl font-semibold'>Question</h1>
                                    <h1 className='font-mono text-gray-600 text-lg'>{node.question.message}</h1>
                                    <h1 className='font-mono text-blue-600 text-xl font-semibold mt-2'>Answer</h1>
                                    <Markdown>{node.answer.message}</Markdown>
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

export default Saved