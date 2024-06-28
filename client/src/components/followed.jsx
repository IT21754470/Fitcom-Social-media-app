import React, { useState, useEffect } from 'react';
import axiosInstance from '../Api/AxiosConfig';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/fit4.jpg';

const FollowedUsersPage = () => {
    const [followedUsers, setFollowedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFollowedUsers = async () => {
            try {
                const response = await axiosInstance.get('/api/v1/socialmedia/getFollowedUsers');
                setFollowedUsers(response.data);
                setIsLoading(false);
                console.log('Followed users fetched successfully:', response.data);
            } catch (error) {
                console.error('Error fetching followed users:', error);
                setError(error.response.data.message);
                setIsLoading(false);
                console.log('Failed to fetch followed users:', error);
            }
        };

        fetchFollowedUsers();
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-10 bg-white opacity-60"></div>
            <div className="relative z-10 text-black">
                <div className="followed-users-page">
                    <h2 className="text-2xl font-semibold mb-4 text-center">All Users</h2>
                    {isLoading && <p className="text-center">Loading followed users...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}
                    {!isLoading && !error && (
                        <div className="grid grid-cols-3 gap-4">
                            {followedUsers.map(user => (
                                <div key={user.id} className="flex flex-col items-center">
                                    <Link to={`/userProfilePage/${user.id}`}>
                                        <img
                                            src={user.profilePicture}
                                            alt={`Profile of ${user.studentname}`}
                                            className="rounded-full w-24 h-24 mb-2"
                                        />
                                        <h3 className="text-sm font-medium mb-2 text-center">{user.studentname}</h3>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FollowedUsersPage;
