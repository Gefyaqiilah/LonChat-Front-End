import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: null,
    token: {
      accessToken: null,
      refreshToken: null
    }
  },
  mutations: {
    SET_DATA (state, payload) {
      state.userData = payload
    }
  },
  actions: {
    register (context, payload) {
      return new Promise((resolve, reject) => {
        console.log('process.env.VUE_APP_SERVIVE_API :>> ', process.env.VUE_APP_SERVICE_API)
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/users/register`, payload)
          .then((result) => {
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    interceptorRequest (context, payload) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${context.state.token.accessToken}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context, payload) {
      axios.interceptors.response.use(function (response) {
        console.log(response)
      }, function (error) {
        console.log(error)
      })
    }
  },
  getters: {
    getAccessToken (state) {
      return state.token.accessToken
    },
    getRefreshToken (state) {
      return state.token.refreshToken
    }
  },
  modules: {
  }
})
