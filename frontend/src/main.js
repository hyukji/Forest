import Vue from "vue"
import App from "./App.vue"

import router from "./router"
import vuetify from "./plugins/vuetify"
import { store } from "./store/store"
import vuescroll from "vuescroll"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

Vue.component("font-awesome-icon", FontAwesomeIcon)

Vue.config.productionTip = false

import axios from "axios"
Vue.prototype.$http = axios

import SocketIO from "socket.io-client"
const socket = SocketIO("http://localhost:3030") //SocketIO('http://3.35.3.214:3030')
Vue.prototype.$socket = socket
// import VueSocketIO from "vue-socket.io"
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://localhost:3030')
//   })
// )

Vue.config.productionTip = false

export const eventBus = new Vue({
  methods: {
    bell_route(route) {
      this.$emit("bell_route", route)
    },
  },
})

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")

Vue.use(vuescroll)

const ignoreWarnMessage =
  "The .native modifier for v-on is only valid on components but it was used on <div>."
Vue.config.warnHandler = function(msg, vm, trace) {
  // `trace` is the component hierarchy trace
  if (msg === ignoreWarnMessage) {
    msg = null
    vm = null
    trace = null
  }
}
