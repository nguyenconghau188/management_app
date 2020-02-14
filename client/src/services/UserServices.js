import Http from '../common/Http-common';
import AuthHeader from '../common/Auth-header';
import config from '../config/config';

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
function logout(user, token) {
  const headers = AuthHeader();
  const obj = {
    user,
    token,
  };
  const promise = new Promise(() => {
    Http.post(config.apiLogout, obj, headers);
  });
  return promise
    .then((res) => {
      localStorage.setItem('user', '');
      localStorage.setItem('token', '');
      return res;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if res return 401
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        logout(user, token);
        window.location.reload();
      }
      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }
    console.error(data);
    return data;
  });
}

function login(obj) {
  const headers = {
    'Content-Type': 'application/json',
  };
  console.error(obj);
  return new Promise((res) => {
    Http.post(config.apiLogin, obj, headers)
      .then(handleResponse)
      .then((response) => {
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
        }
        res(response);
      });
  });
}

function register() {
  return 1;
}

function getAll() {
  return 1;
}

function getById(id) {
  return id;
}

function update(id, user) {
  return { id, user };
}

function deleteUser(id) {
  return id;
}

const userServices = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  deleteUser,
};

export default userServices;
