import userSevices from '../../services/UserServices';

const state = {
  users: [],
  user: {},
  token: '',
}

const getters = {
  getAllUsers: state => state.users,
  getUser: state => state.user,
}

const actions = {
  login(context, username, password) {
    userSevices.login(username, password)
      .then(
        (res) => {
          if (res.user) {
            context.commit('setUser', JSON.parse(localStorage.getItem('user')));
            context.commit('setToken', localStorage.getItem('token'));
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
    return userSevices.logout(user, token)
      .then(
        (res) => {
          context.commit('setUser', {});
          context.commit('setToken', '');
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
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
}
