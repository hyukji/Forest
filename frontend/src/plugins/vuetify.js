import "@fortawesome/fontawesome-free/css/all.css" // Ensure you are using css-loader
import Vue from "vue"
import Vuetify from "vuetify/lib"
import colors from "vuetify/es5/util/colors"

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: "fa",
  },
  theme: {
    themes: {
      light: {
        primary: "#79b575",
        secondary: "#51844c",
        dark_gray: "#363636",
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
})
