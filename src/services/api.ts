import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.109:3333',
});

api.interceptors.request.use((response) => {
  console.log(response.url);
  return response;
}, (error) => {
  return Promise.reject(error);
});

export { api };