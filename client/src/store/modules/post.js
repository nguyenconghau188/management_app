import postServices from '../../services/PostServices';

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
    postServices.getPosts()
      .then((res) => {
        context.commit('setPosts', res.docs);
      });
  },
  createPost(context, obj) {
    postServices.createPost(obj);
  },
  updatePost(context, obj) {
    postServices.updatePost(obj);
  },
  getPost(context, id) {
    return postServices.getPost(id);
  },
  deletePost(context, id) {
    return postServices.deletePost(id);
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
