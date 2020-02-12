import Http from '../common/Http';
import AuthHeader from '../common/Auth-header';
import config from '../config/config';

export const userServices = {
  login,
  logout,
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        //auto logout if res return 401
        let user = localStorage.getItem('user');
        let token = localStorage.getItem('token');
        logout(user, token);
        location.reload();
      }
      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function login(username, password) {
  const headers = AuthHeader();
  const obj = {
    username,
    password,
  }
  let promise = new Promise((res) => {
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

function logout(user, token) {
  const headers = AuthHeader();
  const obj = {
    user,
    token,
  };
  let promise = new Promise((res) => {
    Http.post(config.apiLogout, obj, headers);
  });
  return promise
          .then(handleResponse)
          .then((res) => {
            localStorage.setItem('user', '');
            localStorage.setItem('token', '');
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
  return 1;
}

function update(id, user) {
  return 1;
}

function _delete(id) {
  return 1;
}
