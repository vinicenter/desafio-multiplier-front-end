import axios from 'axios';
import config from '../config/config.json';

axios.defaults.baseURL = config.apiBaseUrl;

export default axios;
