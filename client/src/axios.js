import axios from 'axios';

const defaultOptions = {
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

instance.interceptors.response.use(
  response => response,
  async err => {
    const originalRequest = err.config;
    if (err.response.status === 403 && originalRequest._retry === false) {
      originalRequest._retry = true;

      const res = await instance.post('/api/auth/refreshtoken');
      localStorage.setItem('jwt', res.data);

      const retry = await instance(originalRequest);

      return retry;
    }
    return Promise.reject(err);
  }
);
export default instance;
