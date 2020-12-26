import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
import jwt from 'jsonwebtoken'
import createPersistedState from 'vuex-persistedstate'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS({ isCompression: false })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: null,
    token: {
      accessToken: null,
      refreshToken: null
    },
    forgotPasswordCode: null
  },
  plugins: [
    createPersistedState()
  ],
  mutations: {
    SET_USER_DATA (state, payload) {
      state.userData = payload
    },
    SET_ACCESS_TOKEN (state, payload) {
      state.token.accessToken = payload
    },
    SET_REFRESH_TOKEN (state, payload) {
      state.token.refreshToken = payload
    },
    SET_FORGOT_PASSWORD_CODE (state, payload) {
      state.forgotPasswordCode = payload
    }
  },
  actions: {
    register (context, payload) {
      return new Promise((resolve, reject) => {
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
    updateProfile (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.patch(`${process.env.VUE_APP_SERVICE_API}/v1/users/${context.state.userData.id}`, payload)
          .then((result) => {
            context.dispatch('getUserData')
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    updatePhotoProfile (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        console.log('payload :>> ', payload)
        axios.patch(`${process.env.VUE_APP_SERVICE_API}/v1/users/photo-profile/${context.state.userData.id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then((result) => {
            context.dispatch('getUserData')
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    getUserData (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users/${context.state.userData.id}`)
          .then((result) => {
            context.commit('SET_USER_DATA', result.data.result)
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    forgotAndChangePassword (context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_SERVICE_API}/v1/users/forgot-password/${payload.email}`, payload.data)
          .then((result) => {
            context.commit('SET_FORGOT_PASSWORD_CODE', null)
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    forgotPassword (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/users/forgot-password`, payload)
          .then((result) => {
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    getUser (context) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users`)
          .then((result) => {
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    interceptorRequest ({ state }, payload) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${state.token.accessToken}`
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
        const errorStatusCode = error.response.data.statusCode
        const errorMessage = error.response.data.err.message
        if (errorStatusCode === 401) {
          // login
          if (errorMessage === 'Invalid email or password') {
            Swal.fire({
              icon: 'error',
              title: 'Email or Password invalid',
              showConfirmButton: false,
              timer: 1500
            })
          } else if (errorMessage === 'Wrong email') {
            Swal.fire({
              icon: 'error',
              title: 'Invalid Email',
              showConfirmButton: false,
              timer: 1500
            })
          }
          // forgotpassword
        } else if (errorStatusCode === 500) {

        }
        // const errorStatusCode = error.response.data.err
        return Promise.reject(error)
      })
    }
  },
  getters: {
    getAccessToken (state) {
      return state.token.accessToken
    },
    getRefreshToken (state) {
      return state.token.refreshToken
    },
    getForgotPassword (state) {
      return state.forgotPasswordCode
    },
    checkForgotPassword (state) {
      return state.forgotPasswordCode !== null
    },
    checkAccessToken (state) {
      return state.token.accessToken !== null
    },
    getDataUser (state) {
      return state.userData
    }
  },
  modules: {
  }
})
