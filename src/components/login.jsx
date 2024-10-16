import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils';

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      if (!username || !password) {
        setError('Please fill all the fields');
        return;
      }

      setLoading(true);

      const response = await axios.post(`${BASE_URL}/user/login`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        setLoading(false);
        navigate('/');
      } else if (response.status === 400) {
        setLoading(false);
        setError('Invalid Credentials');
      }
      setLoading(false);
    } catch (err) {
      setError('Invalid username or password');
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex h-screen items-center bg-gray-100 justify-center content-center">
        <div className="flex w-[80vw] items-center">
          <div className="w-1/2 p-10 h-[60vh] rounded-md content-center flex-row bg-blue-600">
            <div className="mt-10">
              <h1 className="font-mono font-light text-3xl text-white">_ChatBot</h1>
              <h1 className="text-5xl text-white mt-4">TrueGradient</h1>
              <h1 className="mt-4 text-lg font-light text-gray-100">
                You will get perfect results with accuracy from TrueGradient's chatbot. Ask anything and get results in
                a faster and accurate way. This is the perfect way to ask questions.
              </h1>
            </div>
          </div>
          <div className="w-[44%]">
            <div className="flex">
              <img
                src="https://truegradient.ai/static/media/TruegradientLogog.6170e3bde362c4d45aad7462a4fe5ed8.svg"
                alt="login"
                className="w-40 h-10 mx-auto"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-center content-center">
                <h1 className="text-3xl font-mono text-blue-600">Login</h1>
              </div>
              <div className="mt-4">
                <h1 className="font-semibold font-mono">Username</h1>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="font-mono border font-light bg-gray-50 p-2 w-full mt-2 resize-none border-gray-300 rounded-md focus:outline-none"
                  placeholder="Enter Your Email or username"
                />
                <h1 className="font-semibold font-mono">password</h1>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-mono border font-light bg-gray-50 p-2 w-full mt-2 resize-none border-gray-300 rounded-md focus:outline-none"
                  placeholder="Enter Your password"
                />
                {error ? <h1 className="text-red-600 mt-2 font-mono">{error}</h1> : <></>}

                {loading ? <h1 className="text-blue-600 mt-2 font-mono">Loading...</h1> : <></>}
                <button
                  onClick={handleSubmit}
                  className="w-full p-2 bg-blue-600 hover:bg-blue-700 font-mono mt-4 text-white rounded-md justify-center flex items-center"
                >
                  Login
                </button>
              </div>
              <div>
                <h1 className="mt-4 font-mono text-gray-400">
                  Don't have an account?
                  <Link to={'/signup'}>
                    <span className="text-blue-600">Sign Up</span>
                  </Link>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
