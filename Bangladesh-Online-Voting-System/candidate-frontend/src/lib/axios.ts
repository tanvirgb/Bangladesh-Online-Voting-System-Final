import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // URL of your NestJS backend
});

export default instance;
