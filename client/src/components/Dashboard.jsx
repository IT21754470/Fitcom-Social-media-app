import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Api/AxiosConfig';
import backgroundImage from '../assets/img5.jpg';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/v1/socialmedia/logout');
            console.log('Logout response:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle logout error
        }
    };

    return (
        
        <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

            <div className="max-w-2xl mx-[25px] bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-3xl text-white font-semibold mb-6">FitCom Dashboard</h1>
                <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                        <Link to="/profile" className="block text-lg text-white hover:underline">Profile</Link>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => navigate('/profile')}>
                            Go
                        </button>
                    </li>
                    <li className="flex items-center justify-between">
                        <Link to="/follow" className="block text-lg text-white hover:underline">Friends</Link>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => navigate('/follow')}>
                            Go
                        </button>
                    </li>
                    <li className="flex items-center justify-between">
                        <Link to="/followed" className="block text-lg text-white hover:underline">All Users</Link>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => navigate('/messages')}>
                            Go
                        </button>
                    </li>
                    <li className="flex items-center justify-between">
                        <Link to="/settings" className="block text-lg text-white hover:underline">Settings</Link>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => navigate('/settings')}>
                            Go
                        </button>
                    </li>
                    <li className="flex items-center justify-between">
                        <button onClick={handleSubmit} className="block text-lg text-red-500 hover:underline">Sign Out</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
