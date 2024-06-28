import React, { useState, useEffect } from 'react';
import axiosInstance from '../Api/AxiosConfig';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/fit4.jpg';

const Follow = ({ loggedInUserId }) => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/api/v1/socialmedia/getAll');
                const usersWithFollowStatus = response.data.map(user => ({
                    ...user,
                    followed: localStorage.getItem(`followed_${loggedInUserId}_${user.id}`) === 'true'
                }));
                setUsers(usersWithFollowStatus);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [loggedInUserId]);

    const handleFollow = async (userId) => {
        try {
            await axiosInstance.post(`/api/v1/socialmedia/follow/${userId}`);
            const updatedUsers = users.map(user => {
                if (user.id === userId) {
                    localStorage.setItem(`followed_${loggedInUserId}_${userId}`, 'true');
                    console.log(`Successfully followed user with ID: ${userId}`);
                    return { ...user, followed: true };
                }
                return user;
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error following user:', error);
            console.log(`Failed to follow user with ID: ${userId}`);
        }
    };
    
    const handleUnfollow = async (userId) => {
        try {
            await axiosInstance.post(`/api/v1/socialmedia/unfollow/${userId}`);
            const updatedUsers = users.map(user => {
                if (user.id === userId) {
                    localStorage.setItem(`followed_${loggedInUserId}_${userId}`, 'false');
                    console.log(`Successfully unfollowed user with ID: ${userId}`);
                    return { ...user, followed: false };
                }
                return user;
            });
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error unfollowing user:', error);
            console.log(`Failed to unfollow user with ID: ${userId}`);
        }
    };

    // Filter users based on the search query
    const filteredUsers = users.filter(user =>
        user.studentname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-8 bg-white opacity-60"></div> {/* Black overlay */}
            <div className="relative z-10 text-black">
                <div className="follow-page">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Follow Users</h2>
                    {/* Search bar */}
                    <input
                        type="text"
                        placeholder="Search users"
                        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="grid grid-cols-4 gap-4">
                        {filteredUsers.map(user => (
                            <div key={user.id} className="flex flex-col items-center">
                                <img
                                    src={user.profilePicture}
                                    alt={`Profile of ${user.studentname}`}
                                    className="rounded-full w-24 h-24 mb-2"
                                />
                                <h3 className="text-sm font-medium mb-2 text-center">{user.studentname}</h3>
                                <button
                                    onClick={() => user.followed ? handleUnfollow(user.id) : handleFollow(user.id)}
                                    className={`py-2 px-4 rounded ${user.followed ? 'bg-red-700' : 'bg-blue-500'} hover:${user.followed ? 'bg-gray-500' : 'bg-blue-700'} text-white font-bold`}
                                >
                                    {user.followed ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Follow;