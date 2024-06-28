import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Assuming your Spring Boot backend is running on port 8080
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },

});
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify request headers to include CORS headers
        config.headers['Access-Control-Allow-Origin'] = '*'; // Allow requests from any origin
        config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'; // Allow specified HTTP methods
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default axiosInstance;


