import Cookies from 'js-cookie';
import axios from 'axios';
const token = Cookies.get('authToken');

let apiUrl;
if (import.meta.env.DEV)
  apiUrl = import.meta.env.VITE_DEV_API_URL;
else
  apiUrl = import.meta.env.VITE_PROD_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
  withCredentials: true,
});

export default axiosInstance;
