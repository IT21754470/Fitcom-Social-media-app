import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Api/AxiosConfig';
import PostList from './PostList';
const UserProfilePage = ({ followed }) => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState('');
    const [messageStatus, setMessageStatus] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/socialmedia/profile/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        const fetchUserPosts = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/socialmedia/posts/${userId}`);
                setUserPosts(response.data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserProfile();
        fetchUserPosts();
    }, [userId]);

    const handleSendMessage = async () => {
        try {
            const response = await axiosInstance.post(`/api/v1/socialmedia/message/${userId}`, { message });
            setMessageStatus('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            setMessageStatus('Failed to send message.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="user-profile-page p-20 bg-blue-100 rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
                {userData && (
                    <div className="profile-container flex items-center">
                        <div className="profile-picture mr-4 relative">
                            <img
                                src={userData.profilePicture}
                                alt={`Profile of ${userData.studentname}`}
                                className="rounded-full w-24 h-24 mb-2"
                            />
                            <div className="absolute inset-0 border-4 border-blue-400 rounded-full"></div>
                        </div>
                        <div className="profile-details">
                            <p className="text-lg font-semibold">{userData.studentname}</p>
                            <p className="text-sm">{userData.bio}</p>
                            <div className="mt-2">
                                <p className="text-sm"><strong>Email:</strong> {userData.email}</p>
                                <p className="text-sm"><strong>Bio:</strong> {userData.bio}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="message-box mt-6">
                    <h3 className="text-xl font-semibold mb-2">Send a Message</h3>
                    <textarea
                        className="w-full p-2 border rounded-md"
                        rows="4"
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button
                        className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                        onClick={handleSendMessage}
                    >
                        Send Message
                    </button>
                    {messageStatus && <p className="mt-2 text-sm">{messageStatus}</p>}
                </div>
                <div className="post-list mt-6">
                    <h3 className="text-xl font-semibold mb-2">User Posts</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {userPosts.map((post, index) => (
                            <div key={index} className="border border-gray-300 rounded-md p-4">
                                <div className="h-40 bg-gray-200 mb-2 rounded-md"></div>
                                <div className="h-6 bg-gray-200 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
