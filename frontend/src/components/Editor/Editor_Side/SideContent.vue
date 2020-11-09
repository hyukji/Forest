<template>
  <!-- <v-navigation-drawer permanent="permanent" dark class="content"> -->
  <!-- <div v-if="loading" class="loading">
    <img src="@/assets/loading.gif" />
  </div>-->
  <v-card class="wrap" tile >
    <component 
      :is="selected" :user_data="user_data" 
      class = "scrollbar_style">
    </component>
  </v-card>

  <!-- </v-navigation-drawer> -->
</template>

<script>
export default {
  props: ["selected", "user_data"],
  components: {
    MainList: () => import("@/components/Editor/Editor_Side/Side_MainList"),
    Search: () => import("@/components/Editor/Editor_Side/Side_search"),
    Setting: () => import("@/components/Editor/Editor_Side/Side_setting"),
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

.scrollbar_style{ 
  width:100%; 
  height: 94vh;
  overflow-y:auto; 
  overflow-x:hidden;
}
</style>

<style>
  
.scrollbar_style::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

.scrollbar_style::-webkit-scrollbar-thumb {
  background-color: rgba(196, 188, 188, 0.445);
  height: 20px;
}
</style>

