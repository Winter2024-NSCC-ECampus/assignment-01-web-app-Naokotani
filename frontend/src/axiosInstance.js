import Cookies from 'js-cookie';
import axios from 'axios';
const token = Cookies.get('authToken');
const apiUrl = import.meta.env.VITE_DEV_API_URL

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
  withCredentials: true,
});

export default axiosInstance;
