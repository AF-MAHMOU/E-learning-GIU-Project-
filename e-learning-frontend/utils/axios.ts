import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002', // Update with your backend URL
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('access_token'); // Retrieve the token from sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Include the token in the request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
