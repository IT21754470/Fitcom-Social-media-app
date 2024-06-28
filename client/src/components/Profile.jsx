import React, { useState, useEffect } from 'react';
import axiosInstance from '../Api/AxiosConfig';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa'; 
//import backgroundImage from '../assets/Contact7.jpg'

const ProfileUpdate = () => {
    const { user_id } = useParams();
    const [profileData, setProfileData] = useState({
        studentname: '',
        email: '',
        mobile: '',
        bio: '',
    });
    const [profilePictureBase64, setProfilePictureBase64] = useState(null);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null); // State to control which field is being edited

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/socialmedia/profile/${user_id}`);
                setProfileData(response.data);
            } catch (error) {
                setError('Error fetching profile data');
            }
        };

        if (user_id) {
            fetchProfile();
        }
    }, [user_id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePictureBase64(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profileToUpdate = {
            ...profileData,
            profilePicture: profilePictureBase64,
        };

        try {
            const response = await axiosInstance.put(
                `/api/v1/socialmedia/profile/${user_id}`,
                profileToUpdate,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            setProfileData(response.data);
            setEditingField(null); // Exit edit mode after submitting
        } catch (error) {
            setError('Error updating profile');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='bg-white'>

        <div className='bg-blue-100 p-3 max-w-xl mx-auto'>
            <div className='flex justify-between items-center mb-7'>
                <h2 className='text-3xl font-semibold'>My Profile</h2>
             
            </div>

            <div className='flex justify-between items-center my-7'>
                <div className='relative'>
                    {profileData.profilePicture && (
                        <img
                            className='rounded-full h-24 w-24 object-cover border-4 border-white'
                            src={profileData.profilePicture}
                            alt='Profile'
                        />
                    )}
                    <div
                        className='absolute bottom-0 right-0 bg-gray-700 rounded-full p-1 cursor-pointer'
                        onClick={() => setEditingField('profilePicture')}
                    >
                        <FaEdit className='text-white' />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-1/2'>
                    {['studentname', 'bio'].map((field) => (
                        <div key={field} className='flex flex-col'>
                            {editingField === field ? (
                                <>
                                    <input
                                        type='text'
                                        name={field}
                                        value={profileData[field]}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, [field]: e.target.value })
                                        }
                                        placeholder={field}
                                        className='p-2 border rounded focus:outline-none focus:border-yellow-400'
                                    />
                                    <button
                                        type='button'
                                        className='mt-2 text-blue-500'
                                        onClick={() => setEditingField(null)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p>{profileData[field]}</p>
                                    <div
                                        className='text-blue-500 cursor-pointer'
                                        onClick={() => setEditingField(field)}
                                    >
                                        <FaEdit className='inline-block mr-2' />
                                        Edit 
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                    {editingField === 'profilePicture' && (
                        <>
                            <input type='file' onChange={handleFileChange} className='mt-4' />
                            <button
                                type='button'
                                className='mt-2 text-blue-500'
                                onClick={() => setEditingField(null)}
                            >
                                Cancel
                            </button>
                        </>
                    )}
                    {editingField && (
                        <div className='flex gap-4 mt-4'>
                            <button
                                type='submit'
                                className='shadow-xl bg-blue-300 text-base rounded-xl text-slate-700 px-5 py-1 hover:bg-blue-400 transition duration-300'
                            >
                                Update Profile
                            </button>
                        </div>
                    )}
                </form>
            </div>

            <h1 className='text-2xl font-semibold text-center my-7'>My Posts</h1>
            <div className='bg-gray-400 mt-8 grid grid-cols-3 gap-4'>
                {[...Array(6)].map((_, index) => (
                    <div key={index} className='border border-gray-300 rounded-md p-4'>
                        <div className='h-40 bg-gray-200 mb-2 rounded-md'></div>
                        <div className='h-6 bg-gray-200 rounded'></div>
                    </div>
                ))}
                 <Link
                    to="/dashboard"
                    className=' bg-blue-700 text-base rounded-xl text-slate-700 px-7 py-3 hover:bg-blue-700 transition duration-300'
                >
                    Dashboard
                </Link>
            </div>
        </div>
        </div>
    );
};

export default ProfileUpdate;
