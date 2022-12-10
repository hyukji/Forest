import Vue from "vue"
import VueRouter from "vue-router"

import Home from "../views/Home.vue"
import Signin from "../views/SignIn.vue"
import SignUp from "../views/SignUp.vue"
import MyCourse from "../views/MyCourse.vue"
import AboutCourse from "../views/AboutCourse.vue"
import hello from "../components/HelloWorld.vue"
import prac from "../components/forprac.vue"

import E404 from "../views/E404.vue"

import User_Header from "../components/User_Header.vue"
import Main_Header from "../components/Main_Header.vue"

import Editor from "../components/Editor/Editor.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    name: "E404",
    components: {
      body: E404,
    },
  },
  {
    path: "/editor/:course_code",
    components: {
      body: Editor,
    },
  },
  {
    path: "/prac",
    components: {
      body: prac,
    },
  },
  {
    path: "/",
    name: "Home",
    components: {
      header: Main_Header,
      body: Home,
    },
  },
  {
    path: "/signin",
    name: "Signin",
    //beforeEnter: isAuthenticated(),
    //to와 from은 router가 어디에서 어디로 가는 지 정보를 담고 있음.
    //next는 함수를 실행하고 나서 라우터를 어디로 이동시킬지. 조건을 만족하지 않으면 다른 라우터로 이동하게 할 수 있음.
    //component에서는 beforeRouterEnter로 같은 기능 구현이 가능하다. beforeRouterleave도 존재.
    components: {
      header: Main_Header,
      body: Signin,
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    components: {
      header: Main_Header,
      body: SignUp,
    },
  },
  {
    path: "/mycourse",
    name: "MyCourse",
    components: {
      header: User_Header,
      body: MyCourse,
    },
  },
  {
    path: "/mycourse/:course_code",
    name: "AboutCourse",
    components: {
      header: User_Header,
      body: AboutCourse,
    },
  },
  
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
