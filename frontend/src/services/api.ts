import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (username: string, password: string) =>
    api.post('/login/', { username, password }),
  
  register: (username: string, email: string, password: string) =>
    api.post('/register/', { username, email, password }),
};

export const newsAPI = {
  getNews: () => api.get('/news/'),
  refreshNews: () => api.post('/news/refresh/'),
};

export default api;