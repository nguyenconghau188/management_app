import config from '../config/config';

const http = {
  handleResponse(response) {
    console.error(response);
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      console.error(data);
      return data;
    });
  },
  get(url, headers = {}) {
    const requestOptions = {
      method: 'GET',
      headers,
    };
    return fetch(`${config.apiUrl}${url}`, requestOptions)
      .then(this.handleResponse)
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
      .then(this.handleResponse)
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
      .then(this.handleResponse)
      .catch((error) => {
        throw new Error(`[Error] Http ${error}`);
      });
  },
};

export default http;
