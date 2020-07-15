import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
  //기본 접근방법 : this.$store.state.items
  state: {
    status: "",
    user: "",
    isauth: 0,
  },

  //기본 접근방법 : this.$store.commit('경로명/함수명') ex this.$store.commit("auth_success", user_email)
  mutations: {
    /*
    auth_request(state) {
      state.status = "loading"
    },
    */
    auth_success(state, user) {
      state.status = "success"
      state.user = user
      state.isauth = 1
    },
    logout(state) {
      state.status = ""
      state.isauth = 0
    },
  },

  //기본 접근방법 : this.$store.dispatch('경로명/함수명')
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request")
        axios({
          url: "http://localhost:3000/login",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem("token", token)
            axios.defaults.headers.common["Authorization"] = token
            commit("auth_success", token, user)
            resolve(resp)
          })
          .catch((err) => {
            commit("auth_error")
            localStorage.removeItem("token")
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request")
        axios({
          url: "http://localhost:3000/register",
          data: user,
          method: "POST",
        })
          .then((resp) => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem("token", token)
            axios.defaults.headers.common["Authorization"] = token
            commit("auth_success", token, user)
            resolve(resp)
          })
          .catch((err) => {
            commit("auth_error", err)
            localStorage.removeItem("token")
            reject(err)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout")
        localStorage.removeItem("token")
        delete axios.defaults.headers.common["Authorization"]
        resolve()
      })
    },
  },

  //기본 접근방법 : this.$store.getters["경로명/함수명"];, this.$store.getters.doneTodosCount, this.$store.getters.getTodoById(2)

  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
})
