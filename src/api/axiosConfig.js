import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || "https://localhost:7283/api";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default axios;