import Http from '../common/Http';
import AuthHeader from '../common/Auth-header';
import config from '../config/config';

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

    return data;
  });
}

function login(username, password) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  };
  const obj = {
    username,
    password,
  };
  const promise = new Promise(() => {
    Http.post(config.apiLogin, obj, headers);
  });
  return promise
    .then(handleResponse)
    .then((res) => {
      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
      }
      return res;
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
