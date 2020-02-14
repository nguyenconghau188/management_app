import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Posts from '../views/posts/Posts.vue';
import PostAction from '../views/posts/PostAction.vue';
import About from '../views/About.vue';
import Login from '../views/user/Login.vue';
import Register from '../views/user/Register.vue';

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
    component: About,
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
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  return next();
});

export default router;
