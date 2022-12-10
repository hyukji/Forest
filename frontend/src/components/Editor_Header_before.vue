<template>
  <v-app-bar app color="primary" height="40px">
    <!-- <div class="wrap-appbar"> -->
    <!-- <v-row> -->
    <!-- <div class="appbar-left"> -->
    <v-app-bar-nav-icon @click.stop="click_drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <router-link to="/mycourse">
        <v-img :src="require('../assets/Forest_logo.jpg')" contain height="40" />
      </router-link>
    </v-toolbar-title>
    <!-- to alian logo to center: <v-spacer/> and mas-width="200" -->

    <!-- <v-spacer/> -->
    <!-- <div class="appbar-right"> -->
    <!-- <v-row no-gutters justify="end" align="center"> -->
    <v-btn text class="to-mycourse" href="/mycourse">내 강의실</v-btn>
    <!-- <div class="text-center"> -->
    <v-menu :offset-y="true" left>
      <template v-slot:activator="{ on }">
        <v-btn icon color="white" dark v-on="on" active-class="false">
          <font-awesome-icon icon="fa-solid fa-bell" />
          <!-- <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
          <!-- <v-icon size="15pt" color="white">fas fa-bell</v-icon> -->
        </v-btn>
      </template>
      <v-list class="menus" width="250pt">
        <v-list-item-content
          two-line
          v-for="(item, index) in bell_menus"
          :key="index"
          @click="menu_bell_func(item.route)"
        >
          <v-list-item-subtitle class="menu-bell-main">{{item.main}}</v-list-item-subtitle>
          <v-list-item-title class="menu-bell-title">{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle class="menu-bell-date">{{item.date}}</v-list-item-subtitle>
          <v-divider></v-divider>
        </v-list-item-content>
      </v-list>
    </v-menu>
    <!-- </div> -->

    <!-- <div class="text-center"> -->
    <v-menu :offset-y="true" left>
      <template v-slot:activator="{ on }">
        <v-btn icon color="white" dark v-on="on" active-class="false">
          <v-icon size="15pt" color="white">fas fa-user</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item-content two-line>
          <v-list-item-title class="menu-user_name">{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle class="menu-user_mail">{{user.mail}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-divider></v-divider>
        <v-list-item
          class="menu-user-list"
          v-for="(item, index) in user_menus"
          :key="index"
          v-on:click="menu_user_func(item.route)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" size="15pt"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- </div> -->
    <!-- </v-row> -->
    <!-- </div> -->
    <!-- </v-row> -->
    <!-- </div> -->
  </v-app-bar>
</template>

<script>
import { eventBus } from "../main.js";

export default {
  name: "header",
  data: function() {
    return {
      drawer: false,
      user: { name: "곽지혁", mail: "wlgur0416@dgist.ac.kr" },
      bell_menus: [
        {
          main: "게시판/공지사항",
          title: "새로운 공지가 올라왔습니다.",
          date: "2020.3.8",
          route: "공지사항"
        },
        {
          main: "게시판/QnA",
          title: "새로운 질문이 올라왔습니다.",
          date: "2020.3.8",
          route: "QnA"
        },
        {
          main: "게시판/자유게시판",
          title: "새로운 댓글이 달렸습니다.",
          date: "2020.3.8",
          route: "자유게시판"
        },
        {
          main: "수업목록",
          title: "과제가 새로 올라왔습니다.",
          date: "2020.3.8",
          route: "수업목록"
        }
      ],
      user_menus: [
        { title: "계정 관리", route: "/account", icon: "fas fa-user-cog" },
        { title: "로그아웃", route: "/logout", icon: "fas fa-sign-out-alt" },
        { title: "FAQ", route: "/managing/FAQ", icon: "fas fa-question" },
        { title: "QnA", route: "/managing/FAQ", icon: "fas fa-comments" }
      ]
    };
  },
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
      //eventBus.bell_route(route);
      if (location.pathname == "/mycourse/courseid") {
      } else {
        this.$router.push({
          path: "/mycourse/courseid",
          query: { tab: route }
        });
      }
    },
    click_drawer(event) {
      this.drawer = !this.drawer;
      eventBus.$emit("clickDrawer", this.drawer);
    }
  },
  created() {
    eventBus.$on("selectLecture", drawer => {
      this.drawer = drawer;
    });
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
