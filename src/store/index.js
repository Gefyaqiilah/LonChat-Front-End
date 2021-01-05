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
    forgotPasswordCode: null,
    contactList: null,
    userChatSelected: null,
    chatMessage: [],
    currentLocation: null
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
    },
    SET_CONTACT_LIST (state, payload) {
      state.contactList = payload
    },
    SET_USER_CHAT_SELECTED (state, payload) {
      state.userChatSelected = payload
    },
    SET_CHAT_MESSAGE (state, payload) {
      state.chatMessage = payload
    },
    PUSH_CHAT_MESSAGE (state, payload) {
      state.chatMessage.push(payload)
    },
    SET_CURRENT_LOCATION (state, payload) {
      state.currentLocation = payload
    },
    REMOVE_ALL_VALUE_STATE (state) {
      state.userData = null
      state.token.accessToken = null
      state.token.refreshToken = null
      state.forgotPasswordCode = null
      state.contactList = null
      state.userChatSelected = null
      state.chatMessage = []
      state.currentLocation = null
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
    getLastMessage (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/messages/last-message/${payload}`)
          .then((result) => {
            resolve(result.data.result)
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
    getFriendsData (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/friends/${payload}`)
          .then((result) => {
            resolve(result.data.result.friends)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    searchFriend (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users/search?search=${payload}`)
          .then((result) => {
            const filter = result.data.result.search.filter(item => item.id !== context.state.userData.id)
            resolve(filter)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    addNewFriend (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/friends`, payload)
          .then((result) => {
            context.dispatch('getFriendsData', context.state.userData.id)
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    getUserChatSelected (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.get(`${process.env.VUE_APP_SERVICE_API}/v1/users/${payload}`)
          .then((result) => {
            resolve(result.data.result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    getAllMessageUserSelected (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/messages`, payload)
          .then((result) => {
            resolve(result.data.result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    readMessage (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        axios.post(`${process.env.VUE_APP_SERVICE_API}/v1/messages/read-message`, payload)
          .then(() => {
          }).catch(() => {
          })
      })
    },
    deleteAllMessage (context, payload) {
      return new Promise((resolve, reject) => {
        context.dispatch('interceptorRequest')
        console.log('payload :>> ', payload)
        axios.delete(`${process.env.VUE_APP_SERVICE_API}/v1/messages/delete-all-message`, { data: payload })
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
        return response
      }, function (error) {
        const errorStatusCode = error.response.data.statusCode
        const errorMessage = error.response.data.err.message
        console.log('errorMessage :>> ', errorMessage)
        if (errorStatusCode === 400) {
          if (errorMessage === 'Email has been used by other user') {
            return Promise.reject(errorMessage)
          } else if (errorMessage === 'Wrong email') {
            return Promise.reject(errorMessage)
          }
        } else if (errorStatusCode === 401) {
          if (errorMessage === 'Invalid email or password') {
            return Promise.reject(errorMessage)
          }
        }
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
    },
    getContactList (state) {
      return state.contactList
    },
    getuserChatSelected (state) {
      return state.userChatSelected
    },
    getUserChat (state) {
      return state.userChatSelected
    },
    getChatMessage (state) {
      return state.chatMessage
    },
    getCurrentLocation (state) {
      return state.currentLocation
    }
  },
  modules: {
  }
})
