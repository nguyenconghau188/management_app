import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import config from '../config/config';

const Http = {
  init() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = config.apiUrl;
  },
  get(url, headers) {
    return Vue.axios
      .get(`${url}`, { headers })
      .catch((error) => {
        throw new Error(`[Error] Http ${error}`);
      });
  },
  post(resource, params, headers = null) {
    return Vue.axios
      .post(`${resource}`, params, { headers })
      .catch((error) => {
        throw new Error(`[Error] Http ${error}`);
      });
  },
  put(resource, params, headers = null) {
    return Vue.axios
      .put(`${resource}`, params, { headers })
      .catch((error) => {
        throw new Error(`[Error] Http ${error}`);
      });
  },
};

export default Http;
