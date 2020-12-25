import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import jwt from 'jsonwebtoken'

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
    SET_USER_DATA (state, payload) {
      state.userData = payload
    },
    SET_ACCESS_TOKEN (state, payload) {
      state.token.accessToken = payload
    },
    SET_REFRESH_TOKEN (state, payload) {
      state.token.refreshToken = payload
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
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/users/login`, payload)
          .then((result) => {
            const data = result.data.result
            const accessToken = data.accessToken
            const refreshToken = data.refreshToken
            jwt.verify(accessToken, process.env.VUE_APP_ACCESS_TOKEN_KEY, async function (err, decoded) {
              if (!err) {
                context.commit('SET_ACCESS_TOKEN', accessToken)
                context.commit('SET_REFRESH_TOKEN', refreshToken)
                delete decoded.iat
                delete decoded.exp
                context.commit('SET_USER_DATA', decoded)
                context.dispatch('getUserData', decoded.id)
                resolve(data)
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Token Invalid',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            })
          }).catch((err) => {
            reject(err)
          })
      })
    },
    getUserData (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users/${payload}`)
          .then((result) => {
            context.commit('SET_USER_DATA', result.data.result)
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
        return response
      }, function (error) {
        console.log(error)
        const errorStatusCode = error.response.data.statusCode
        const errorMessage = error.response.data.err.message
        console.log(errorMessage)
        console.log(errorStatusCode)
        if (errorStatusCode === 401) {
          // login
          if (errorMessage === 'Invalid email or password') {
            Swal.fire({
              icon: 'error',
              title: 'Email or Password invalid',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else if (errorStatusCode === 500) {

        }
        // const errorStatusCode = error.response.data.err
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
