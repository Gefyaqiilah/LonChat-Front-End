import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Vuelidate from 'vuelidate'
import LeafLetMaps from './components/module/maps/Maps.vue'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import VueGeolocation from 'vue-browser-geolocation'
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
import VueAWN from 'vue-awesome-notifications'

Vue.use(VueAWN)
Vue.use(VueNoty)
Vue.use(VueGeolocation)
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.config.productionTip = false
// package global
Vue.use(Vuelidate)
// component global
Vue.component('LeafLetMaps', LeafLetMaps)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
