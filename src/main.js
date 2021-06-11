import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import store from './store'

import Swal from 'sweetalert2'


axios.defaults.baseURL='http://localhost:3000/api/';
//axios.defaults.baseURL='http://direccionheroku.herokuapp.com/api/'

import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  Swal,
  render: h => h(App)
}).$mount('#app')