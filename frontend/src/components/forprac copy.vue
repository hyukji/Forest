<template>
  <!-- <v-navigation-drawer permanent="permanent" dark class="content"> -->
  <!-- <div v-if="loading" class="loading">
    <img src="@/assets/loading.gif" />
  </div>-->
  <v-card class="wrap overflow-y-auto" tile>
    <component :is="selected" :user_data="user_data"></component>
  </v-card>

  <!-- </v-navigation-drawer> -->
</template>

<script>
export default {
  props: ["selected", "user_data"],
  components: {
    MainList: () => import("@/components/Editor/Side_MainList"),
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
  background-color: #252526;
}

.content {
  width: 100%;
}
</style>

<style>
/* .scollbar_style {
  overflow: auto;
} */

.scollbar_style::-webkit-scrollbar {
  width: 8px;
  background-color: transparent;
}

.scollbar_style::-webkit-scrollbar-thumb {
  background-color: rgba(148, 140, 140, 0.479);
  height: 200px;
}
</style>
