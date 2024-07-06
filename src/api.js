import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gateguard-backend.onrender.com/api', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add any interceptors if needed

export default api;
