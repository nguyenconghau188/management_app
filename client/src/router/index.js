import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Posts from '../views/Posts.vue';
import PostAction from '../views/PostAction.vue';
// import Login from '../views/Login.vue';
// import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/posts/create',
    name: 'create',
    component: PostAction,
  },
  {
    path: '/post/edit/:id',
    name: 'edit',
    component: PostAction,
  },
];

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
