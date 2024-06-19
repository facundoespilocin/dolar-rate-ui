import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import { BootstrapVue, BootstrapVueIcons, FormSelectPlugin } from 'bootstrap-vue'
import { axios } from "./api/axiosConfig"
import VueAxios from "vue-axios"
import Toasted from "vue-toasted"
import VueSidebarMenu from "vue-sidebar-menu"

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)
Vue.use(Toasted)
Vue.use(VueSidebarMenu)

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "vue-sidebar-menu/dist/vue-sidebar-menu.css"

document.title = "Dollar Info Web App"

// Developmnet base URL
//axios.defaults.baseURL = "https://localhost:7283/api"
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

// Production base URL
//axios.defaults.baseURL = "https://mevn-project-fe.herokuapp.com/api"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')