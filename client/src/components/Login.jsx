import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app } from '../Api/firebase'; // Import Firebase
import img2 from '../assets/water.jpg';
import img3 from '../assets/icon.jpg';
import axiosInstance from '../Api/AxiosConfig';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"; // Import necessary Firebase authentication functions
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; // Import the Google icon from FontAwesome

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        studentname: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/v1/socialmedia/login', formData);
            console.log('Login response:', response);
            console.log('Response data:', response.data);
            // Add the user ID to local storage upon successful login
            localStorage.setItem('userId', response.data);
            navigate(`/profile/${response.data}`);
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Failed to login');
        }
    };
    
    const firebaseGoogleLogin = async () => {
        try {
            const auth = getAuth(app); // Initialize Firebase authentication
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider); // Use auth and signInWithRedirect
            // The redirect will handle the authentication process and redirect back to your app
        } catch (error) {
            console.error('Error logging in with Firebase Google:', error);
            setError('Failed to login with Google');
        }
    };

    return (
        <div className='bg-white menu-background'>
            <div className='section-container'>
                <div className='grid grid-cols-2 divide-x'>
                    <div>
                        <img className='h-[720px] object-cover' src={img2} alt="Contact Us" />
                    </div>
                    <div className='flex items-center justify-center flex-col-reverse mb-6'>
                        <div className='shadow-2xl bg-slate-200 p-40 rounded-2xl h-[720px] flex flex-col items-center justify-center mb-6'>
                            <img className='h-[70px] flex items-center mb-6' src={img3} alt="Contact Us" />
                            <h2 className='text-4xl text-center font-semibold text-slate-700 mb-6'>Hi There!</h2>
                            <p className='text-gray-800 mb-6'>Welcome to Our Contacts portal</p>
                            <form onSubmit={handleSubmit} className='space-y-4'>
                                <div className='space-y-2 mb-6'>
                                    <input
                                        type='text'
                                        name='studentname'
                                        value={formData.studentname}
                                        onChange={handleChange}
                                        placeholder='Name'
                                        className='w-full px-4 py-2 border shadow-xl bg-simpleLightYellow text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    />
                                </div>
                                <div className='space-y-2 mb-6'>
                                    <input
                                        type='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='Password'
                                        className='w-full px-4 py-2 border shadow-xl bg-simpleLightYellow rounded-md text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400'
                                        required
                                    />
                                </div>
                                <div className='text-center space-y-4'>
                                    <div>
                                        <button
                                            type='submit'
                                            className='shadow-xl bg-blue-300 text-base rounded-xl text-slate-700 px-8 py-3 hover:bg-yellow-400 transition duration-300'
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => window.location.href = '/reg'}
                                            type='button'
                                            className='text-base rounded-xl text-blue-700 px-8 py-3 transition duration-300'
                                        >
                                            Click here to Register
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={firebaseGoogleLogin}
                                            type='button'
                                            className='shadow-xl bg-blue-300 text-base rounded-xl text-slate-700 px-8 py-3 hover:bg-yellow-400 transition duration-300 flex items-center'
                                        >
                                            <FontAwesomeIcon icon={faGoogle} className='mr-2' />
                                            Login with Google
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
