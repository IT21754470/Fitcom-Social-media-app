import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axiosInstance from '../Api/AxiosConfig';

const GoogleLoginButton = () => {
    const googleLoginSuccess = async (response) => {
        try {
            const tokenId = response.tokenId;
            const googleResponse = await axiosInstance.post('/api/v1/socialmedia/google-login', { tokenId });
            console.log('Google login response:', googleResponse.data);
            // Add console statement for successful login
            console.log('Successfully logged in with Google');
            // Handle successful login, e.g., redirect to profile page
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    };
    
    const googleLoginFailure = (error) => {
        console.error('Google login failed:', error);
    };

    return (
        <GoogleLogin
            clientId="666212771890-ahbvthica7475hffo2bd7ofj9kofpacu.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={googleLoginSuccess}
            onFailure={googleLoginFailure}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginButton;
