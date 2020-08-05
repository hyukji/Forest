<template>
  <div class="wrap-body">
    <v-row v-show="loading">
      <v-text>로딩중</v-text>
    </v-row>
    <v-row v-show="!loading">
      <div>
        <side />
      </div>
      <v-col class="pl-10">
        <list_stud v-if="user_position == 'stud'" v-model="user_course_info"></list_stud>
        <list_prof v-if="user_position == 'prof'" v-model="user_course_info"></list_prof>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Mycourse",
  components: {
    list_stud: () => import("@/components/MyCourse/List_Stud"),
    list_prof: () => import("@/components/MyCourse/List_Prof"),

    side: () => import("@/components/MyCourse/Side"),
  },
  data: function () {
    return {
      user_course_info: [],
      user_position: "",
      loading: true,
    };
  },
  created() {
    this.$http
      .get("/api/home/mycourse")
      .then((res) => {
        this.user_course_info = res.data.course_info;
        this.user_position = res.data.position;
      })
      .then(() => {
        this.loading = false;
      })
      .catch(function (error) {
        alert("error");
      });
  },
};
</script>

<style scoped>
.wrap-body {
  width: 100%;
  height: 100%;
  background-color: "#51844c";
}
.body-title {
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 2%;
}
</style>
