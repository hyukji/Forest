<template>
  <v-app-bar app color="primary" height="75px" align-center>
    <div class="wrap-appbar">
      <v-row>
        <div class="appbar-left">
          <router-link to="/">
            <v-img :src="require('../assets/Forest_logo.jpg')" class="my-3" contain height="60" />
          </router-link>
        </div>
        <div class="appbar-right"></div>
      </v-row>
    </div>
  </v-app-bar>
</template>
<script>
import { authentication } from "../mixins/authentication";

import { eventBus } from "../main.js";
export default {
  name: "header",
  data: function() {
    return {};
  },
  mixins: [authentication],
  methods: {
    menu_user_func: function(route) {
      this.$router.push({
        path: route,
        params: { user: "username" },
        query: { group: "member" }
      });
      // route==logout이면 백이용해서 로그아웃하고홈으로
    },
    menu_bell_func: function(route) {
      eventBus.bell_route(route);
      if (location.pathname == "/course/courseid") {
      } else {
        this.$router.push({
          path: "/course/courseid",
          query: { tab: route }
        });
      }
    }
  },
  created() {
    this.check_isauth(false);
  }
};
</script>

<style scoped>
.wrap-appbar {
  min-width: 800pt;
  max-width: 1000pt;
  width: 70%;
  margin: 0 auto;
}
.appbar-left {
  width: 13%;
}
.appbar-right {
  display: flex;
  width: 87%;
  align-items: center;
  text-align: right;
}
a {
  text-decoration: none;
}
ul {
  padding: 0;
  margin-left: 0;
  list-style-type: none;
}
li {
  padding-left: 1%;
  display: inline-block;
}
.to-mycourse {
  width: 100%;
  padding-right: 1.5%;
  font-size: 12pt;
  color: white;
  font-size: 1.1rem;
}
.menu-user_name {
  text-align: center;
  font-weight: 500;
  font-size: 1.25rem;
  padding-left: 8%;
  padding-right: 8%;
  padding-top: 3%;
  padding-bottom: 1%;
}
.menu-user_mail {
  text-align: center;

  font-size: 0.9rem;
  padding-left: 8%;
  padding-right: 8%;
  padding-top: 1.5%;
  padding-bottom: 5%;
}
.menu-user-list {
  padding-left: 7%;
  padding-top: 1.5%;
}
.menu-bell-main {
  padding-bottom: 1.5%;
  padding-left: 7%;
}
.menu-bell-title {
  font-weight: 500;
  font-size: 1.1rem;
  padding-left: 7%;
  padding-bottom: 3.5%;
}
.menu-bell-date {
  float: right;
  padding-left: 7%;
  padding-bottom: 4%;
}
.text-center {
  padding-right: 1%;
}
</style>
