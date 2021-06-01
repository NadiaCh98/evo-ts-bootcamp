import axios from 'axios';

const axiosServer = axios.create({
  baseURL: process.env.REACT_APP_NASA_API,
});

export default axiosServer;
