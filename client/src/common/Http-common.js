import config from '../config/config';
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
const http = {
  get(url, headers = {}) {
    const requestOptions = {
      method: 'GET',
      headers,
    };
    return fetch(`${config.apiUrl}${url}`, requestOptions)
      .catch((error) => {
        throw new Error(`[Error] Http ${error}`);
      });
  },
  post(url, obj, headers = {}) {
    const requestOptions = {
      method: 'POST',
      headers,
      body: JSON.stringify(obj),
    };
    return fetch(`${config.apiUrl}${url}`, requestOptions)
      // .then((res) => {
      //   console.error(res);
      //   return res;
      // })
      .catch((error) => {
        throw new Error(`[Error] Http ${error}`);
      });
  },
  put(url, obj, headers = {}) {
    const requestOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify(obj),
    };
    return fetch(`${config.apiUrl}${url}`, requestOptions)
      .catch((error) => {
        throw new Error(`[Error] Http ${error}`);
      });
  },
  delete(url, headers = {}) {
    const requestOptions = {
      method: 'DELETE',
      headers,
    };
    return fetch(`${config.apiUrl}${url}`, requestOptions)
      .catch((error) => {
        throw new Error(`[Error] Http ${error}`);
      });
  },
};

export default http;
