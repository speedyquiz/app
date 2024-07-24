/* eslint-disable arrow-body-style */
import axios from 'axios';
import apiUrl from '../constant/common/apiConstant';

const fetchClient = () => {
  // Create instance
  const instance = axios.create({ baseURL: apiUrl.endPoint });
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  instance.interceptors.request.use((config) => {
    const authToken = localStorage.getItem('token') || null;
    if (authToken) {
      // config.headers.Authorization = `Bearer ${authToken}`;
      config.headers['x-access-token'] = authToken;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      return Promise.resolve(response.data);
    },
    // eslint-disable-next-line consistent-return
    async (error) => {
      // console.log('====================================');
      // console.log(JSON.stringify(error));
      // console.log('====================================');
      const data = error && error.response ? error.response.data : null;

      // if (!data) {
      //   return Promise.reject(data);
      // }
      // if (data && data.error) {
      //   return Promise.reject(data);
      // }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default fetchClient();
