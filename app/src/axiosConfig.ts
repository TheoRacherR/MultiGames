import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_NODE_ENV_DEV
  ? process.env.REACT_APP_URL_NEST_DEV || 'http://localhost:3333'
  : process.env.REACT_APP_URL_NEST_PROD;
axios.defaults.withCredentials = true;

// axios.defaults.baseURL = 'http://localhost:3333';
// axios.defaults.baseURL = process.env.REACT_APP_URL_NEST_DEV
// console.log(process.env.REACT_APP_URL_NEST_DEV)

export default axios;