import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Vuelidate from 'vuelidate'
import { mapActions } from 'vuex'

Vue.config.productionTip = false
// package global
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  mounted () {
    this.interceptorRequest()
    this.interceptorResponse()
  },
  render: h => h(App)
}).$mount('#app')
