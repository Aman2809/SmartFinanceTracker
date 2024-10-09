import axios from "axios";
   import { getToken } from "../jwtAuth/auth";

   export const BASE_URL = process.env.NODE_ENV === 'production' 
     ? '/api/v1/'
     : 'http://financetracker.eu-north-1.elasticbeanstalk.com/api/v1/';

   export const myAxios = axios.create({
     baseURL: BASE_URL
   });

   export const privateAxios = axios.create({
     baseURL: BASE_URL,
   });

   privateAxios.interceptors.request.use(config => {
     const token = getToken();
     if (token) {
       config.headers = config.headers || {};
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   }, error => Promise.reject(error));