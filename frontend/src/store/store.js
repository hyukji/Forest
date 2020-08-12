import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import { eventBus } from "@/main.js"

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  //기본 접근방법 : this.$store.state.items
  state: {
    dashboard: [null],
    introduction: null,
    assignments: [null],
    lecture: [null],
    board: [null],
    stud_management: null,
    course_management: null,

    nowTab: [[], []],
    selectedTab: [null, null],
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
      state.course_management = db.course_management
    },

    addLectureData(state, newlecture) {
      state.lecture.push(newlecture)
      console.log("storage add")
    },

    addAssignData(state, newAssign) {
      state.assignments.push(newAssign)
      console.log("storage add")
    },

    delSideTabData(state, tabname) {
      state.nowTab.forEach((OneEditor) => {
        OneEditor.forEach((onetab, i) => {
          if (onetab.tab_title == tabname) {
            //같은 게 존재!
            OneEditor.splice(i, 1)
          }
        })
      })
    },

    setSideTabData(state, tabname) {
      var newTab = {
        tab_title: tabname,
        data: "#" + tabname,
        _id: "0",
        icon: "far fa-leaf-maple",
      }

      var isTabExist = false
      state.nowTab.forEach((OneEditor, idx) => {
        OneEditor.forEach((onetab, i) => {
          if (onetab.tab_title == newTab.tab_title) {
            //같은 게 존재!
            isTabExist = true
            state.selectedTab[idx] = "tabs-L" + idx + "-P" + i
          }
        })
      })

      if (!isTabExist) {
        state.nowTab[0].push(newTab)
        state.selectedTab[0] =
          "tabs-L" + 0 + "-P" + (state.nowTab[0].length - 1)
      }

      eventBus.$emit("selectedTab", state.selectedTab)
      //console.log("??", state.nowTab[0])
    },

    ChangeNowTab(state, TabData) {
      state.nowTab[TabData.idx] = TabData.el
    },
    ChangeSelectedTab(state, TabData) {
      state.selectedTab[TabData.idx] = TabData.selected
    },

    StartTab(state, TabId) {
      console.log("Starttab ", TabId)
      state.nowTab.forEach((Onetab, index) => {
        state.nowTab[index] = []
      })

      console.log(state.nowTab)
      var openWindowTab = null
      state.lecture.forEach((element) => {
        element.subitems.forEach((el) => {
          if (el._id == TabId) {
            openWindowTab = el
          }
        })
      })

      console.log("openWindowTab", openWindowTab)

      var tabdata = {
        tab_title: openWindowTab.subtitle,
        data: "#" + openWindowTab.subtitle,
        _id: openWindowTab._id,
        icon: "far fa-leaf",
      }
      if (state.nowTab[0] == null) {
        state.nowTab[0] = [tabdata]
      } else {
        state.nowTab[0].push(tabdata)
      }
      state.selectedTab[0] = "tabs-L" + 0 + "-P" + (state.nowTab[0].length - 1)

      var newTab = {
        tab_title: "WindowTerminal",
        data: "#WindowTerminal",
        _id: "0",
        icon: "far fa-leaf-maple",
      }

      state.nowTab[1].push(newTab)

      console.log("finish. ", state.nowTab)
      eventBus.$emit("selectedTab", state.selectedTab)
    },

    setTabData(state, tabdata) {
      var isTabExist = false
      state.nowTab.forEach((OneEditor, idx) => {
        OneEditor.forEach((onetab, i) => {
          if (onetab._id == tabdata._id) {
            //같은 게 존재!
            isTabExist = true
            state.selectedTab[idx] = "tabs-L" + idx + "-P" + i
          }
        })
      })

      if (!isTabExist) {
        state.nowTab[0].push(tabdata)
        state.selectedTab[0] =
          "tabs-L" + 0 + "-P" + (state.nowTab[0].length - 1)
      }

      eventBus.$emit("selectedTab", state.selectedTab)

      //state.dashboard = tabdata
    },

    setTabCode(state, NewTabData) {
      console.log("input code is", NewTabData)
      state.nowTab.forEach((OneEditor, idx) => {
        OneEditor.forEach((onetab, i) => {
          if (onetab._id == NewTabData.TabId) {
            //같은 게 존재!
            onetab.data = NewTabData.newcode
          }
        })
      })
    },

    addIntroData(state) {
      state.introduction.push(newIntro)
      console.log("storage add")
    },

    addCMData(state, newCM) {
      state.course_management.push(newCM)
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
