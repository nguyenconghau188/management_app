import Vue from 'vue';
import router from './router';
import store from './store';
import Http from './common/Http';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.config.productionTip = false;
Http.init();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
