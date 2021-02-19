import axios from 'axios';

const defaultOptions = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://peaceful-fortress-47523.herokuapp.com/'
      : 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

instance.interceptors.response.use(
  response => response,
  async err => {
    const originalRequest = err.config;
    if (err.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await instance.post('/api/auth/refreshtoken');
      localStorage.setItem('jwt', res.data.token);

      const retry = await instance(originalRequest);

      return retry;
    }
    return Promise.reject(err);
  }
);
export default instance;
