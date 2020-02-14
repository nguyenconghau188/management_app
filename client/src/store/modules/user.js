import userSevices from '../../services/UserServices';
import routes from '../../router/index';
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  users: [],
  user: {},
  token: '',
  isLogin: 'false',
};

const getters = {
  getAllUsers: state => state.users,
  getUser: state => state.user,
  getStateLogin: state => state.isLogin,
};

const actions = {
  login(context, obj) {
    console.error('on login');
    userSevices.login(obj)
      .then(
        (res) => {
          console.error(res);
          if (res.user) {
            context.commit('setUser', JSON.parse(localStorage.getItem('user')));
            context.commit('setToken', localStorage.getItem('token'));
            context.commit('setStateLogin', 'true');
            routes.push({ name: 'home' });
          }
        },
        (error) => {
          if (error) {
            this.$swal(
              'Fail!',
              'Logout fail!',
              'warning',
            );
          }
        },
      );
  },
  logout(context, user, token) {
    userSevices.logout(user, token)
      .then(
        () => {
          context.commit('setUser', {});
          context.commit('setToken', '');
          context.commit('setStateLogin', 'false');
        },
        (error) => {
          if (error) {
            this.$swal(
              'Fail!',
              'Logout fail!',
              'warning',
            );
          }
        },
      );
  },
  getStateLogin(context) {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin === 'true') {
      context.commit('setStateLogin', isLogin);
    }
  },
  forceLogout(context) {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    localStorage.setItem('isLogin', 'false');
    context.commit('setUser', {});
    context.commit('setToken', '');
    context.commit('setStateLogin', 'false');
  },
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
  setStateLogin(state, isLogin) {
    state.isLogin = isLogin;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
