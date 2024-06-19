import axios from 'axios';

const API_BASE_URL = "https://localhost:7283/api";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export { axios, API_BASE_URL };