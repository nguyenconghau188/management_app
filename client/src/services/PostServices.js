import http from '../common/Http-common';
import authHeader from '../common/Auth-header';
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    console.error(data);
    return data;
  });
}

function getPosts() {
  const headers = authHeader();
  return http.get('/posts', headers)
    .then(handleResponse);
}

function createPost(obj) {
  const headers = authHeader();
  return new Promise((res) => {
    http.post('/posts', obj, headers)
      .then(handleResponse)
      .then((response) => {
        res(response);
      });
  });
}

function getPost(id) {
  const headers = authHeader();
  return new Promise((res) => {
    http.get(`/posts/${id}`, headers)
      .then(handleResponse)
      .then((response) => {
        console.error(response);
        res(response);
      });
  });
}

function updatePost(obj) {
  /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
  // const headers = authHeader();
  const headers = authHeader();
  return new Promise((res) => {
    http.put(`/posts/${obj.id}`, obj.post, headers)
      .then(handleResponse)
      .then((response) => {
        res(response);
      });
  });
}

function deletePost(id) {
  /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
  // console.error(id);
  const headers = authHeader();
  return new Promise((res) => {
    http.delete(`/posts/${id}`, headers)
      .then(handleResponse)
      .then((response) => {
        res(response);
      });
  });
}

const postServices = {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};

export default postServices;
