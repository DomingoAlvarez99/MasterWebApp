import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store'
import VueWindowSize from 'vue-window-size';
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuex from 'vuex'
import i18n from './i18n'


Vue.use(Vuex)
Vue.use(VueWindowSize);
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router: router,
  store: store,
  i18n,
  render: h => h(App)
}).$mount('#app')
