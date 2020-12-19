import axios from 'axios';

const SERVER_URL = 'https://license-manager-server:9800';

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  withCredentials: true,
});

const setAxiosAuthToken = (authorizationToken) => {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${authorizationToken}`;
};

export { setAxiosAuthToken };
export default axiosInstance;
