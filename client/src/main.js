import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import router from './router';
import store from './store';
import Http from './common/Http';
import App from './App.vue';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
/* eslint linebreak-style: ["error", "windows"] */

Vue.use(VueSweetalert2);
Vue.config.productionTip = false;
Http.init();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
