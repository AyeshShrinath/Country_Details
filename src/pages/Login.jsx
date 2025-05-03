import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import React from 'react';
import { FaUser, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      const allUsers = JSON.parse(localStorage.getItem('users')) || {};
      const user = allUsers[username];

      if (user && user.password === password) {
        console.log('Login function called'); // Debugging log
        login(username); // Pass the username to the login function
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } else {
      setError('Both fields are required');
    }
  };

  const handleRegister = () => {
    if (username.trim() && password.trim()) {
      const allUsers = JSON.parse(localStorage.getItem('users')) || {};

      if (allUsers[username]) {
        setError('Username already exists');
      } else {
        allUsers[username] = { password, favorites: [] }; // Store password and initialize favorites
        localStorage.setItem('users', JSON.stringify(allUsers));
       
        login(username); // Pass the username to the login function
        navigate('/'); // Redirect to the home page
      }
    } else {
      setError('Both fields are required');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl transform transition-all">
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            {isRegister ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegister ? 'Sign up to access all features' : 'Sign in to your account'}
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="rounded-md -space-y-px">
            <div className="mb-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {isRegister ? (
            <button
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
              onClick={handleRegister}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaUserPlus className="h-5 w-5 text-green-500 group-hover:text-green-400" />
              </span>
              Create Account
            </button>
          ) : (
            <button
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              onClick={handleLogin}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaSignInAlt className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
              </span>
              Sign in
            </button>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium transition-all duration-200"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister
              ? 'Already have an account? Log in'
              : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
