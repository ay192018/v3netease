import axios from 'axios';
const qq = axios.create({
  baseURL: '/qq',
  timeout: 5000,
  params: {
    withCredentials: true,
  },
});

qq.interceptors.request.use(
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
export default qq;
