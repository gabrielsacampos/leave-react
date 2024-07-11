import axios from 'axios';
import {env} from '../env';

export const api = axios.create({
  baseURL: env.API_SERVER,
  timeout: 1000,
});