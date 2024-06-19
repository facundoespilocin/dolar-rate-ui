import axios from 'axios';

//const API_BASE_URL = "https://localhost:7283/api";
const API_BASE_URL = "http://dollar-api-prod.us-east-2.elasticbeanstalk.com/api";

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export { axios, API_BASE_URL };