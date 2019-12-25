import Vue from 'vue';
import App from './App.vue';
import Mint from 'mint-ui';
import router from './router';
import store from './store/index';
import VueCookies from 'vue-cookies';

import './style/main.scss'; //引入main.scss文件  all in js理念
import './modules/rem';

import 'mint-ui/lib/style.css';
import 'font-awesome/css/font-awesome.css';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

import axios from 'axios';
import {
  get,
  post
} from './api/http';
Vue.prototype.$get = get;
Vue.prototype.$post = post;

Vue.config.productionTip = false;

Vue.component('icon', Icon);

Vue.use(Mint);
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');