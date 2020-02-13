import userSevices from '../../services/UserServices';

const state = {
  users: [],
  user: {},
  token: '',
  isLogin: 'false',
}

const getters = {
  getAllUsers: state => state.users,
  getUser: state => state.user,
  getStateLogin: state => state.isLogin,
}

const actions = {
  login(context, username, password) {
    userSevices.login(username, password)
      .then(
        (res) => {
          if (res.user) {
            context.commit('setUser', JSON.parse(localStorage.getItem('user')));
            context.commit('setToken', localStorage.getItem('token'));
            context.commit('setStateLogin', 'true');
          }
        },
        (error) => {
          this.$swal(
            'Fail!',
            'Logint fail!',
            'warning',
          );
        },
      );
  },
  logout(context, user, token) {
    userSevices.logout(user, token)
      .then(
        (res) => {
          context.commit('setUser', {});
          context.commit('setToken', '');
          context.commit('setStateLogin', 'false');
        },
        (error) => {
          this.$swal(
            'Fail!',
            'Logout fail!',
            'warning',
          );
        },
      );
  },
  getStateLogin(context) {
    let isLogin = localStorage.getItem('isLogin');
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
}
