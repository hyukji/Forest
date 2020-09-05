<template>
  <!-- <v-navigation-drawer permanent="permanent" dark class="content"> -->
  <!-- <div v-if="loading" class="loading">
    <img src="@/assets/loading.gif" />
  </div>-->
  <v-card class="wrap overflow-y-auto" tile>
    <component :is="selected" :user_data="user_data" class="content"></component>
  </v-card>

  <!-- </v-navigation-drawer> -->
</template>

<script>
export default {
  props: ["selected", "user_data"],
  components: {
    MainList: () => import("@/components/Editor/Side_MainList"),
    Search: () => import("@/components/Editor/Side_search"),
    Setting: () => import("@/components/Editor/Side_setting"),
  },
  data() {
    return {};
  },

  methods: {
    getCoursedData: function () {
      this.$http
        .get("/api/mycourse/" + this.$route.params.course_code + "/coursedata")
        .then((res) => {
          if (res.data.result) {
            this.$store.commit("setCourseData", res.data.db_course);
          } else {
            alert(res.data.message);
          }
        })
        .catch(function (error) {
          alert("error to getdata");
        });
    },
  },
  created() {
    this.getCoursedData();
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  background-color: #252526;
}

.content {
  width: 100%;
  height: 95%;
}
</style>
