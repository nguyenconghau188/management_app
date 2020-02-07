// import Http from '../../common/Http';
import Axios from 'axios';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const state = {
  posts: [],
  post: {},
};

const getters = {
  getAllPosts: state => state.posts,
  getPost: state => state.post,
};

const actions = {
  getPosts(context) {
    Axios.get('/posts')
      .then((res) => {
        context.commit('setPosts', res.data.docs);
      });
  },
  createPost(context, obj) {
    return new Promise((res) => {
      Axios.post('/posts', obj)
        .then((response) => {
          res(response);
        });
    });
  },
  updatePost(context, obj) {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    return new Promise((res) => {
      Axios.put(`/posts/${obj.id}`, obj.post)
        .then((response) => {
          res(response);
        });
    });
  },
  getPost(context, id) {
    return new Promise((res) => {
      Axios.get(`/posts/${id}`)
        .then((response) => {
          // console.error(response);
          res(response);
        });
    });
  },
  deletePost(context, id) {
    /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
    // console.error(id);
    return new Promise((res) => {
      Axios.get(`/posts/delete/${id}`)
        .then((response) => {
          res(response);
        });
    });
  },
};

const mutations = {
  setPosts(state, posts) {
    state.posts = posts;
  },
  setPost(state, post) {
    state.post = post;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
