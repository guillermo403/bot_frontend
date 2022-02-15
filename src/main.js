import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import constants from './constants'
import moment from 'moment'
// Vuex
import store from './store'

// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Global variables
Vue.prototype.$baseURL = constants.baseURL;

// axios
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.baseURL = constants.baseURL;
axios.defaults.headers.get['Accept'] = 'application/json';
Vue.prototype.$http = axios;
Vue.use(VueAxios, axios);

// Translations
// import VueIl8n from 'vue-il8n'
// import en from './translations/en.json'
// import es from './translations/es.json'
// Vue.use(VueIl8n);
// const userLang = navigator.language || navigator.userLanguage;
// export const il8n = new VueIl8n({
//   locale: userLang.substring(0, 2),
//   fallbackLocale: 'en',
//   messages: { en: en, es: es }
// });

// Filters
Vue.filter('formatDate', function(date) {
  if (!date) return;
  date = date.toString();
  return moment.unix(date).format('DD/MM/YYYY HH:mm');
});

Vue.filter('stringToJson', function(obj) {
  if (!obj) return;
  return JSON.stringify(obj);
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
