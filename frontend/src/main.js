import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import axios from "axios"

import { store } from "./store/store"

Vue.prototype.$http = axios
//연습
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
