import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
  //기본 접근방법 : this.$store.state.items
  state: {
    dashboard: [null],
    introduction: [null],
    assignments: [null],
    lecture: [null],
    board: [null],
    stud_care: [null],
    course_care: [null],
  },

  //기본 접근방법 : this.$store.commit('경로명/함수명') ex this.$store.commit("auth_success", user_email)
  mutations: {
    setCourseData(state, db) {
      state.dashboard = db.dashboard
      state.introduction = db.introduction
      state.lecture = db.lecture
      state.assignments = db.assignment
      state.board = db.board
      state.stud_care = db.stud_care
      state.course_care = db.course_care
    },

    addLectureData(state, newlecture) {
      state.lecture.push(newlecture)
      console.log("storage add")
    },

    addAssignData(state, newAssign) {
      state.assignments.push(newAssign)
      console.log("storage add")
    },

    /*
    auth_request(state) {
      state.status = "loading"
    },
    
    auth_success(state, user) {
      state.status = "success"
      state.user = user
      state.isauth = 1
    },
    logout(state) {
      state.status = ""
      state.isauth = 0
    },*/
  },

  //기본 접근방법 : this.$store.dispatch('경로명/함수명')
  actions: {},

  //기본 접근방법 : this.$store.getters["경로명/함수명"];, this.$store.getters.doneTodosCount, this.$store.getters.getTodoById(2)

  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
})
