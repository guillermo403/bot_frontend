import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import authentication from './modules/authentication'
import snackbar from './modules/snackbar'
import loading from './modules/loading'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: { authentication, snackbar, loading }
});

export default store;