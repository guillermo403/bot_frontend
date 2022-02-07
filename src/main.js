import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import constants from './constants'

// Global variables
Vue.prototype.$baseURL = constants.baseURL;

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
const api = axios.create({
  baseURL: constants.baseURL
});
axios.defaults.headers.get['Accept'] = 'application/json';
Vue.prototype.$http = api;
Vue.use(VueAxios, api);

// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
