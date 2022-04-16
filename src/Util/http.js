import axios from 'axios';
const http = axios.create({
  baseURL: '/api',
  timeout: 5000,
  params: {
    cookie: localStorage.getItem('cookie'),
    withCredentials: true,
  },
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

http.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // (config);
    return config;
  },

  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
export default http;
